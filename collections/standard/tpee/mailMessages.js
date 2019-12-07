import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

const self = this.Meteor;

export default mailMessages = new Mongo.Collection('mailMessages');

mailMessages.deny({
    update: function (userId, doc) {
        return !!userId;
    }
});

mailMessages.allow({
    insert: function (userId, doc) {
        return !!userId;
    }
});

mailMessagesSchema = new SimpleSchema ({
    author: {
        type: String,
        autoform: {
            type: "hidden",
        }
    },
    title: {
        type: String,
        label: "Message Title"
    },
    content: {
        type: String,
        label: "Message Content"
    },
    ismail: {
        type: Boolean,
        label: "Is an email"
    },
    isReply: {
        type: Boolean,
        label: "Is a reply"
    },
    document_id: {
        type: String,
        label: "Document ID"
    },
    collection: {
        type: String,
        label: "Collection"
    },
    messageId: {
        type: String,
        label: "Message ID"
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
//         mailMessages.remove(id)
//     },
// });

mailMessages.attachSchema(mailMessagesSchema);