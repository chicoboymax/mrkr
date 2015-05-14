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
