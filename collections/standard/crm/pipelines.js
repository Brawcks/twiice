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
        label: "Label",
        autoform: {
            title: "Field name : label",
            placeholder: "Name this opportunity",
        }
    },
    opportunity_qualification: {
        type: String,
        label: "Opportunity qualification",
        allowedValues: ['Low', 'Medium', 'High']
    },
    expected_revenue: {
        type: Number,
        label: "Expected Revenue",
        optional: true,
        autoform: {
            placeholder: "How much could you earn ?",
            class: "tw-field-currency"
        }
    },
    probability: {
        type: SimpleSchema.Integer,
        label: "Probability",
        min: 0,
        max: 100,
        optional: true,
        autoform: {
            placeholder: "What probability to win this opportunity ?",
        }
    },
    customer: {
        type: String,
        label: "Customer",
        optional: true,
        autoform: {
            type: 'select',
            options: function() { 
                let partners = [];
                Partners.find({'partner_details.is_customer': true}).forEach((doc) => {
                    object = {};
                    object.label = doc['name'] + ' ' + doc['surname'];
                    object.value = doc['_id'];
                    partners.push(object);
                });
                return partners;
            }
        }
        // allowedValues() {
        //     return Partners.find({'partner_details.is_customer': true}).map(s => s.name + ' ' + s.surname + ' | ' + s._id)
        // }
    },
    expected_closing: {
        type: Date,
        label: "Expected Closing",
        optional: true,
        autoform: {
            class: "crm-classes",
        }
    },
    important: {
        type: Boolean,
        label: "Is it important ?",
    },
    crm_steps: {
        type: String,
        optional: true,
        label: "Pipeline step",
        allowedValues: ['Proposal', 'Qualified', 'Won', 'Loss']
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