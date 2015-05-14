Template.projectView.helpers({
  prospect: function() {
    return Prospects.find();
  },
  myLists: function() {
    return Lists.find({assignedTo:Meteor.userId()});
  },
  prospectInList: function() {
    var list = Lists.findOne({_id:this._id});
    return Prospects.find({listId:list._id});
  }
});
