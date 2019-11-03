import { leftSidebarCustomer } from './functions/functions.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { isEmptyObject, filter_operator } from '../../../tpee/static/js/functions/functions.js';

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////     INIT TEMPLATES     /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
    
    // Here we will build pagination
    instance.page = new ReactiveVar({});
    instance.computedSkip = new ReactiveVar({});
    // Use the value below to define how many result you want to display
    instance.resultPerPage = new ReactiveVar({});
    instance.resultPerPage.set(3);


    if (FlowRouter.getParam('page')) {
        instance.page.set(FlowRouter.getParam('page'));
        instance.computedSkip.set((instance.resultPerPage.get() * instance.page.get()) - instance.resultPerPage.get());
    } else {
        instance.computedSkip.set(0);
        instance.page.set(0);
    }
});

Template.partnersKanbanView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Partners');
    });
    // Here we build the instance to set variables
    const instance = this;
    // This var will allow us to use filters on collection, with events and helpers
    instance.filtersVar = new ReactiveVar({});
    
    // Here we will build pagination
    instance.page = new ReactiveVar({});
    instance.computedSkip = new ReactiveVar({});
    // Use the value below to define how many result you want to display
    instance.resultPerPage = new ReactiveVar({});
    instance.resultPerPage.set(3);


    if (FlowRouter.getParam('page')) {
        instance.page.set(FlowRouter.getParam('page'));
        instance.computedSkip.set((instance.resultPerPage.get() * instance.page.get()) - instance.resultPerPage.get());
    } else {
        instance.computedSkip.set(0);
        instance.page.set(0);
    }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////     END TEMPLATES     //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     HELPERS     /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

Template.sideNavbarpartners.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// LOAD DATA ON TEMPLATES 
Template.partnersTreeView.helpers({
    partners: () => {
        return Partners.find(Template.instance().filtersVar.get(), { 
            limit: Template.instance().resultPerPage.get(), 
            skip: Template.instance().computedSkip.get()
        });
    },
    pagination: () => {
        var totalRecords = Partners.find().count();
        var pagesNumber = Math.trunc(totalRecords / Template.instance().resultPerPage.get());
        var lastRecords = totalRecords % Template.instance().resultPerPage.get();
        switch (lastRecords) {
            case 0:
                break;
            default:
                pagesNumber += 1;
                break;
        };
        var displayPages = "";
        if (pagesNumber > 1) {
            displayPages = '<li class="page-item tw-paginate-button"><a class="page-link" id="'+(Template.instance().page.get() - 1)+'" href="'+FlowRouter.path('partners/page')+'/'+(Template.instance().page.get() - 1)+'">Previous</a></li>';
            if (Template.instance().page.get() == 0) {
                displayPages = '<li class="page-item tw-paginate-button"><a class="page-link" id="'+(Template.instance().page.get() + 1)+'" href="'+FlowRouter.path('partners/page')+'/'+(Template.instance().page.get() + 1)+'">Previous</a></li>';
            } 
            for (let index = 1; index <= pagesNumber; index++) {
                displayPages += '<li class="page-item tw-paginate-button"><a class="page-link" id="'+index+'" href="'+FlowRouter.path('partners/page')+'/'+index+'">'+index+'</a></li>';
            };
            displayPages += '<li class="page-item tw-paginate-button"><a class="page-link" id="'+(parseFloat(Template.instance().page.get()) + parseFloat(1))+'" href="'+FlowRouter.path('partners/page')+'/'+(parseFloat(Template.instance().page.get()) + parseFloat(1))+'">Next</a></li>';
        }
        return displayPages;
    },
    collection_key: () => {
        var filters_partners = [];
        for (var key in Partners.findOne({})) {
            filters_partners.push(key);
        }
        return filters_partners;
    }
});
// Simple inheritance for other templates
Template.partnersKanbanView.inheritsHelpersFrom('partnersTreeView');
Template.partnersHeader.inheritsHelpersFrom('partnersTreeView');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////    END HELPERS     ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     EVENTS     //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

Template.partnersTreeView.events({
    'click .btn-danger': function (){
        Meteor.call('partnersDeletePartners', this._id);
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .export-csv': function(events, template){
        var data = Papa.unparse(Partners.find(Template.instance().filtersVar.get(), { 
            limit: Template.instance().resultPerPage.get(), 
            skip: Template.instance().computedSkip.get()
        }).fetch());
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
        var concatFilters = Template.instance().filtersVar.get();
        var filterOperator = $('#partnersFilterOperator').val();
        var selectFilter = $('#partnersFilterSelect').val();
        var filterVal = $('.tw-filter-input').val();
        Template.instance().filtersVar.set(filter_operator(concatFilters, filterOperator, selectFilter, filterVal))
    },
    'click .tw-filter-remove': function (events, template) {
        Template.instance().filtersVar.set({});
    },
    'click .tw-paginate-button': function (events, template) {
        Template.instance().page.set(event.target.id)
        Template.instance().computedSkip.set((Template.instance().resultPerPage.get() * event.target.id) - Template.instance().resultPerPage.get())
    },
    'keyup #resultsNumber': function (events, template) {
        var resultsNumber = $('#resultsNumber').val();
        Template.instance().resultPerPage.set(parseFloat(resultsNumber));
    }
});
// Simple inheritance of tree events
Template.partnersKanbanView.inheritsEventsFrom('partnersTreeView');
Template.partnersHeader.inheritsEventsFrom('partnersTreeView');

// CRM ADD TEMPLATE

Template.newCollectionSamplepartners.events({
    'click button[type="submit"]': function (){
        swal("Hooray !", "This record was properly created !", "success");
    },
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////     END EVENTS     ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
