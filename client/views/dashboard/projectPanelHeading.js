Template.projectPanelHeading.helpers({
  editing_projectname: function () {
    return Session.get('editing_projectname');
  },
  editing_datedue: function () {
    return Session.get('editing_datedue');
  },
  isSelected: function (parent) {
    return this._id === parent.customer;
  }
})
Template.projectPanelHeading.events({
  'click .projectNameEdit': function (evt, tmpl) {
    Session.set('editing_projectname', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectName').focus().select();
    }, 250);
  },
  'click .projectDateDue': function (evt, tmpl) {
    Session.set('editing_datedue', true);
    Meteor.setTimeout(function () {
      $('.dateDue').datepicker({
        onSelect: function (dateText) {
          Meteor.call('updateProjectDate', Session.get('active_project'), dateText);
          Session.set('editing_datedue', false);
        }
      });
    }, 1000)
  },
  'blur .projectName': function (evt, tmpl) {
    Session.set('editing_projectname', false);
  },
  'keyup .projectName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.projectName');
      Meteor.call('updateProjectName', this._id, ele.value);
      Session.set('editing_projectname', false);
    }
  }
});
