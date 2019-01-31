
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
    }
});

Meteor.methods({
    partnersDeletePartners: function(id) {
        Partners.remove(id)
    },
});

Partners.attachSchema(PartnersSchema);

