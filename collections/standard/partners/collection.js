
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Partners = new Mongo.Collection('Partners');

Partners.allow({
    insert: function(userId, doc) {
        return !!userId;    
    }
});

PartnersSchema = new SimpleSchema ({
    name: {
        type: String,
        label: "Partner name"
    },
    surname: {
        type: String,
        label: "Partner surname"
    },
    address: {
        type: Object,
        label: "Partner address informations"
    },
    'address.street1': {
        type: String,
        label: "Address street 1"
    },
    'address.street2': {
        type: String,
        optional: true,
        label: "Address street 2"
    },
    'address.city': {
        type: String,
        label: "City"
    },
    'address.zip': {
        type: String,
        label: "ZIP Code"
    }
});

Meteor.methods({
    partnersDeletePartners: function(id) {
        Partners.remove(id)
    },
});

Partners.attachSchema(PartnersSchema);

