var app = require('../../server.js');

var db = app.get('db');

module.exports = {

  showdefaultchores: function(req, res, next) {
    db.default_chores(function(err, chores) {
      if (err) {
        console.log('chores were not shown');
        res.send(err);
      } else {
        console.log('chores were shown');
        res.status(200).json(chores);
      }
    })
  },

  assignchore: function(req, res, next) {
    var r = req.body;
    var assignedArr = [
      r.user_id_fk,
      r.user_household_fk,
      r.chore_name,
      r.chore_description,
      r.chore_value,
      r.chore_daily,
      r.chore_weekly,
      r.chore_monthly
    ];
    db.assign_chore(assignedArr, function(err, chore) {
      if (err) {
        console.log('assigned chore was not created')
        res.send(err);
      } else {
        console.log('assigned chore was created')
        res.send(chore);
      }
    })
  },

  removeassignedchore: function(req, res, next) {
    db.delete_assigned_chores(req.params.id, function(err, chore) {
      if (err) {
        console.log('assigned chore was not deleted');
        res.send(err);
      } else {
        console.log('assigned chore was deleted');
        res.send(chore)
      }
    })
  },

  updateassignedchore: function(req, res, next) {
    var r = req.body;
    var updatechoreArr = [
      r.chore_name,
      r.chore_description,
      r.chore_value,
      r.chore_daily,
      r.chore_weekly,
      r.chore_monthly,
      req.params.id
    ];
    db.update_assigned_chore(updatechoreArr, function(err, chore) {
      if (err) {
        console.log('assigned chore was not updated')
        res.send(err);
      } else {
        console.log('assigned chore was updated');
        res.send(chore);
      }
    })
  },

  getassignedchores: function(req, res, next) {
    db.child_assigned_chores(req.params.id,function(err, chores) {
      if (err) {
        console.log('Assigned chores were not shown');
        res.send(err);
      } else {
        console.log('Assigned chores were shown');
        res.send(chores);
      }

    })
  },

  updatepoints: function(req, res, next) {
    db.set_chore_status(req.params.id, function(err, values) {
      if (err) {
        console.log('values were not returned')
        res.send(err);
      } else {
        db.set_user_points([
          values[0].chore_value, values[0].user_id_fk
        ], function(err, total) {
          console.log('value was updated')
          res.send(total);
        })
      }
    })
  },

  pointstozero: function(req,res,next) {
    db.set_points_to_zero(req.params.id, function(err,points){
      if(err) {
        console.log('points were not changed to zero');
        res.send(err);
      } else{
        console.log('points were changed to zero');
        res.send(points);
      }
    })
  },

  minuspoints: function(req,res,next) {
    var r = req.body;
    db.minus_points([r.points,req.params.id],function(err,points){
      if(err) {
        console.log('points were not minused');
        res.send(err);
      } else{
        console.log('points were minused');
        res.send(points);
      }
    })
  },

  addpoints: function(req,res,next) {
    var r = req.body;
    db.add_points([r.points,req.params.id],function(err,points){
      if(err) {
        console.log('points were not added');
        res.send(err);
      } else{
        console.log('points were added');
        res.send(points);
      }
    })
  },

  getdailychore: function(req,res){
    db.get_daily_chore(req.params.id,function(err,chore){
      if(err){
        console.log(chore was not sent);
        res.send(err)
      } else{
        console.log(chore was sent);
        res.status(200).json(chore);
            }
    })
  },

  getweeklychore: function(req,res){
    db.get_weekly_chore(req.params.id,function(err,chore){
      if(err){
        console.log(chore was not sent);
        res.send(err)
      } else{
        console.log(chore was sent);
        res.status(200).json(chore);
            }
    })
  },

  getmonthlychore: function(req,res){
    db.get_monthly_chore(req.params.id,function(err,chore){
      if(err){
        console.log(chore was not sent);
        res.send(err)
      } else{
        console.log(chore was sent);
        res.status(200).json(chore);
            }
    })
  }

} //end of module
