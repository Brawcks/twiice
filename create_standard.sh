#!/bin/bash

if [ $1 ]
then
    echo "Starting script... "
else
    echo "You have to set an extra argument ! : ./create_standard module_name"
    exit 1
fi

mkdir client/standard/${1}
mkdir client/standard/${1}/templates
mkdir client/standard/${1}/templates/views
mkdir client/standard/${1}/static
mkdir client/standard/${1}/static/js
mkdir client/standard/${1}/static/js/data
mkdir client/standard/${1}/static/js/functions

echo "// LOAD ALL TEMPLATES FIRST
import './templates/${1}.html';
import './templates/views/sub_module.html';
import './templates/views/settings.html';

// LOAD ALL JS FILES
import './static/js/functions/functions.js';
import './static/js/${1}_single.js';
import './static/js/${1}.js';" > client/standard/${1}/main.js

echo "{
    \"sidebar\": {
        \"dashboard\": {
            \"name\": \"Dashboard\",
            \"url\": \"/admin/${1}\"
        },
        \"new-collection-sample\": {
            \"name\": \"New Collection Sample\",
            \"url\": \"/admin/${1}/new-collection-sample\"
        },
        \"sub-module\": {
            \"name\": \"Sub-Module\",
            \"url\": \"/admin/${1}/sub-module\"
        },
        \"settings\": {
            \"name\": \"Settings\",
            \"url\": \"/admin/${1}/settings\"
        }
    }
}" > client/standard/${1}/static/js/data/sidebar.json

echo "export function leftSidebarCustomer() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = \"\";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class=\"nav-link\" id=\"v-pills-home-tab\" data-toggle=\"pill\" href=\"'+item.url+'\" role=\"tab\" aria-controls=\"v-pills-home\" aria-selected=\"true\">'+item.name+'</a>';
    });
    return leftSidebar;
}
" > client/standard/${1}/static/js/functions/functions.js

echo "import { leftSidebarCustomer } from './functions/functions.js';
import { isEmptyObject, filter_operator } from '../../../tpee/static/js/functions/functions.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.sideNavbar${1}.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.${1}TreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('${1}Collection_sample');
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

Template.newCollectionSample${1}.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('${1}Collection_sample');
    });
});

// LOAD DATA ON TEMPLATES 
Template.${1}TreeView.helpers({
    ${1}Collection_sample: () => {
        return ${1}Collection_sample.find(Template.instance().filtersVar.get(), { 
            limit: Template.instance().resultPerPage.get(), 
            skip: Template.instance().computedSkip.get()
        });
    },
    pagination: () => {
        var totalRecords = ${1}Collection_sample.find().count();
        var pagesNumber = Math.trunc(totalRecords / Template.instance().resultPerPage.get());
        var lastRecords = totalRecords % Template.instance().resultPerPage.get();
        switch (lastRecords) {
            case 0:
                break;
            default:
                pagesNumber += 1;
                break;
        };
        var displayPages = \"\";
        if (pagesNumber > 1) {
            displayPages = '<li class=\"page-item tw-paginate-button\"><a class=\"page-link\" id=\"'+(Template.instance().page.get() - 1)+'\" href=\"'+FlowRouter.path('${1}/page')+'/'+(Template.instance().page.get() - 1)+'\">Previous</a></li>';
            if (Template.instance().page.get() == 0) {
                displayPages = '<li class=\"page-item tw-paginate-button\"><a class=\"page-link\" id=\"'+(Template.instance().page.get() + 1)+'\" href=\"'+FlowRouter.path('${1}/page')+'/'+(Template.instance().page.get() + 1)+'\">Previous</a></li>';
            } 
            for (let index = 1; index <= pagesNumber; index++) {
                displayPages += '<li class=\"page-item tw-paginate-button\"><a class=\"page-link\" id=\"'+index+'\" href=\"'+FlowRouter.path('${1}/page')+'/'+index+'\">'+index+'</a></li>';
            };
            displayPages += '<li class=\"page-item tw-paginate-button\"><a class=\"page-link\" id=\"'+(parseFloat(Template.instance().page.get()) + parseFloat(1))+'\" href=\"'+FlowRouter.path('${1}/page')+'/'+(parseFloat(Template.instance().page.get()) + parseFloat(1))+'\">Next</a></li>';
        }
        return displayPages;
    },
    collection_key: () => {
        var filters_${1} = [];
        for (var key in ${1}Collection_sample.findOne({})) {
            filters_${1}.push(key);
        }
        return filters_${1};
    }
});

Template.${1}TreeView.events({
    'click .btn-danger': function (){
        Meteor.call('${1}DeleteCollection_sample', this._id);
        swal(\"Deleted\", \"This record was properly deleted !\", \"success\");
    },
    'click .export-csv': function(events, template){
        var data = Papa.unparse(${1}Collection_sample.find({}, { limit: 10 }).fetch());
        var date = new Date().toISOString().slice(0, 10);
        Meteor.call('download_csv', data, '${1}_'+date+'.csv', 'text/csv;encoding:utf-8');
        swal(\"Yeah !\", \"Your CSV document is available !\", \"success\");
    },
    'click .import-csv': function (events, template) {
        swal(\"Ooops !\", \"This function is not available yet !\", \"info\");
        // \$(\".import-csv-file\").click();
        // \$(\".import-csv-file\").change(function () {
        //     var fileInput = document.querySelector('.import-csv-file');
        //     var reader = new FileReader();
        //     reader.addEventListener('load', function () {
        //         alert('Contenu du fichier \"' + fileInput.files[0].name + '\" :\n\n' + reader.result);
        //     });
        //     reader.readAsText(fileInput.files[0]);
        //     console.log(Papa.parse(reader.result, {delimiter: \";\"}));
        // });
    },
    'click .tw-filter-submit': function (events, template) {
        // swal(\"Ooops !\", \"This function is not available yet !\", \"info\");
        var filterOperator = \$('#${1}FilterOperator').val();
        var selectFilter = \$('#${1}FilterSelect').val();
        var filterVal = \$('.tw-filter-input').val();
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
        var resultsNumber = \$('#resultsNumber').val();
        Template.instance().resultPerPage.set(parseFloat(resultsNumber));
    }
});

// CRM ADD TEMPLATE

Template.newCollectionSample${1}.events({
    'click button[type=\"submit\"]': function (){
        swal(\"Hooray !\", \"This record was properly created !\", \"success\");
    },
});" > client/standard/${1}/static/js/${1}.js

echo "
Template.${1}SingleCollectionSample.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('${1}Collection_sample', id);
    });
});

Template.${1}SingleCollectionSample.helpers({
    collection_sample_single: () => {
        var id = FlowRouter.getParam('_id');
        return ${1}Collection_sample.findOne({_id: id});
    },
    updateCollectionSampleId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
});

Template.${1}SingleCollectionSample.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('${1}DeleteCollection_sample', id);
        FlowRouter.go('${1}');
        swal(\"Deleted\", \"This record was properly deleted !\", \"success\");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});
" > client/standard/${1}/static/js/${1}_single.js

echo "<template name=\"${1}\">
    <div class=\"col-12\">
        <h1>{{_ \"${1} Dashboard\"}}</h1>
    </div>
</template>

<template name=\"${1}Header\">
    <div class=\"row justify-content-end\">
        {{#if collection_key}}
            <select name=\"${1}FilterSelect\" id=\"${1}FilterSelect\">
                {{#each collection_key}}
                    <option value=\"{{this}}\">{{_ this}}</option>
                {{/each}}
            </select>
        {{/if}}
        <select name=\"${1}FilterOperator\" id=\"${1}FilterOperator\">
            <option value=\"equalTo\">{{_ \"Equal to\"}}</option>
            <option value=\"isDifferentFrom\">{{_ \"Is different from\"}}</option>
            <option value=\"contain\">{{_ \"Contain\"}}</option>
            <option value=\"doNotContain\">{{_ \"Do not contain\"}}</option>
            <option value=\"isSet\">{{_ \"Is set\"}}</option>
            <option value=\"isNotSet\">{{_ \"Is not set\"}}</option>
        </select>
        <input type=\"text\" placeholder=\"Filter by ...\" class=\"col-6 tw-filter-input\">
        <button class=\"btn btn-primary tw-filter-submit\" type=\"submit\">{{_ \"Validate\"}}</button>
        <button class=\"btn btn-warning tw-filter-remove\" type=\"submit\">{{_ \"Remove filters\"}}</button>
    </div>
    <hr>
    <div class=\"row\">
        <div class=\"col-6\">
            <a href=\"{{ pathFor '${1}/new-collection-sample' }}\">{{_ \"New Data\"}}</a>
        </div>
        <div class=\"col-6 text-right\">
            <button type=\"button\" class=\"btn btn-success export-csv pull-right\">{{_ \"Export to csv\"}}</button>
            <button type=\"button\" class=\"btn btn-info import-csv pull-right\">{{_ \"Import csv\"}}</button>
            <input type=\"text\" class=\"form-control mt-2\" placeholder=\"Number of results\" id=\"resultsNumber\">
            <input id=\"file\" type=\"file\" class=\"btn btn-info import-csv-file pull-right d-none\"/>
        </div>
    </div>
    <hr>
</template>

<template name=\"${1}TreeView\">
    <div class=\"col-12 self-align-end\">
        {{> ${1}Header }}
        <table class=\"table table-hover mt-3\">
            <thead>
                <tr>
                    <th scope=\"col\">#</th>
                    <th scope=\"col\">{{_ \"Name\"}}</th>
                    <th scope=\"col\">{{_ \"Description\"}}</th>
                    <th scope=\"col\">{{_ \"Actions\"}}</th>
                </tr>
            </thead>
            <tbody>
                {{#each ${1}Collection_sample}}
                <tr>
                    <th scope=\"row\">{{@index}}</th>
                    <td><a href=\"{{pathFor '${1}/collection-sample-single' _id=_id}}\" title=\"{{name}}\">{{name}}</a></td>
                    <td>{{desc}}</td>
                    <td>
                        <a href=\"{{pathFor '${1}/collection-sample-single' _id=_id}}\" title=\"{{name}}\">{{_ \"View Details\"}}</a>
                        <button type=\"button\" class=\"btn btn-danger\">{{_ \"Delete\"}}</button>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
        <nav aria-label=\"Page navigation example\">
            <ul class=\"pagination\">
                {{{pagination}}}
            </ul>
        </nav>
    </div>
</template>

<template name=\"newCollectionSample${1}\">
    <div class=\"col-12\">
        <h1>New Collection sample</h1>
        {{> quickForm collection=\"${1}Collection_sample\" id=\"insertCollection_sampleForm\" type=\"insert\" class=\"new-collection-sample-form\"}}
    </div>
</template>

<template name=\"${1}SingleCollectionSample\">
    <div class=\"row col-md-12\">
        <div class=\"col-md-8\">
            <h1>Collection</h1>
        </div>
        <div class=\"col-md-4\">
            <div class=\"pull-right\">
                <button type=\"button\" class=\"btn btn-danger\">{{_ \"Delete\"}}</button>
                <button type=\"button\" class=\"btn btn-warning\">{{_ \"Edit\"}}</button>
            </div>
        </div>
    </div>
    <hr>
    {{#if editMode}}
    {{> quickForm collection=\"${1}Collection_sample\" doc=collection_sample_single id=updateCollectionSampleId type=\"update\" class=\"edit edit-collection-form\"}}
    {{else}}
    <div class=\"row col-md-12\">
        <div class=\"col-md-6\">
            <h3>{{collection_sample_single.name}}</h3>
            <p>{{collection_sample_single.desc}}</p>
        </div>
    </div>
    {{/if}}
</template>

<template name=\"sideNavbar${1}\">
    <div class=\"col\">
        <div class=\"nav flex-column nav-pills\" id=\"v-pills-tab\" role=\"tablist\" aria-orientation=\"vertical\">
            {{{leftSidebar}}}
        </div>
    </div>
</template>" > client/standard/${1}/templates/${1}.html

echo "<template name=\"settings${1}\">
    <div class=\"col-10\">
        <h1>Settings</h1>
    </div>
</template>" > client/standard/${1}/templates/views/settings.html

echo "<template name=\"subModule${1}\">
    <div class=\"col-10\">
        <h1>Sub-Module</h1>
    </div>
</template>" > client/standard/${1}/templates/views/sub_module.html

printf "\nimport './${1}/main.js';" >> client/standard/main.js

# ROUTING PART

mkdir lib/router/standard/${1}

echo "var ${1}Routes = FlowRouter.group({
    prefix: '/admin/${1}',
    name: '${1}',
})

${1}Routes.route('/', {
    name: '${1}',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${1}', sidebar: 'sideNavbar${1}', view: '${1}TreeView'});
    }
});

${1}Routes.route('/page/:page', {
    name: '${1}/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${1}', sidebar: 'sideNavbar${1}', view: '${1}TreeView'});
    }
});

${1}Routes.route('/sub-module', {
    name: '${1}/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModule${1}', sidebar: 'sideNavbar${1}'});
    }
});

${1}Routes.route('/settings', {
    name: '${1}/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settings${1}', sidebar: 'sideNavbar${1}'});
    }
});

${1}Routes.route('/new-collection-sample', {
    name: '${1}/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSample${1}', sidebar: 'sideNavbar${1}'});
    }
});

${1}Routes.route('/collection-sample/:_id', {
    name: '${1}/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${1}SingleCollectionSample', sidebar: 'sideNavbar${1}'});
    }
});" > lib/router/standard/${1}/routes.js

printf "\nimport './${1}/routes.js';" >> lib/router/standard/main.js

mkdir -p lib/i18n/standard/${1}/i18n

touch lib/i18n/standard/${1}/i18n/fr.i18n.json

echo "import './i18n/fr.i18n.json'" > lib/i18n/standard/${1}/main.js

printf "\nimport './${1}/main.js';" >> lib/i18n/standard/main.js

# SERVER SIDE COMPONENTS

mkdir server/standard/${1}

echo "Meteor.startup(() => {
  // code to run on server at startup
});" > server/standard/${1}/main.js

printf "\n
// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('${1}Collection_sample', function() {
  return ${1}Collection_sample.find({})
})
" >> server/standard/${1}/main.js

printf "\nimport './${1}/main.js';" >> server/standard/main.js

# COLLECTIONS DIRECTORIES

mkdir collections/standard/${1}

touch collections/standard/${1}/collection.js

echo "
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

${1}Collection_sample = new Mongo.Collection('${1}Collection_sample');

${1}Collection_sample.allow({
    insert: function(userId, doc) {
        return !!userId;    
    }
});

Collection_sampleSchema = new SimpleSchema ({
    name: {
        type: String,
        label: \"Name\"
    },
    desc: {
        type: String,
        label: \"Description\"
    }
});

Meteor.methods({
    ${1}DeleteCollection_sample: function(id) {
        ${1}Collection_sample.remove(id)
    },
});

${1}Collection_sample.attachSchema(Collection_sampleSchema);
" >> collections/standard/${1}/collection.js

printf "\nimport './${1}/collection.js';" >> collections/standard/main.js

echo "You module is now ready."
echo "You can now create your collections in /collections/standard/${1}/collection.js"

echo "This script was built by Vincent Coffin - Twiice Corporation."
