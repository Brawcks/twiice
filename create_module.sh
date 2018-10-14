#!/bin/bash

echo "You are about to create a new module. Follow the instructions to finalize it !"
read -p "Module name : (Set a technical name, like : my_module) : " module_name

mkdir client/z-customer/$module_name
mkdir client/z-customer/$module_name/templates
mkdir client/z-customer/$module_name/templates/views
mkdir client/z-customer/$module_name/static
mkdir client/z-customer/$module_name/collections
mkdir client/z-customer/$module_name/static/js
mkdir client/z-customer/$module_name/static/js/data
mkdir client/z-customer/$module_name/static/js/functions

echo "// LOAD ALL TEMPLATES FIRST
import './templates/$module_name.html';
import './templates/views/sub_module.html';
import './templates/views/settings.html';

// LOAD ALL JS FILES
import './static/js/functions/functions.js';
import './static/js/$module_name.js';" > client/z-customer/$module_name/main.js

echo "{
    \"sidebar\": {
        \"dashboard\": {
            \"name\": \"Dashboard\",
            \"url\": \"http://localhost:3000/$module_name\"
        },
        \"sub-module\": {
            \"name\": \"Sub-Module\",
            \"url\": \"http://localhost:3000/$module_name/sub-module\"
        },
        \"settings\": {
            \"name\": \"Settings\",
            \"url\": \"http://localhost:3000/$module_name/settings\"
        }
    }
}" > client/z-customer/$module_name/static/js/data/sidebar.json

echo "export function leftSidebarCustomer() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = \"\";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class=\"nav-link\" id=\"v-pills-home-tab\" data-toggle=\"pill\" href=\"'+item.url+'\" role=\"tab\" aria-controls=\"v-pills-home\" aria-selected=\"true\">'+item.name+'</a>';
    });
    return leftSidebar;
}" > client/z-customer/$module_name/static/js/functions/functions.js

echo "import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbar$module_name.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});" > client/z-customer/$module_name/static/js/$module_name.js

echo "<template name=\"$module_name\">
    <div class=\"col-10\">
        <h1>Hello</h1>
    </div>
</template>

<template name=\"sideNavbar$module_name\">
    <div class=\"col\">
        <div class=\"nav flex-column nav-pills\" id=\"v-pills-tab\" role=\"tablist\" aria-orientation=\"vertical\">
            {{{leftSidebar}}}
        </div>
    </div>
</template>" > client/z-customer/$module_name/templates/$module_name.html

echo "<template name=\"settings$module_name\">
    <div class=\"col-10\">
        <h1>Settings</h1>
    </div>
</template>" > client/z-customer/$module_name/templates/views/settings.html

echo "<template name=\"subModule$module_name\">
    <div class=\"col-10\">
        <h1>Sub-Module</h1>
    </div>
</template>" > client/z-customer/$module_name/templates/views/sub_module.html

printf "\nimport './$module_name/main.js';" >> client/z-customer/main.js

# ROUTING PART

mkdir lib/router/z-customer/$module_name

echo "FlowRouter.route('/$module_name', {
    name: '$module_name',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: '$module_name', sidebar: 'sideNavbar$module_name'});
    }
});

FlowRouter.route('/$module_name/sub-module', {
    name: '$module_name/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModule$module_name', sidebar: 'sideNavbar$module_name'});
    }
});

FlowRouter.route('/$module_name/settings', {
    name: '$module_name/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settings$module_name', sidebar: 'sideNavbar$module_name'});
    }
});" > lib/router/z-customer/$module_name/routes.js

printf "\nimport './$module_name/routes.js';" >> lib/router/z-customer/main.js

# SERVER SIDE COMPONENTS

mkdir server/z-customer/$module_name

echo "Meteor.startup(() => {
  // code to run on server at startup
});" > server/z-customer/$module_name/main.js

printf "\nimport './$module_name/main.js';" >> server/z-customer/main.js
