var app = require('../../server.js');

var db = app.get('db');

module.exports = {

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
  }










} //end of module
