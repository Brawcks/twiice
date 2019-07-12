
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

var collections = Mongo.Collection.getAll();

Partners = new Mongo.Collection('partners');

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
    email: {
        type: String,
        label: "Partner email"
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
        Partners.remove(id);
        Pipelines.update({partners_id: id}, {$set: {partners_id: null}}); // FIXME : We should find a better way to do this
    },
});

Partners.attachSchema(PartnersSchema);

