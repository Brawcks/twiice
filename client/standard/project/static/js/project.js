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
        self.subscribe('Collection_sample');
    });
});
Template.projectKanbanView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Collection_sample');
    });
});

// LOAD DATA ON TEMPLATES 
Template.projectTreeView.helpers({
    collection_sample: () => {
        return Collection_sample.find({});
    }
});
Template.projectKanbanView.helpers({
    collection_todo: () => {
        return Collection_sample.find({ state: "To do" });
    },
    collection_doing: () => {
        return Collection_sample.find({ state: "Doing" });
    },
    collection_done: () => {
        return Collection_sample.find({ state: "Done" });
    }
});

Template.projectTreeView.events({
    'click .btn-danger': function (){
        Meteor.call('projectDeleteCollection_sample', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .export-csv': function(events, template){
        var data = Papa.unparse(Collection_sample.find({}, { limit: 10 }).fetch());
        var date = new Date().toISOString().slice(0, 10);
        Meteor.call('download_csv', data, 'project_'+date+'.csv', 'text/csv;encoding:utf-8');
        swal("Yeah !", "Your CSV document is available !", "success");
    }
});

// CRM ADD TEMPLATE

Template.newCollectionSampleproject.events({
    'click button[type="submit"]': function (){
        if(state === ""){
            swal('Oops...', 'You forget something!', 'error');
        }else{
            swal("Hooray !", "This record was properly created !", "success");
        };
    },
});
