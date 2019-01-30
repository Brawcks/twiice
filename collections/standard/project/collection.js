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
    },
    
});

Project_Schema = new SimpleSchema ({
    name: {
        type: String,
        label: "Name"
    },
    subtitle: {
        type: String,
        label: "Subtitle"
    },
    desc: {
        type: String,
        label: "Description"
    },
    state: {
        type: String,
        label: "State",
        allowedValues: ['To do', 'Doing', 'Done']
    },
    dateBegin: {
        type: Date,
        label: "Project beginning"
    },
    dateEnd: {
        type: Date,
        label: "Project Ending"
    },
    priority: {
        type: String,
        label: "Priority",
        allowedValues: ['Low', 'Normal', 'High']
    },
    owner: {
        type: String,
        label: "Owner"
    },
    title: {
        type: String,
        label: "Title",
        optional: true
    }

});

Meteor.methods({
    projectDelete: function(id) {
        Project.remove(id)
    },
});

Project.attachSchema(Project_Schema);