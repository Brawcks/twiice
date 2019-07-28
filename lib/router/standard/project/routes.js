var projectRoutes = FlowRouter.group({
    prefix: '/admin/project',
    name: 'project',
})

projectRoutes.route('/', {
    name: 'project',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'project', sidebar: 'sideNavbarproject', view: 'projectKanbanView'});
    }
});

projectRoutes.route('/sub-module', {
    name: 'project/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModuleproject', sidebar: 'sideNavbarproject'});
    }
});

projectRoutes.route('/settings', {
    name: 'project/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingsproject', sidebar: 'sideNavbarproject'});
    }
});

projectRoutes.route('/newProject', {
    name: 'project/newProject',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newProject', sidebar: 'sideNavbarproject'});
    }
});

projectRoutes.route('/projectsingle/:_id', {
    name: 'project/projectsingle',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'projectSingle', sidebar: 'sideNavbarproject'});
    }
});
