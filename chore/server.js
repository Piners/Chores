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

app.use(express.static(__dirname + '/frontend'));
module.exports = app;

const requests = ('requests/requests.js');
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







// keep this at the end of file
app.listen(config.port, function() {
    console.log('listening on port', config.port);
})
