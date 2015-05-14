Template.masterlist.helpers({
  selector: function () {
    return {project:Session.get('active_project')};
  }
});

Template.listN.helpers({
  listName: function() {
  return Lists.findOne({_id:this.listId});
}
});

Template.deleteProspect.helpers({
  isOwner: function() {
      var project = Projects.findOne({_id:Session.get('active_project')});
      return Meteor.userId() === project.userId;
    }
});
