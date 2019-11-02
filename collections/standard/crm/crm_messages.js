import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

const self = this.Meteor;

export default Crm_messages = new Mongo.Collection('crm_messages');

Crm_messages.deny({
    update: function (userId, doc) {
        return !!userId;
    }
});

Crm_messages.allow({
    insert: function (userId, doc) {
        return !!userId;
    }
});

Crm_messagesSchema = new SimpleSchema ({
    crm_author: {
        type: String,
        autoform: {
            type: "hidden",
        },
        autoValue: function () {
            return Meteor.user().emails[0].address;
        }
    },
    crm_title: {
        type: String,
        label: "Message Title"
    },
    crm_content: {
        type: String,
        label: "Message Content"
    },
    crm_ismail: {
        type: Boolean,
        label: "Is an email"
    },
    pipeline_id: {
        type: String,
        label: "Pipeline ID"
    },
    createdAt: {
        type: Date(),
        label: "Created At",
        autoValue: function () {
            return Date.now()
        },
        autoform: {
            type: "hidden",
        }
    }
});

// Meteor.methods({
//     crmDeleteSettings: function(id) {
//         Crm_messages.remove(id)
//     },
// });

Crm_messages.attachSchema(Crm_messagesSchema);