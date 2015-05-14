Template.projectView.helpers({
  myLists: function() {
    return Lists.find({assignedTo:Meteor.userId()});
  },
  prospectInList: function() {
    var list = Lists.findOne({_id:this._id});
    return Prospects.find({listId:list._id});
  }
});
