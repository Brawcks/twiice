import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Project = new Mongo.Collection('project');

Project.allow({
    insert: function(userId, doc) {
        return !!userId;    
    },
    update: function (userId, doc) {
        return !!userId;
    }
});

Project_Schema = new SimpleSchema ({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"
    },
    state: {
        type: String,
        label: "State",
        allowedValues: ['To do', 'Doing', 'Done']
    }
});

Meteor.methods({
    projectDelete: function(id) {
        Project.remove(id)
    },
});

Project.attachSchema(Project_Schema);