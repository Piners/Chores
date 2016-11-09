const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const cronJob = require('cron').CronJob;
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
const userutilities = require('./server/requests/userutilities.js');
const reward = require('./server/requests/rewardrequests.js');
var db = app.get('db');


// Login Required Middleware
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send({message: err.message});
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'Token has expired'});
  }
  req.user = payload.sub;
  next();
}

// Generate JSON Web Token
function createJWT(user) {
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
    // user: user
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

// Log in with Username
app.post('/auth/login', function(req, res) {
  db.findUser([req.body.email], function(err, user) {
    if (!user[0]) {
        res.status(401).send();
        return
    }
    if (req.body.password === user[0].user_password) {
      res.send({
        token: createJWT(user[0]),
        user: user[0]
      });
    }

  });
});

// Create Username and Password Account
app.post('/auth/signup', function(req, res) {
  console.log(req.body)
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


var dailyReset = new cronJob({
  cronTime: '02 00 00 * * 0-6',
  onTick: function(req,res){
    db.set_daily(function(err, daily) {
      if (err) {
        console.log('daily chore was not reset');
        res.send(err);
      } else {
        console.log('daily chore was reset');
      }
    })
  },
  start: false
});
dailyReset.start();


var weeklyReset = new cronJob({
  cronTime: '05 00 00 * * 0',
  onTick: function(req,res){
    db.set_weekly(function(err, daily) {
      if (err) {
        console.log('weekly chore was not reset');
        res.send(err);
      } else {
        console.log('weekly chore was reset');
      }
    })
  },
  start: false
});
weeklyReset.start();


var monthlyReset = new cronJob({
  cronTime: '07 00 00 1 * *',
  onTick: function(req,res){
    db.set_monthly(function(err, monthly) {
      if (err) {
        console.log('monthly chore was not reset');
        res.send(err);
      } else {
        console.log('monthly chore was reset');
      }
    })
  },
  start: false
});
monthlyReset.start();


    //
    //

    // ====================================== Endpoints Section ======================================

    //==== Get Requests =======
    // banner will retrieve the banner url
    //  ** requires the users household name as a parameter **
    app.get('/banner/:id', ensureAuthenticated, userutilities.getbanner);

    // children will show all the household's children and thier information
    //  ** requires the users household name to find the children **
    app.get('/children/:id', ensureAuthenticated, choreusers.getchildren);

    // zipcode will get the users zipcode for the weather api
    // ** requires the users household name as a parameter **
    app.get('/zipcode/:id', ensureAuthenticated, userutilities.getzipcode);

    // default chores will show all default chores in the chores table
    app.get('/defaultchores', ensureAuthenticated, chores.showdefaultchores);

    // chores will show all of the chores that are assigned to that child
    // ** the chores that will be returned will be the non completed ones **
    app.get('/chores/:id', ensureAuthenticated, chores.getassignedchores);

    // childrewards will show all of the childs rewards
    //  ** use the child primary id as the param **
    app.get('/childrewards/:id', ensureAuthenticated, reward.showchildrewards);

    app.get('/dailychore/:id', chores.getdailychore);
    app.get('/weeklychore/:id', chores.getweeklychore);
    app.get('/monthlychore/:id', chores.getmonthlychore);

    //get a  single childs info
    app.get('/child/:id', userutilities.getChild);
    //get points
    app.get('/points/:id', userutilities.getPoints);

    //======  Post Requests =========

    // This post will take the users email,password,first and last name
    // for the first time and create that user
    app.post('/firsttimeuser', choreusers.firstuser);

    // children will create a child user with the admin being set to false;
    app.post('/children', ensureAuthenticated, choreusers.createchildren);

    // assign chore will create a chore that will be assigned to a child
    app.post('/assignchore', ensureAuthenticated, chores.assignchore);

    // reward will add reward info
    app.post('/reward', ensureAuthenticated, reward.createreward);

    // ========== Put Requests =============

    // banner will update the admins user info with thier banner url
    // ** Required info is the users household name for the query search parameter **
    app.put('/banner/:id', ensureAuthenticated, userutilities.bannerimage);


    // child will update their assigned chore ?? this updates the user info not chore
    //  ** Required info will need the user id primary key **
    app.put('/child', ensureAuthenticated, choreusers.updatechilduser);

    // completed will change the chore status to true and also update the
    // users point total
    // ** Requires the assigned chore primary key **
    app.put('/completed/:id', ensureAuthenticated, chores.updatepoints);

    // zeropoints will change the users points total to zero
    // ** Requires the users primary key as a parameter**
    app.put('/zeropoints/:id', ensureAuthenticated, chores.pointstozero);

    // minuspoints will change the users points total will minus whatever amount was entered
    // ** Requires the users primary key as a parameter **
    app.put('/minuspoints/:id', ensureAuthenticated, chores.minuspoints);

    // addpoints will allow the admin user to add points without the need to assign a chore before hand
    //  ** Requires the users primary key as a parameter **
    app.put('/addpoints/:id', ensureAuthenticated, chores.addpoints);

    // password will update the users password
    // ** Requires the users primary key as a param **
    app.put('/password/:id', userutilities.resetpassword);

    // household will update the household name
    //  ** Requires the old household name as a param **
    app.put('/household/:id', ensureAuthenticated, userutilities.updatehousehold);

    // zip will update the households zip
    //  ** Requires the household name as the param **
    app.put('/zip/:id', ensureAuthenticated, userutilities.updatezip);

    //update child users theme
    app.put('/theme', userutilities.updatetheme)

    // update the child chore status
    //  ** this will be send to the parent by the child **
    app.put('/chorestatus/:id', ensureAuthenticated, chores.setchorestatus);

    //update chore status from parent set to false
    app.put('/parentChoreStatus/:id', chores.parentSetStatus)

    app.put('/image/:id', userutilities.updateimage);
    app.put('/firstname/:id', userutilities.updatefirstname);
    app.put('/email/:id',userutilities.updateemail);
    // ========= Delete Requests ===============
    // this will delete a chore that was assigned to a child
    // ** Required param is the assigned chore primary key **
    app.delete('/assignedchore/:id', ensureAuthenticated, chores.removeassignedchore);

    // this will delete a user both a child or an admin
    //  ** Use the user_id as the param **
    app.delete('/deleteuser/:id', ensureAuthenticated, choreusers.deleteuser);
    //delete a reward
    app.delete('/reward/:uID/:rID', reward.removeReward);


    // keep this at the end of file
    app.listen(config.port, function() {
      console.log('listening on port', config.port);
    });
