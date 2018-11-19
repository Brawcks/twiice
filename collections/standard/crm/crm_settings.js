import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

const self = this.Meteor;

Crm_settings = new Mongo.Collection('crm_settings');

Crm_settings.allow({
    insert: function(userId, doc) {
        return !!userId;    
    },
    update: function (userId, doc) {
        return !!userId;
    }
});

Crm_settingsSchema = new SimpleSchema ({
    crm_favorite: {
        type: Boolean,
        label: "Enable favorite"
    }
});

Meteor.methods({
    crmDeleteSettings: function(id) {
        Crm_settings.remove(id)
    },
});

Crm_settings.attachSchema(Crm_settingsSchema);