AutoForm.hooks({
  add: {
    onError: function(operation, error) {
      return App.alertError(error);
    }
  },
  addProspectForm: {
    onError: function(operation, error) {
      return App.alertError(error);
    }
  },
  addProspectForm:{
    before: {
    insert: function(doc) {
      doc.project = Session.get('active_project');

      return doc;
    }
  }
},
addProspectFormGoogle:{
  before: {
  insert: function(doc) {
    doc.project = Session.get('active_project');

    return doc;
  }
}
}
});

Template.addProspectForm.helpers({
  settings: function() {
    return {
      collection: Prospects,
      rowsPerPage: 10,
      showFilter: true,
      fields: [
        {
          'key': 'address.fullAddress',
          label: 'Address'
        },
        {
          'key': 'address.street',
          label: 'Street'
        }, {
          'key': 'address.unit',
          label: 'Unit'
        }, {
          'key': 'address.city',
          label: 'City'
        }, {
          'key': 'address.state',
          label: 'State'
        }, {
          'key': 'address.zip',
          label: 'Zip/PC'
        }, {
          'key': 'contacts.0.name',
          label: 'Name'
        }, {
          'key': 'contacts.0.phone',
          label: 'Phone'
        }, {
          'key': 'contacts.0.notes',
          label: 'Notes'
        }
      ]
    };
  }
});

Template.lists.helpers({
  prospect: function() {
    return Prospects.find();
  }
});
