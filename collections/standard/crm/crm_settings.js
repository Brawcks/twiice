import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

const self = this.Meteor;

export default Crm_settings = new Mongo.Collection('crm_settings');

Crm_settings.allow({
    update: function (userId, doc) {
        return !!userId;
    }
});

Crm_settings.deny({
    insert: function (userId, doc) {
        return !!userId;
    }
});

Crm_settingsSchema = new SimpleSchema ({
    crm_settings: {
        type: Boolean,
        autoform: {
            type: "hidden",
        }
    },
    crm_favorite: {
        type: Boolean,
        label: "Enable favorite"
    },
    crm_steps: {
        type: Boolean,
        label: "Enable CRM steps"
    }
});

Meteor.methods({
    crmDeleteSettings: function(id) {
        Crm_settings.remove(id)
    },
});

Crm_settings.attachSchema(Crm_settingsSchema);