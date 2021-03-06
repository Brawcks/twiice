import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { TAPi18n as _t } from 'meteor/tap:i18n';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform', 'foreign_key', 'cascade']);

const self = this.Meteor;
// const setting = Crm_settings.find({crm_settings: true}).fetch();

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
    description: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            title: "Field name : description",
            placeholder: "Fill a description",
            type: "textarea"
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
    partners_id: {
        type: String,
        label: "Customer",
        foreign_key: true,
        cascade: false,
        optional: true,
        autoform: {
            type: 'select',
            options: function() { 
                let partners = Partners.find({'partner_details.is_customer': true}).map((doc) => ({
                    label: doc['name'] + ' ' + doc['surname'],
                    value: doc['_id']
                 }))
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
        optional: true,
        autoValue: function () {
            return Meteor.user().emails[0].address;
        },
        autoform: {
            type: "hidden",
        }
    },
    lastModifiedOn: {
        type: Date(),
        label: "Last Modified On",
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
        Pipelines.remove(id);
    }
});

Pipelines.attachSchema(PipelinesSchema);