import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbarcrm.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});


// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.crmTreeView.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('Pipelines');
    });
});

Template.crmNewPipeline.onCreated(function () {
    var self = this;

    // Meteor.call('tw_field_decoration', 'new-pipelines-form'); // To Use later

});

// LOAD DATA ON TEMPLATES 
Template.crmTreeView.helpers({
    pipelines: () => {
        return Pipelines.find({}, { limit: 10 });
    }
});

Template.crmTreeView.events({
    'click .btn-danger': function () {
        Meteor.call('crmDeletePipeline', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .export-csv': function (events, template) {
        var data = Papa.unparse(Pipelines.find({}, { limit: 10 }).fetch());
        var date = new Date().toISOString().slice(0, 10);
        Meteor.call('download_csv', data, 'crm_'+date+'.csv', 'text/csv;encoding:utf-8');
        swal("Yeah !", "Your CSV document is available !", "success");
    },
});

// CRM ADD TEMPLATE

Template.crmNewPipeline.events({
    'click button[type="submit"]': function () {
        swal("Hooray !", "This record was properly created !", "success");
    },
});