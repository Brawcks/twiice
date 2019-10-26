
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

websiteArticlesCategories = new Mongo.Collection('websiteArticlesCategories');

websiteArticlesCategories.allow({
    insert: function(userId, doc) {
        return !!userId;    
    }
});

websiteArticlesCategories_sampleSchema = new SimpleSchema ({
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
    websiteDeleteArticlesCategories: function(id) {
        websiteArticlesCategories.remove(id);
        websiteCollection_sample.update({articleCategory_id: id}, {$set: {articleCategory_id: null}});
    },
});

websiteArticlesCategories.attachSchema(websiteArticlesCategories_sampleSchema);

