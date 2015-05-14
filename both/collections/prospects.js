this.Prospects = new Meteor.Collection('prospects');

Schemas.Prospects = new SimpleSchema({
  contacts: {
    type: Array,
    optional: true
  },
  'contacts.$': {
    type: Object
  },
  'contacts.$.name': {
    type: String,
    max: 50
  },
  'contacts.$.phone': {
    type: String,
    max: 10
  },
  'contacts.$.email': {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    max: 50
  },
  'contacts.$.notes': {
    type: String,
    max: 500
  },
  'address.fullAddress': {
    type: String
  },
  'address.lat': {
    type: Number,
    decimal: true
  },
  'address.lng': {
    type: Number,
    decimal: true
  },
  'address.street': {
    type: String,
    max: 100
  },
  'address.city': {
    type: String,
    max: 50
  },
  'address.state': {
    type: String
  },
  'address.zip': {
    type: String
  },
  'address.country': {
    type: String
  },
  'address.unit': {
    type: String,
    optional: true,
    max: 50
  },

  project: {
    autoform: {
      omit: true
    },
    type: String,
  },
  listId: {
    type: String,
    optional: true
  },
  createdAt: {
    autoform: {
      omit: true
    },
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    autoform: {
      omit: true
    },
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }
});

Prospects.attachSchema(Schemas.Prospects);

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Prospects = new Tabular.Table({
  name: "MasterList",
  collection: Prospects,
  columns: [
    {data: "address.street", title: "Street"},
    {data: "address.unit", title: "Unit"},
    {data: "address.city", title: "City"},
    {data: "address.state", title: "State"},
    {data: "address.zip", title: "ZIP/PC"},
    {width: "50%", data: "contacts.[]", title: "Contacts",
      tmpl: Meteor.isClient && Template.contacts
  }
  ]
});
