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
  },

  resetpassword: function(req,res){
    var r = req.body;
    var newPassArr = [r.user_password,req.params.id];
    db.reset_password(newPassArr,function(err,password){
      if(err){
        console.log('password was not updated');
        res.send(err);
      } else{
        console.log('password was updated');
        res.send(password);
      }
    })
  },

  updatehousehold: function(req,res) {
    var r = req.body;
    var newHouseholdArr = [r.newhousehold,req.params.id];
    db.update_household_name(newHouseholdArr,function(err,newHouse){
      if(err){
        console.log('Household name was not updated');
        res.send(err);
      } else{
        console.log('Household was updated');
        res.send(newHouse);
      }
    })
  },

  updatezip: function(req,res) {
    db.update_zip([req.body.zip,req.params.id],function(err,zip){
      if(err){
        console.log('Zip not updated');
        res.send(err);
      } else {
        console.log('Zip was updated');
        res.send(zip)
      }
    })
  },

  updatetheme: function(req, res) {
    console.log(req.body);
    db.update_theme([req.body.theme, req.body.userId], function(err,theme){
      if(err){
        res.send(err)
      }
      else{
        res.send(theme)
      }
    })
  }








} //end of module
