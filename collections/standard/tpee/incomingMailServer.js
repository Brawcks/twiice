// TODO 

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

incomingMailServer = new Mongo.Collection('incomingMailServer');

incomingMailServer.allow({
    update: function(userId, doc) {
        return !!userId;    
    },
    insert: function(userId, doc) {
        return !!userId;    
    }
});

incomingMailServerSchema = new SimpleSchema ({
    setting1: {
        type: Boolean,
        label: "Setting 1"
    },
    setting2: {
        type: Boolean,
        label: "Setting 2"
    },
    tpee_settings: {
        type: Boolean,
        autoform: {
            type: "hidden"
        }
    }
});

// Meteor.methods({
//     DeleteGeneral_settings: function(id) {
//         General_settings.remove(id)
//     },
// });

General_settings.attachSchema(General_settingsSchema);

