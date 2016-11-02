var app = require('../../server.js');

var db = app.get('db');

module.exports = {

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

  createchildren: function(req, res, next) {

    var r = req.body;
    console.log(r);
    var childrenBuilder = [
      r.user_first_name,
      r.user_last_name,
      r.user_email,
      r.user_password,
      r.user_image,
      r.user_household
    ];
    console.log(childrenBuilder)
    db.create_children(childrenBuilder, function(err, children) {
      if (err) {
        console.log('child was not created');
        res.send(err);
      } else {
        console.log('child was created');
        res.send(children);
      }
    })
  },

  updatechilduser: function(req, res, next) {
    var r = req.body;
    var updateChildArr = [
      r.user_password,
      r.user_email,
      r.user_image,
      r.user_first_name,
      r.user_last_name,
      req.params.id
    ];
    db.update_child_user(updateChildArr, function(err, child) {
      if (err) {
        console.log('child was not updated');
        res.send(err);
      } else {
        console.log('child was updated');
        res.send(child);
      }
    })
  },

  deleteuser: function(req, res) {
    db.delete_user(req.params.id, function(err, gone) {
      if (err) {
        console.log('user was not deleted');
        res.send(err);
      } else {
        console.log('user was deleted');
        res.send(gone);
      }
    })
  }

} //end of module
