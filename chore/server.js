const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const passport = require('passport');
const config = require('./server/config/config.json');
const connectionstring = config.connectionString;

// const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(session({secret: config.sessionSecret, saveUninitialized: true, resave: true}));

const massiveInstance = massive.connectSync({connectionString: connectionstring});

app.set('db', massiveInstance);

app.use(express.static(__dirname + '/www'));
module.exports = app;

const chores = require('./server/requests/chorerequests.js');
const choreusers = require('./server/requests/choreusers.js');
const userutilities = require('./server/requests/userutilities.js')
var db = app.get('db');



function restrict(req, res, next) {
    if (req.isUnauthenticated())
        return res.status(403).json({message: 'please login'});
    next();
}
// ^^^^ this restrict function will allow the user to navigate around the site
// but $http requests will not be made unless access has be verified. This should be used as a middleware
// in each request, this will be put in as one of the final items in the project

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
app.post('/auth/login',ensureAuthenticated,function(req, res) {
  db.findUser([req.body.email], function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    if(req.body.password === user[0].user_password){
      res.send({
        token: createJWT(user[0]),
        user: user[0]
      });
    }

    });
  });

// Create Username and Password Account
app.post('/auth/signup', function(req, res) {
  // console.log(req.body)
  db.findUser([req.body.email], function(err, existingUser) {
    // console.log(existingUser.user_email,'exisitinguser')
    if (existingUser === null) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    db.compareHousehold([req.body.household], function(err, isMatch) {
      // console.log(isMatch)
      if (isMatch == null) {
        return res.status(409).send({ message: 'Household name is already taken' });
      }
    db.saveUser([
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.household,
      req.body.zipcode
        ], function(err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: createJWT(result) });
});
    });
  });
});
//
//




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
