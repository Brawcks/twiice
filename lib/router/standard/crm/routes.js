FlowRouter.route('/crm', {
    name: 'crm',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crm', sidebar: 'sideNavbarcrm'});
    }
});

FlowRouter.route('/crm/sub-module', {
    name: 'crm/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulecrm', sidebar: 'sideNavbarcrm'});
    }
});

FlowRouter.route('/crm/new-pipeline', {
    name: 'crm/new-pipeline',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crmNewPipeline', sidebar: 'sideNavbarcrm'});
    }
});

FlowRouter.route('/crm/settings', {
    name: 'crm/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingscrm', sidebar: 'sideNavbarcrm'});
    }
});
