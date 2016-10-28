const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const passport = require('passport');
// passport strategies should be placed here i.e. google, local auth, and facebook
const config = require('./server/config/config.json');
const connectionstring = config.connectionString;

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
