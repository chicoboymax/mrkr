Meteor.publish('prospects', function(project) {
  return Prospects.find({project:project});
});
Meteor.publish('projects',function(userId){
  return Projects.find({$or:[{invited:this.userId},{userId:this.userId}]});
});
Meteor.publish(null,function(){
  return Meteor.roles.find({});
});
