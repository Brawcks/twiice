import { leftSidebarCustomer, filter_operator } from './functions/functions.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.sideNavbarpartners.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.partnersTreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Partners');
    });
    // Here we build the instance to set variables
    const instance = this;
    // This var will allow us to use filters on collection, with events and helpers
    instance.filtersVar = new ReactiveVar({});
});

// LOAD DATA ON TEMPLATES 
Template.partnersTreeView.helpers({
    partners: () => {
        return Partners.find(Template.instance().filtersVar.get(), { limit: 10 });
    },
    collection_key: () => {
        var filters_partners = [];
        for (var key in Partners.findOne({})) {
            filters_partners.push(key);
        }
        return filters_partners;
    }
});

Template.partnersTreeView.events({
    'click .btn-danger': function (){
        Meteor.call('partnersDeletePartners', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .export-csv': function(events, template){
        var data = Papa.unparse(Partners.find({}, { limit: 10 }).fetch());
        var date = new Date().toISOString().slice(0, 10);
        Meteor.call('download_csv', data, 'partners_'+date+'.csv', 'text/csv;encoding:utf-8');
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
        var filterOperator = $('#partnersFilterOperator').val();
        var selectFilter = $('#partnersFilterSelect').val();
        var filterVal = $('.tw-filter-input').val();
        Template.instance().filtersVar.set(filter_operator(filterOperator, selectFilter, filterVal))
    },
    'click .tw-filter-remove': function (events, template) {
        Template.instance().filtersVar.set({});
        console.log(Meteor.user());
    },
});

// CRM ADD TEMPLATE

Template.newCollectionSamplepartners.events({
    'click button[type="submit"]': function (){
        swal("Hooray !", "This record was properly created !", "success");
    },
});
