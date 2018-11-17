import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

const self = this.Meteor;

Pipelines = new Mongo.Collection('pipelines');

Pipelines.allow({
    insert: function(userId, doc) {
        return !!userId;    
    },
    update: function (userId, doc) {
        return !!userId;
    }
});

PipelinesSchema = new SimpleSchema ({
    label: {
        type: String,
        label: "Label"
    },
    expected_revenue: {
        type: Number,
        label: "Expected Revenue"
    },
    probability: {
        type: SimpleSchema.Integer,
        label: "Probability",
        min: 0,
        max: 100
    },
    customer: {
        type: String,
        label: "Customer"
    },
    expected_closing: {
        type: Date,
        label: "Expected Closing",
        autoform: {
            class: "crm-classes",
        }
    },
    important: {
        type: Boolean,
        label: "Is it important ?"
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function () {
            return self.userId();
        },
        autoform: {
            type: "hidden",
        }
    },
    createdAt: {
        type: Date(),
        label: "Created At",
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type: "hidden",
        }
    }
});

Meteor.methods({
    crmDeletePipeline: function(id) {
        Pipelines.remove(id)
    },
});

Pipelines.attachSchema(PipelinesSchema);