const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const passport = require('passport');
// passport strategies should be placed here i.e. google, local auth, and facebook
const config = require('./server/config/config.json');
const connectionstring = config.connectionString;

// const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment');

var app = express();







app.use(bodyParser.json());
app.use(cors());

app.use(session({secret: config.sessionSecret, saveUninitialized: true, resave: true}));

// passport info (local,google,facebook) .initialize and .session should go here.

const massiveInstance = massive.connectSync({connectionString: connectionstring});

// passport serialize user here

// passport deserialize user here

app.set('db', massiveInstance);

app.use(express.static(__dirname + '/www'));
module.exports = app;

const chores = require('./server/requests/chorerequests.js');
const choreusers = require('./server/requests/choreusers.js');
const userutilities = require('./server/requests/userutilities.js')
var db = app.get('db');

// passport .use should go here

function restrict(req, res, next) {
    if (req.isUnauthenticated())
        return res.status(403).json({message: 'please login'});
    next();
}
// ^^^^ this restrict function will allow the user to navigate around the site
// but $http requests will not be made unless access has be verified. This should be used as a middleware
// in each request

// Login Required Middleware
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

// Generate JSON Web Token
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

// GET /api/me
// app.get('/api/me', ensureAuthenticated, function(req, res) {
//   db.findById([req.body.id], function(err, user) {
//     res.send(user);
//   });
// });
//
// // PUT /api/me
// app.put('/api/me', ensureAuthenticated, function(req, res) {
//   db.findById([req.body.id], function(err, user) {
//     if (!user) {
//       return res.status(400).send({ message: 'User not found' });
//     }
//     user.firstName = req.body.displayName || user.displayName;
//     user.username = req.body.username || user.username;
//     user.save(function(err) {
//       res.status(200).end();
//     });
//   });
// });

// Log in with Username
// app.post('/auth/login', function(req, res) {
//   db.findUser([req.body.email], function(err, user) {
//     if (!user) {
//       return res.status(401).send({ message: 'Invalid email and/or password' });
//     }
//     if(req.body.password === user[0].user_password){
//       res.send({
//         token: createJWT(user[0]),
//         user: user[0]
//       });
//     }
//
//     });
//   });
//
// // Create Username and Password Account
// app.post('/auth/signup', function(req, res) {
//   console.log(req.body)
//   db.findUser([req.body.email], function(err, existingUser) {
//     console.log(existingUser)
//     if (existingUser == null) {
//       return res.status(409).send({ message: 'Email is already taken' });
//     }
//     db.compareHousehold([req.body.household], function(err, isMatch) {
//       console.log(isMatch)
//       if (isMatch == null) {
//         return res.status(409).send({ message: 'Household name is already taken' });
//       }
//     db.saveUser([
//       req.body.firstName,
//       req.body.lastName,
//       req.body.email,
//       req.body.password,
//       req.body.household,
//       req.body.zipcode
//         ], function(err, result) {
//       if (err) {
//         res.status(500).send({ message: err.message });
//       }
//       res.send({ token: createJWT(result) });
// });
//     });
//   });
// });
//
// // Login with Google
// app.post('/auth/google', function(req, res) {
//   var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
//   var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
//   var params = {
//     code: req.body.code,
//     client_id: req.body.clientId,
//     client_secret: config.GOOGLE_SECRET,
//     redirect_uri: req.body.redirectUri,
//     grant_type: 'authorization_code'
//   };
//
//   // Step 1. Exchange authorization code for access token.
//   request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
//     var accessToken = token.access_token;
//     var headers = { Authorization: 'Bearer ' + accessToken };
//
//     // Step 2. Retrieve profile information about the current user.
//     request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
//       if (profile.error) {
//         return res.status(500).send({message: profile.error.message});
//       }
//       // Step 3a. Link user accounts.
//       if (req.header('Authorization')) {
//         db.findOne([profile.sub], function(err, existingUser) {
//           if (existingUser) {
//             return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
//           }
//           var token = req.header('Authorization').split(' ')[1];
//           var payload = jwt.decode(token, config.TOKEN_SECRET);
//           db.findById([payload.sub], function(err, user) {
//             if (!user) {
//               return res.status(400).send({ message: 'User not found' });
//             }
//             user.google = profile.sub;
//             user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
//             user.displayName = user.displayName || profile.name;
//             user.save(function() {
//               var token = createJWT(user);
//               res.send({ token: token });
//             });
//           });
//         });
//       } else {
//         // Step 3b. Create a new user account or return an existing one.
//         db.findOne([profile.sub], function(err, existingUser) {
//           if (existingUser) {
//             return res.send({ token: createJWT(existingUser) });
//           }
//           var user = new User();
//           user.google = profile.sub;
//           user.picture = profile.picture.replace('sz=50', 'sz=200');
//           user.displayName = profile.name;
//           user.save(function(err) {
//             var token = createJWT(user);
//             res.send({ token: token });
//           });
//         });
//       }
//     });
//   });
// });
//
// // Login with Facebook
// app.post('/auth/facebook', function(req, res) {
//   var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
//   var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
//   var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
//   var params = {
//     code: req.body.code,
//     client_id: req.body.clientId,
//     client_secret: config.FACEBOOK_SECRET,
//     redirect_uri: req.body.redirectUri
//   };
//
//   // Step 1. Exchange authorization code for access token.
//   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
//     if (response.statusCode !== 200) {
//       return res.status(500).send({ message: accessToken.error.message });
//     }
//
//     // Step 2. Retrieve profile information about the current user.
//     request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
//       if (response.statusCode !== 200) {
//         return res.status(500).send({ message: profile.error.message });
//       }
//       if (req.header('Authorization')) {
//         User.findOne({ facebook: profile.id }, function(err, existingUser) {
//           if (existingUser) {
//             return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
//           }
//           var token = req.header('Authorization').split(' ')[1];
//           var payload = jwt.decode(token, config.TOKEN_SECRET);
//           User.findById(payload.sub, function(err, user) {
//             if (!user) {
//               return res.status(400).send({ message: 'User not found' });
//             }
//             user.facebook = profile.id;
//             user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
//             user.displayName = user.displayName || profile.name;
//             user.save(function() {
//               var token = createJWT(user);
//               res.send({ token: token });
//             });
//           });
//         });
//       } else {
//         // Step 3. Create a new user account or return an existing one.
//         User.findOne({ facebook: profile.id }, function(err, existingUser) {
//           if (existingUser) {
//             var token = createJWT(existingUser);
//             return res.send({ token: token });
//           }
//           var user = new User();
//           user.facebook = profile.id;
//           user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
//           user.displayName = profile.name;
//           user.save(function() {
//             var token = createJWT(user);
//             res.send({ token: token });
//           });
//         });
//       }
//     });
//   });
// });

// in each request, this will be put in as one of the final items in the project



// ====================================== Endpoints Section ======================================

//==== Get Requests =======
// banner will retrieve the banner url
//  ** requires the users household name as a parameter **
app.get('/banner/:id',userutilities.getbanner);

// children will show all the household's children and thier information
//  ** requires the users household name to find the children **
app.get('/children/:id', choreusers.getchildren);

// zipcode will get the users zipcode for the weather api
// ** requires the users household name as a parameter **
app.get('/zipcode/:id', userutilities.getzipcode);

// default chores will show all default chores in the chores table
app.get('/defaultchores',chores.showdefaultchores);

// chores will show all of the chores that are assigned to that child
// ** the chores that will be returned will be the non completed ones **
app.get('/chores', chores.getassignedchores);




//======  Post Requests =========

// This post will take the users email,password,first and last name
// for the first time and create that user
app.post('/firsttimeuser', choreusers.firstuser);

// children will create a child user with the admin being set to false;
app.post('/children', choreusers.createchildren);

// assign chore will create a chore that will be assigned to a child
app.post('/assignchore', chores.assignchore);





// ========== Put Requests =============

// banner will update the admins user info with thier banner url
// ** Required info is the users household name for the query search parameter **
app.put('/banner/:id',userutilities.bannerimage);

// child will update their assigned chore
//  ** Required info will need the user id primary key **
app.put('/child', choreusers.updatechilduser);




// ========= Delete Requests ===============
// this will delete a chore that was assigned to a child
// ** Required param is the assigned chore primary key **
app.delete('/assignedchore/:id',chores.removeassignedchore);

// keep this at the end of file
app.listen(config.port, function() {
    console.log('listening on port', config.port);
})
