var websiteRoutes = FlowRouter.group({
    prefix: '/admin/website',
    name: 'website',
})

websiteRoutes.route('/', {
    name: 'website',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'website', sidebar: 'sideNavbarwebsite', view: 'websiteTreeView'});
    }
});

websiteRoutes.route('/page/:page', {
    name: 'website/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'website', sidebar: 'sideNavbarwebsite', view: 'websiteTreeView'});
    }
});

websiteRoutes.route('/sub-module', {
    name: 'website/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulewebsite', sidebar: 'sideNavbarwebsite'});
    }
});

websiteRoutes.route('/settings', {
    name: 'website/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingswebsite', sidebar: 'sideNavbarwebsite'});
    }
});

websiteRoutes.route('/new-collection-sample', {
    name: 'website/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSamplewebsite', sidebar: 'sideNavbarwebsite'});
    }
});

websiteRoutes.route('/collection-sample/:_id', {
    name: 'website/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'websiteSingleCollectionSample', sidebar: 'sideNavbarwebsite'});
    }
});
