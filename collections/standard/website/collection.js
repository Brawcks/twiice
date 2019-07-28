
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
    },
    articleCategory_id: {
        type: String,
        label: "Category",
        optional: true,
        autoform: {
            type: 'select',
            options: function() { 
                let categories = websiteArticlesCategories.find({}).map((doc) => ({
                    label: doc['name'],
                    value: doc['_id']
                 }))
                return categories;
            }
        }
        // allowedValues() {
        //     return Partners.find({'partner_details.is_customer': true}).map(s => s.name + ' ' + s.surname + ' | ' + s._id)
        // }
    }
});

Meteor.methods({
    websiteDeleteCollection_sample: function(id) {
        websiteCollection_sample.remove(id)
    },
});

websiteCollection_sample.attachSchema(Collection_sampleSchema);

