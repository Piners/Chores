var app = require('../../server.js');

var db = app.get('db');

module.exports = {
  // this is where requests from the database should be created.

  firstuser: function(req, res, next) {
    var r = req.body;
    var newUserAdmin = [r.user_password, r.user_email, r.user_first_name, r.user_last_name];
    db.create_new_user_admin(newUserAdmin, function(err, user) {
      if (err) {
        res.send(err);
        console.log('new user/admin was not created')
      } else {
        res.send('new user/admin was created')
      }
    });
  },

  bannerimage: function(req, res, next) {
    var r = req.body;
    console.log(r.user_banner_image);
    console.log(req.params.id);
    db.add_banner_image([
      r.user_banner_image, req.params.id
    ], function(err, banner) {
      if (err) {
        console.log('banner link was not added')
        res.send(err);
      } else {
        console.log('banner link was added to admin user')
        res.send(banner);
      }
    });
  },

  getbanner: function(req, res, next) {
    db.get_banner(req.params.id, function(err, banner) {
      if (err) {
        console.log('banner was not sent');
        res.send(err);
      } else {
        console.log('banner was sent')
        res.status(200).json(banner);
      }
    });
  },

  getchildren: function(req, res, next) {
    db.get_children(req.params.id, function(err, children) {
      if (err) {
        console.log('children were not sent');
        res.send(err);
      } else {
        console.log('children were sent');
        res.status(200).json(children);
      }
    });
  },

  getzipcode: function(req, res, next) {
    db.get_household_zipcode(req.params.id, function(err, children) {
      if (err) {
        console.log('zip code was not sent');
        res.send(err);
      } else {
        console.log('zip code was sent');
        res.status(200).json(children);
      }
    });
  },

  createchildren: function(req, res, next) {
    var r = req.body;
    var childrenbuilder = [
      r.user_password,
      r.user_email,
      r.user_household,
      r.user_image,
      r.user_first_name,
      r.user_last_name
    ];
    db.create_children(childrenbuilder, function(err, children) {
      if (err) {
        console.log('child was not created');
        res.send(err);
      } else {
        console.log('child was created');
        res.send(children);
      }
    })
  },

  showdefaultchores: function(req, res, next) {
    db.default_chores(req.params.id, function(err, chores) {
      if (err) {
        console.log('chores were not shown');
        res.send(err);
      } else {
        console.log('chores were shown');
        res.status(200).json(chores);
      }
    })
  },
  

} //end of module
