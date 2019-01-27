FlowRouter.route('/project', {
    name: 'project',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'project', sidebar: 'sideNavbarproject', view: 'projectKanbanView'});
    }
});

FlowRouter.route('/project/sub-module', {
    name: 'project/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModuleproject', sidebar: 'sideNavbarproject'});
    }
});

FlowRouter.route('/project/settings', {
    name: 'project/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingsproject', sidebar: 'sideNavbarproject'});
    }
});

FlowRouter.route('/project/new-collection-sample', {
    name: 'project/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSampleproject', sidebar: 'sideNavbarproject'});
    }
});

FlowRouter.route('/project/collection-sample/:_id', {
    name: 'project/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'projectSingleCollectionSample', sidebar: 'sideNavbarproject'});
    }
});
