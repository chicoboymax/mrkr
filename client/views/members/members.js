Template.members.helpers({
  'userList':function(){
    return Meteor.users.find({},{});
  },
  'invited':function(){
    var project = Projects.findOne({_id:Session.get('active_project')});
    return Meteor.users.find({_id:{$in:project.members}});
  },
  'isowner':function(parent){
    return parent.userId === Meteor.userId();
  }
});
Template.members.events({
  'click .inviteUser':function(evt,tmpl){
    var user = tmpl.find('#userToInvite').value;
    var project = Session.get('active_project');
    Meteor.call('inviteUser',project,user);
  },
  'click .removeUser':function(evt,tmpl){
    var user = this._id;
    var project = Session.get('active_project');
    Meteor.call('removeInvite',project,user);
  }
})
