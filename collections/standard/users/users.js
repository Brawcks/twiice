import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.users.allow({
    update: function (userId, doc) {
        return !!userId;
    },
    remove: function(userId, doc) {
        return !!userId;
    }
})
