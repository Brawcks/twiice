import { leftSidebarCustomer, filter_operator } from './functions/functions.js';
import { ReactiveVar } from 'meteor/reactive-var';

var publicSettings = Meteor.settings.public;

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
        var filters = [];
        for (var key in Pipelines.findOne({})) {
            // console.log(key);
            filters.push(key);
        }
        console.log(filters);
    });

    if (FlowRouter.getParam('page')) {
        var page = FlowRouter.getParam('page');
    }

    // Here we build the instance to set variables
    const instance = this;
    // This var will allow us to use filters on collection, with events and helpers
    instance.filtersVar = new ReactiveVar({});
});

Template.crmNewPipeline.onCreated(function () {
    var self = this;
    // Meteor.call('tw_field_decoration', 'new-pipelines-form'); // To Use later

});

// LOAD DATA ON TEMPLATES 
Template.crmTreeView.helpers({
    pipelines: () => {
        // here we return data according on our filters. If no filter, filtersVar is an empty object
        // so we will get all the data
        return Pipelines.find(Template.instance().filtersVar.get(), { limit: 10 });
    },
    collection_key: () => {
        var filters = [];
        for (var key in Pipelines.findOne({})) {
            filters.push(key);
        }
        return filters;
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
        Meteor.call('download_csv', data, 'crm_' + date + '.csv', 'text/csv;encoding:utf-8');
        swal("Yeah !", "Your CSV document is available !", "success");
    },
    'click .import-csv': function (events, template) {
        swal("Ooops !", "This function is not available yet !", "info");
        // $(".import-csv-file").click();
        // $(".import-csv-file").change(function () {
        //     var fileInput = document.querySelector('.import-csv-file');
        //     var reader = new FileReader();
        //     reader.addEventListener('load', function () {
        //         alert('Contenu du fichier "' + fileInput.files[0].name + '" :\n\n' + reader.result);
        //     });
        //     reader.readAsText(fileInput.files[0]);
        //     console.log(Papa.parse(reader.result, {delimiter: ";"}));
        // });
    },
    'click .tw-filter-submit': function (events, template) {
        // swal("Ooops !", "This function is not available yet !", "info");
        var filterOperator = $('#crmFilterOperator').val();
        var selectFilter = $("#crmFilterSelect").val();
        var filterVal = $(".tw-filter-input").val();
        Template.instance().filtersVar.set(filter_operator(filterOperator, selectFilter, filterVal))
    },
    'click .tw-filter-remove': function (events, template) {
        Template.instance().filtersVar.set({});
    },
});

// CRM ADD TEMPLATE

Template.crmNewPipeline.events({
    'click button[type="submit"]': function () {
        swal("Hooray !", "This record was properly created !", "success");
    },
});