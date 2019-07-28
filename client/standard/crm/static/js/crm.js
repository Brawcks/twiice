import { leftSidebarCustomer, filter_operator } from './functions/functions.js';
import { ReactiveVar } from 'meteor/reactive-var';

var publicSettings = Meteor.settings.public;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////     INIT TEMPLATES     /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
    });

    if (FlowRouter.getParam('page')) {
        var page = FlowRouter.getParam('page');
    }

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

Template.crmNewPipeline.onCreated(function () {
    var self = this;
    self.subscribe('Partners');
    // Meteor.call('tw_field_decoration', 'new-pipelines-form'); // To Use later

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


// LOAD DATA ON TEMPLATES 
Template.sideNavbarcrm.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

Template.crmHeader.helpers({
    pagination: () => {
        var totalRecords = Pipelines.find().count();
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
            displayPages = '<li class="page-item tw-paginate-button"><a class="page-link" id="'+(Template.instance().page.get() - 1)+'" href="'+FlowRouter.path('crm/page')+'/'+(Template.instance().page.get() - 1)+'">Previous</a></li>';
            if (Template.instance().page.get() == 0) {
                displayPages = '<li class="page-item tw-paginate-button"><a class="page-link" id="'+(Template.instance().page.get() + 1)+'" href="'+FlowRouter.path('crm/page')+'/'+(Template.instance().page.get() + 1)+'">Previous</a></li>';
            } 
            for (let index = 1; index <= pagesNumber; index++) {
                displayPages += '<li class="page-item tw-paginate-button"><a class="page-link" id="'+index+'" href="'+FlowRouter.path('crm/page')+'/'+index+'">'+index+'</a></li>';
            };
            displayPages += '<li class="page-item tw-paginate-button"><a class="page-link" id="'+(parseFloat(Template.instance().page.get()) + parseFloat(1))+'" href="'+FlowRouter.path('crm/page')+'/'+(parseFloat(Template.instance().page.get()) + parseFloat(1))+'">Next</a></li>';
        }
        return displayPages;
    },
    collection_key: () => {
        var filters = [];
        for (var key in Pipelines.findOne({})) {
            filters.push(key);
        }
        return filters;
    }
})

Template.crmTreeView.helpers({
    pipelines: () => {
        // here we return data according on our filters. If no filter, filtersVar is an empty object
        // so we will get all the data
        // FIXME : We should use a function here to see if m2m or o2m exist, then, we check the other Collection

        return Pipelines.find(Template.instance().filtersVar.get(), {
            limit: Template.instance().resultPerPage.get(), 
            skip: Template.instance().computedSkip.get()
        });
    }
});

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
    'click .tw-paginate-button': function (events, template) {
        Template.instance().page.set(event.target.id)
        Template.instance().computedSkip.set((Template.instance().resultPerPage.get() * event.target.id) - Template.instance().resultPerPage.get())
    },
    'keyup #resultsNumber': function (events, template) {
        var resultsNumber = $('#resultsNumber').val();
        Template.instance().resultPerPage.set(parseFloat(resultsNumber));
    }
});

// CRM ADD TEMPLATE

Template.crmNewPipeline.events({
    'click button[type="submit"]': function () {
        swal("Hooray !", "This record was properly created !", "success");
    },
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////     END EVENTS     ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////