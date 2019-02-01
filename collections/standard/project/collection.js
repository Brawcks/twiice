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
        label: "Name *"
    },
    subtitle: {
        type: String,
        label: "Subtitle *"
    },
    desc: {
        type: String,
        label: "Description",
        optional: true
    },
    client: {
        type: String,
        label: "Client name",
        allowedValues() {
            return Partners.find({}).map(s => s.name + ' ' + s.surname);
        }
    },
    state: {
        type: String,
        label: "State *",
        allowedValues: ['To do', 'Doing', 'Done']
    },
    dateBegin: {
        type: Date,
        label: "Project beginning",
        optional: true
    },
    dateEnd: {
        type: Date,
        label: "Project Ending",
        optional: true
    },
    priority: {
        type: String,
        label: "Priority *",
        allowedValues: ['Low', 'Normal', 'High']
    },
    owner: {
        type: String,
        label: "Owner *"
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