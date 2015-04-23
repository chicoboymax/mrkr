Meteor.publish('prospects', function() {
  return Prospects.find();
});
Meteor.publish('projects',function(userId){
  return Projects.find({$or:[{invited:this.userId},{userId:this.userId}]});
});
Meteor.publish('customers',function(){
  return Customers.find();
});
Meteor.publish(null,function(){
  return Meteor.roles.find({});
});
