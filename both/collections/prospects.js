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
  address: {
    type: Object
  },
  'address.streetNumber': {
    type: String,
    max: 50
  },
  'address.streetName': {
    type: String,
    max: 100
  },
  'address.streetApp': {
    type: String,
    optional: true,
    max: 50
  },
  'address.city': {
    type: String,
    max: 50
  },
  'address.province': {
    type: String,
    max: 50
  },
  'address.postalCode': {
    type: String,
    optional: true,
    max: 6
  },
  project: {
    autoform: {
      omit: true
    },
    type: String,
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
