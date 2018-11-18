FlowRouter.route('/crm', {
    name: 'crm',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crm', sidebar: 'sideNavbarcrm',view: 'crmTreeView'});
    }
});

FlowRouter.route('/crm/page/:page', {
    name: 'crm/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crm', sidebar: 'sideNavbarcrm',view: 'crmTreeView'});
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

FlowRouter.route('/crm/pipeline/:_id', {
    name: 'crm/pipeline',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crmSinglePipeline', sidebar: 'sideNavbarcrm'});
    }
});

FlowRouter.route('/crm/settings', {
    name: 'crm/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingscrm', sidebar: 'sideNavbarcrm'});
    }
});
