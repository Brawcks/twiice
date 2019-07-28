
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

websiteCollection_sample = new Mongo.Collection('websiteCollection_sample');

websiteCollection_sample.allow({
    insert: function(userId, doc) {
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
    websiteDeleteCollection_sample: function(id) {
        websiteCollection_sample.remove(id)
    },
});

websiteCollection_sample.attachSchema(Collection_sampleSchema);

