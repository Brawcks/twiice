FlowRouter.route('/partners', {
    name: 'partners',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partners', sidebar: 'sideNavbarpartners', view: 'partnersTreeView'});
    }
});

FlowRouter.route('/partners/page/:page', {
    name: 'partners/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partners', sidebar: 'sideNavbarpartners', view: 'partnersTreeView'});
    }
});

FlowRouter.route('/partners/sub-module', {
    name: 'partners/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulepartners', sidebar: 'sideNavbarpartners'});
    }
});

FlowRouter.route('/partners/settings', {
    name: 'partners/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingspartners', sidebar: 'sideNavbarpartners'});
    }
});

FlowRouter.route('/partners/new-partner', {
    name: 'partners/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSamplepartners', sidebar: 'sideNavbarpartners'});
    }
});

FlowRouter.route('/partners/collection-sample/:_id', {
    name: 'partners/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'partnersSingleCollectionSample', sidebar: 'sideNavbarpartners'});
    }
});
