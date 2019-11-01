var partnersRoutes = FlowRouter.group({
    prefix: '/admin/partners',
    name: 'partners',
})

partnersRoutes.route('/', {
    name: 'partners',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partners', sidebar: 'sideNavbarpartners', view: 'partnersTreeView'});
    }
});

partnersRoutes.route('/kanban', {
    name: 'partners/kanban',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partners', sidebar: 'sideNavbarpartners', view: 'partnersKanbanView'});
    }
});

partnersRoutes.route('/page/:page', {
    name: 'partners/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partners', sidebar: 'sideNavbarpartners', view: 'partnersTreeView'});
    }
});

partnersRoutes.route('/sub-module', {
    name: 'partners/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulepartners', sidebar: 'sideNavbarpartners'});
    }
});

partnersRoutes.route('/settings', {
    name: 'partners/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingspartners', sidebar: 'sideNavbarpartners'});
    }
});

partnersRoutes.route('/new-partner', {
    name: 'partners/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSamplepartners', sidebar: 'sideNavbarpartners'});
    }
});

partnersRoutes.route('/collection-sample/:_id', {
    name: 'partners/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partnersSingleCollectionSample', sidebar: 'sideNavbarpartners'});
    }
});
