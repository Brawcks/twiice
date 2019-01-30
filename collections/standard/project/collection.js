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
    datebegin: {
        type: Date,
        label: "Project beginning"
    },
    dateend: {
        type: Date,
        label: "Project Ending"
    },
    priority: {
        type: String,
        label: "Priority",
        allowedValues: ['Faible', 'Normale', 'Élevée']
    },
    ower: {
        type: String,
        label: "Owner"
    }

});

Meteor.methods({
    projectDelete: function(id) {
        Project.remove(id)
    },
});

Project.attachSchema(Project_Schema);