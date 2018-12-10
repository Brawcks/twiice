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
            \"url\": \"http://localhost:3000/${1}\"
        },
        \"new-collection-sample\": {
            \"name\": \"New Collection Sample\",
            \"url\": \"http://localhost:3000/${1}/new-collection-sample\"
        },
        \"sub-module\": {
            \"name\": \"Sub-Module\",
            \"url\": \"http://localhost:3000/${1}/sub-module\"
        },
        \"settings\": {
            \"name\": \"Settings\",
            \"url\": \"http://localhost:3000/${1}/settings\"
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
}" > client/standard/${1}/static/js/functions/functions.js

echo "import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbar${1}.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.${1}TreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Collection_sample');
    });
});

// LOAD DATA ON TEMPLATES 
Template.${1}TreeView.helpers({
    collection_sample: () => {
        return Collection_sample.find({});
    }
});

Template.${1}TreeView.events({
    'click .btn-danger': function (){
        Meteor.call('${1}DeleteCollection_sample', this._id);
        swal(\"Deleted\", \"This record was properly deleted !\", \"success\");
    },
    'click .export-csv': function(events, template){
        var data = Papa.unparse(Collection_sample.find({}, { limit: 10 }).fetch());
        var date = new Date().toISOString().slice(0, 10);
        Meteor.call('download_csv', data, '${1}_'+date+'.csv', 'text/csv;encoding:utf-8');
        swal(\"Yeah !\", \"Your CSV document is available !\", \"success\");
    },
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
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Collection_sample', id);
    });
});

Template.${1}SingleCollectionSample.helpers({
    collection_sample_single: () => {
        var id = FlowRouter.getParam('_id');
        return Collection_sample.findOne({_id: id});
    }
});

Template.${1}SingleCollectionSample.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('${1}DeleteCollection_sample', id);
        FlowRouter.go('${1}');
        swal(\"Deleted\", \"This record was properly deleted !\", \"success\");
    },
});
" > client/standard/${1}/static/js/${1}_single.js

echo "<template name=\"${1}\">
    <div class=\"col-12\">
        <h1>${1} Dashboard</h1>
    </div>
</template>

<template name=\"${1}TreeView\">
    <div class=\"col-12 self-align-end\">
        <button type=\"button\" class=\"btn btn-success export-csv pull-right\">{{_ \"Export to csv\"}}</button>
        <button type=\"button\" class=\"btn btn-info import-csv pull-right\">{{_ \"Import csv\"}}</button>
        <input id=\"file\" type=\"file\" class=\"btn btn-info import-csv-file pull-right d-none\"/>
        <table class=\"table table-hover\">
            <thead>
                <tr>
                    <th scope=\"col\">#</th>
                    <th scope=\"col\">Name</th>
                    <th scope=\"col\">Description</th>
                    <th scope=\"col\">Actions</th>
                </tr>
            </thead>
            <tbody>
                {{#each collection_sample}}
                <tr>
                    <th scope=\"row\">{{@index}}</th>
                    <td><a href=\"{{pathFor '${1}/collection-sample-single' _id=_id}}\" title=\"{{name}}\">{{name}}</a></td>
                    <td>{{desc}}</td>
                    <td>
                        <a href=\"{{pathFor '${1}/collection-sample-single' _id=_id}}\" title=\"{{name}}\">View Details</a>
                        <button type=\"button\" class=\"btn btn-danger\">Delete</button>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </div>
</template>

<template name=\"newCollectionSample${1}\">
    <div class=\"col-12\">
        <h1>New Collection sample</h1>
        {{> quickForm collection=\"Collection_sample\" id=\"insertCollection_sampleForm\" type=\"insert\" class=\"new-collection-sample-form\"}}
    </div>
</template>

<template name=\"${1}SingleCollectionSample\">
    <div class=\"row col-md-12\">
        <div class=\"col-md-8\">
            <h1>Collection</h1>
        </div>
        <div class=\"col-md-4\">
            <div class=\"pull-right\">
                <button type=\"button\" class=\"btn btn-danger\">Delete</button>
                <button type=\"button\" class=\"btn btn-warning\">Edit</button>
            </div>
        </div>
    </div>
    <hr>
    <div class=\"row col-md-12\">
        <div class=\"col-md-6\">
            <h3>{{collection_sample_single.name}}</h3>
            <p>{{collection_sample_single.desc}}</p>
        </div>
    </div>
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

echo "FlowRouter.route('/${1}', {
    name: '${1}',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${1}', sidebar: 'sideNavbar${1}', view: '${1}TreeView'});
    }
});

FlowRouter.route('/${1}/sub-module', {
    name: '${1}/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModule${1}', sidebar: 'sideNavbar${1}'});
    }
});

FlowRouter.route('/${1}/settings', {
    name: '${1}/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settings${1}', sidebar: 'sideNavbar${1}'});
    }
});

FlowRouter.route('/${1}/new-collection-sample', {
    name: '${1}/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSample${1}', sidebar: 'sideNavbar${1}'});
    }
});

FlowRouter.route('/${1}/collection-sample/:_id', {
    name: '${1}/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${1}SingleCollectionSample', sidebar: 'sideNavbar${1}'});
    }
});" > lib/router/standard/${1}/routes.js

printf "\nimport './${1}/routes.js';" >> lib/router/standard/main.js

# SERVER SIDE COMPONENTS

mkdir server/standard/${1}

echo "Meteor.startup(() => {
  // code to run on server at startup
});" > server/standard/${1}/main.js

printf "\n
// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('Collection_sample', function() {
  return Collection_sample.find({})
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

Collection_sample = new Mongo.Collection('collection_sample');

Collection_sample.allow({
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
        Collection_sample.remove(id)
    },
});

Collection_sample.attachSchema(Collection_sampleSchema);
" >> collections/standard/${1}/collection.js

printf "\nimport './${1}/collection.js';" >> collections/standard/main.js

echo "You module is now ready."
echo "You can now create your collections in /collections/standard/${1}/collection.js"

echo "This script was built by Vincent Coffin - Twiice Corporation."
