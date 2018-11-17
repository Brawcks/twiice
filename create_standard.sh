#!/bin/bash

echo "You are about to create a new module. Follow the instructions to finalize it !"
read -p "Module name : (Set a technical name, like : my_module) : " module_name

mkdir client/standard/${module_name}
mkdir client/standard/${module_name}/templates
mkdir client/standard/${module_name}/templates/views
mkdir client/standard/${module_name}/static
mkdir client/standard/${module_name}/static/js
mkdir client/standard/${module_name}/static/js/data
mkdir client/standard/${module_name}/static/js/functions

echo "// LOAD ALL TEMPLATES FIRST
import './templates/${module_name}.html';
import './templates/views/sub_module.html';
import './templates/views/settings.html';

// LOAD ALL JS FILES
import './static/js/functions/functions.js';
import './static/js/${module_name}.js';" > client/standard/${module_name}/main.js

echo "{
    \"sidebar\": {
        \"dashboard\": {
            \"name\": \"Dashboard\",
            \"url\": \"http://localhost:3000/${module_name}\"
        },
        \"new-collection-sample\": {
            \"name\": \"New Collection Sample\",
            \"url\": \"http://localhost:3000/${module_name}/new-collection-sample\"
        },
        \"sub-module\": {
            \"name\": \"Sub-Module\",
            \"url\": \"http://localhost:3000/${module_name}/sub-module\"
        },
        \"settings\": {
            \"name\": \"Settings\",
            \"url\": \"http://localhost:3000/${module_name}/settings\"
        }
    }
}" > client/standard/${module_name}/static/js/data/sidebar.json

echo "export function leftSidebarCustomer() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = \"\";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class=\"nav-link\" id=\"v-pills-home-tab\" data-toggle=\"pill\" href=\"'+item.url+'\" role=\"tab\" aria-controls=\"v-pills-home\" aria-selected=\"true\">'+item.name+'</a>';
    });
    return leftSidebar;
}" > client/standard/${module_name}/static/js/functions/functions.js

echo "import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbar${module_name}.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// SUBSCRIBE TO PIPELINES PUBLICATIONS ON TEMPLATES
Template.${module_name}TreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Collection_sample');
    });
});

// LOAD DATA ON TEMPLATES 
Template.${module_name}TreeView.helpers({
    collection_sample: () => {
        return Collection_sample.find({});
    }
});

Template.${module_name}TreeView.events({
    'click .btn-danger': function (){
        Meteor.call('${module_name}DeleteCollection_sample', this._id);
        swal(\"Deleted\", \"This record was properly deleted !\", \"success\");
    },
});

// CRM ADD TEMPLATE

Template.newCollectionSample${module_name}.events({
    'click button[type=\"submit\"]': function (){
        swal(\"Hooray !\", \"This record was properly created !\", \"success\");
    },
});" > client/standard/${module_name}/static/js/${module_name}.js

echo "
Template.${module_name}SingleCollectionSample.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Collection_sample', id);
    });
});

Template.${module_name}SingleCollectionSample.helpers({
    collection_sample_single: () => {
        var id = FlowRouter.getParam('_id');
        return Collection_sample.findOne({_id: id});
    }
});

Template.${module_name}SingleCollectionSample.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('${module_name}DeleteCollection_sample', this._id);
        FlowRouter.go('${module_name}');
        swal(\"Deleted\", \"This record was properly deleted !\", \"success\");
    },
});
" > client/standard/${module_name}/static/js/${module_name}_single.js

echo "<template name=\"${module_name}\">
    <div class=\"col-12\">
        <h1>${module_name} Dashboard</h1>
    </div>
</template>

<template name=\"${module_name}TreeView\">
    <div class=\"col-12 self-align-end\">
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
                    <td>{{name}}</td>
                    <td>{{desc}}</td>
                    <td>
                        <a href=\"{{pathFor '${module_name}/collection-sample-single' _id=_id}}\" title=\"{{name}}\">View Details</a>
                        <button type=\"button\" class=\"btn btn-danger\">Delete</button>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </div>
</template>

<template name=\"newCollectionSample${module_name}\">
    <div class=\"col-12\">
        <h1>New Collection sample</h1>
        {{> quickForm collection=\"Collection_sample\" id=\"insertCollection_sampleForm\" type=\"insert\" class=\"new-collection-sample-form\"}}
    </div>
</template>

<template name=\"${module_name}\SingleCollectionSample\">
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

<template name=\"sideNavbar${module_name}\">
    <div class=\"col\">
        <div class=\"nav flex-column nav-pills\" id=\"v-pills-tab\" role=\"tablist\" aria-orientation=\"vertical\">
            {{{leftSidebar}}}
        </div>
    </div>
</template>" > client/standard/${module_name}/templates/${module_name}.html

echo "<template name=\"settings${module_name}\">
    <div class=\"col-10\">
        <h1>Settings</h1>
    </div>
</template>" > client/standard/${module_name}/templates/views/settings.html

echo "<template name=\"subModule${module_name}\">
    <div class=\"col-10\">
        <h1>Sub-Module</h1>
    </div>
</template>" > client/standard/${module_name}/templates/views/sub_module.html

printf "\nimport './${module_name}/main.js';" >> client/standard/main.js

# ROUTING PART

mkdir lib/router/standard/${module_name}

echo "FlowRouter.route('/${module_name}', {
    name: '${module_name}',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${module_name}', sidebar: 'sideNavbar${module_name}', view: '${module_name}TreeView'});
    }
});

FlowRouter.route('/${module_name}/sub-module', {
    name: '${module_name}/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModule${module_name}', sidebar: 'sideNavbar${module_name}'});
    }
});

FlowRouter.route('/${module_name}/settings', {
    name: '${module_name}/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settings${module_name}', sidebar: 'sideNavbar${module_name}'});
    }
});

FlowRouter.route('/${module_name}/new-collection-sample', {
    name: '${module_name}/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSample${module_name}', sidebar: 'sideNavbar${module_name}'});
    }
});

FlowRouter.route('/${module_name}/collection-sample/:_id', {
    name: '${module_name}/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '${module_name}SingleCollectionSample', sidebar: 'sideNavbarcrm'});
    }
});" > lib/router/standard/${module_name}/routes.js

printf "\nimport './${module_name}/routes.js';" >> lib/router/standard/main.js

# SERVER SIDE COMPONENTS

mkdir server/standard/${module_name}

echo "Meteor.startup(() => {
  // code to run on server at startup
});" > server/standard/${module_name}/main.js

printf "\n
// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('Collection_sample', function() {
  return Collection_sample.find({})
})
" >> server/standard/${module_name}/main.js

printf "\nimport './${module_name}/main.js';" >> server/standard/main.js

# COLLECTIONS DIRECTORIES

mkdir collections/standard/${module_name}

touch collections/standard/${module_name}/collection.js

echo "
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

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
    ${module_name}DeleteCollection_sample: function(id) {
        Collection_sample.remove(id)
    },
});

Collection_sample.attachSchema(Collection_sampleSchema);
" >> collections/standard/${module_name}/collection.js

printf "\nimport './${module_name}/collection.js';" >> collections/standard/main.js

echo "You module is now ready."
echo "You can now create your collections in /collections/standard/${module_name}/collection.js"

echo "This script was built by Vincent Coffin - Twiice Corporation."
