
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
        optional: true,
        label: "Partner address informations"
    },
    'address.street1': {
        type: String,
        optional: true,
        label: "Address street 1"
    },
    'address.street2': {
        type: String,
        optional: true,
        label: "Address street 2"
    },
    'address.city': {
        type: String,
        optional: true,
        label: "City"
    },
    'address.zip': {
        type: String,
        optional: true,
        label: "ZIP Code"
    },
    partner_details: {
        type: Object,
        label: "Partner details"
    },
    'partner_details.is_customer': {
        type: Boolean,
        optional: true,
        label: "Is a customer ?"
    }
});

Meteor.methods({
    partnersDeletePartners: function(id) {
        Partners.remove(id)
    },
});

Partners.attachSchema(PartnersSchema);

