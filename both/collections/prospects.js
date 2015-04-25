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
    type: String
  },
  'contacts.$.phone': {
    type: String
  },
  'contacts.$.notes': {
    type: String
  },
  address: {
    type: Object
  },
  'address.streetNumber': {
    type: String
  },
  'address.streetName': {
    type: String
  },
  'address.streetApp': {
    type: String,
    optional: true
  },
  'address.city': {
    type: String
  },
  'address.province': {
    type: String
  },
  'address.postalCode': {
    type: String,
    optional: true
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

({
  project: {
    type: String,
    autoValue: function() {
      return Session.get('active_project');
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
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
