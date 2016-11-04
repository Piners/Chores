var app = require('../../server.js');

var db = app.get('db');

module.exports = {

createreward: function(req,res,next) {
  var r = req.body;
  var rewardArr = [r.reward_total,r.reward_type,r.reward_description,r.user_id_fk,r.user_household_fk];
  db.add_reward(rewardArr,function(err,reward){
    if(err) {
      console.log('reward was not added');
      res.send(err);
    } else{
      console.log('reward was added');
      res.send(reward);
    }
  })
},

showchildrewards: function(req,res,next){
  db.find_child_rewards(req.params.id,function(err,reward){
    if(err){
      console.log('rewards were not shown');
      res.send(err);
    } else {
      console.log('rewards were shown');
      res.send(reward);
    }
  })
},
removeReward: function(req,res){
  db.delete_reward([req.body.userId, req.body.rewardId], function(err,reward){
    if(err){
      res.send(err)
    }
    else{
      res.send(reward)
    }
  })
}

  } //end of module
