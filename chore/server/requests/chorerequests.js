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
    db.child_assigned_chores(function(err, chores) {
      if (err) {
        console.log('Assigned chores were not shown');
        res.send(err);
      } else {
        console.log('Assigned chores were shown');
        res.send(chores);
      }

    })
  }

} //end of module
