var crmRoutes = FlowRouter.group({
    prefix: '/admin/crm',
    name: 'crm',
})

crmRoutes.route('/', {
    name: 'crm',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crm', sidebar: 'sideNavbarcrm',view: 'crmTreeView'});
    }
});

crmRoutes.route('/kanban', {
    name: 'crm/kanban',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crm', sidebar: 'sideNavbarcrm',view: 'crmKanbanView'});
    }
});

crmRoutes.route('/page/:page', {
    name: 'crm/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crm', sidebar: 'sideNavbarcrm',view: 'crmTreeView'});
    }
});

crmRoutes.route('/sub-module', {
    name: 'crm/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulecrm', sidebar: 'sideNavbarcrm'});
    }
});

crmRoutes.route('/new-pipeline', {
    name: 'crm/new-pipeline',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crmNewPipeline', sidebar: 'sideNavbarcrm'});
    }
});

crmRoutes.route('/pipeline/:_id', {
    name: 'crm/pipeline',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'crmSinglePipeline', sidebar: 'sideNavbarcrm'});
    }
});

crmRoutes.route('/settings', {
    name: 'crm/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingscrm', sidebar: 'sideNavbarcrm'});
    }
});
