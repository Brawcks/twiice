
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Collection_sample = new Mongo.Collection('collection_sample');

Collection_sample.allow({
    insert: function(userId, doc) {
        return !!userId;    
    },
    update: function (userId, doc) {
        return !!userId;
    }
});

Collection_sampleSchema = new SimpleSchema ({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"
    }
});

Meteor.methods({
    projectDeleteCollection_sample: function(id) {
        Collection_sample.remove(id)
    },
});

Collection_sample.attachSchema(Collection_sampleSchema);

