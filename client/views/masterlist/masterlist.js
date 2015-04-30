



Template.masterlist.helpers({
  settings: function() {
    return {
      collection: Prospects,
      rowsPerPage: 10,
      showFilter: true,
      showColumnToggles: true,
      fields: [
        {
          'key': 'address.streetNumber',
          label: 'Street Number'
        }, {
          'key': 'address.streetName',
          label: 'Street Name'
        }, {
          'key': 'address.streetApp',
          label: 'App.'
        }, {
          'key': 'address.city',
          label: 'City'
        }, {
          'key': 'address.province',
          label: 'Province'
        }, {
          'key': 'address.postalCode',
          label: 'Postal Code'
        },  {
          'key': 'contacts.0.name',
          label: 'Name'
        }, {
          'key': 'contacts.0.phone',
          label: 'Phone'
        }, {
          'key': 'contacts.0.email',
          label: 'Email'
        }, {
          'key': 'contacts.0.notes',
          label: 'Notes'
        }
      ]
    };
  },
  prospectList:function(){
   return Meteor.prospects.find();
 }
});
