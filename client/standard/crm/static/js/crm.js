import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbarcrm.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});


// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.crm.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Pipelines');
    });
});

// LOAD DATA ON TEMPLATES 
Template.crm.helpers({
    pipelines: () => {
        return Pipelines.find({});
    }
});

Template.crm.events({
    'click .btn-danger': function (){
        Meteor.call('crmDeletePipeline', this._id);
    },
});