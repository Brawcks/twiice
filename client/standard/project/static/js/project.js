import { leftSidebarCustomer } from './functions/functions.js';


Template.sideNavbarproject.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.projectTreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Project');
    });
});

Template.newProject.onCreated(function() {
    var self = this;
    self.autorun(function() {
        // Subscribe to many to one collection relation.
        self.subscribe('Partners');
    });
});

Template.projectKanbanView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Project');
    });
});

// LOAD DATA ON TEMPLATES 
Template.projectTreeView.helpers({
    collection_sample: () => {
        return Project.find({});
    }
});
Template.projectKanbanView.helpers({
    project_todo: () => {
        return Project.find({ state: "To do" });
    },
    project_doing: () => {
        return Project.find({ state: "Doing" });
    },
    project_done: () => {
        return Project.find({ state: "Done" });
    }
});

Template.projectTreeView.events({
    'click .btn-danger': function (){
        Meteor.call('projectDelete', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .export-csv': function(events, template){
        var data = Papa.unparse(Project.find({}, { limit: 10 }).fetch());
        var date = new Date().toISOString().slice(0, 10);
        Meteor.call('download_csv', data, 'project_'+date+'.csv', 'text/csv;encoding:utf-8');
        swal("Yeah !", "Your CSV document is available !", "success");
    }
});
Template.projectKanbanView.events({
    'click .btn-danger': function(){
        Meteor.call('projectDelete', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
});

// PROJECT ADD TEMPLATE

Template.newProject.events({
    'click button[type="submit"]': function (){
            swal("Hooray !", "This record was properly created !", "success");
    }
});
