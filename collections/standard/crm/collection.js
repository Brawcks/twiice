import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

Pipelines = new Mongo.Collection('pipelines');

Pipelines.allow({
    insert: function(userId, doc) {
        return !!userId;    
    }
});

PipelinesSchema = new SimpleSchema ({
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
    crmDeletePipeline: function(id) {
        Pipelines.remove(id)
    },
});

Pipelines.attachSchema(PipelinesSchema);