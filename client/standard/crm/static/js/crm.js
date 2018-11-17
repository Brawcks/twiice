import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbarcrm.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});


// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.crmTreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Pipelines');
    });
});

// LOAD DATA ON TEMPLATES 
Template.crmTreeView.helpers({
    pipelines: () => {
        return Pipelines.find({});
    }
});

Template.crmTreeView.events({
    'click .btn-danger': function (){
        Meteor.call('crmDeletePipeline', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
});