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

// Categories
websiteRoutes.route('/categories', {
    name: 'website/categories',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'websiteCategories', sidebar: 'sideNavbarwebsite', view: 'websiteCategoriesTreeView'});
    }
});

websiteRoutes.route('/categories/add', {
    name: 'website/categories/add',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'websiteNewCategorie', sidebar: 'sideNavbarwebsite'});
    }
});

websiteRoutes.route('/categories/:_id', {
    name: 'website/categories/id',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'websiteSingleArticlesCategory', sidebar: 'sideNavbarwebsite'});
    }
});

var web = FlowRouter.group({
    prefix: '/',
    name: 'web',
})

web.route('/', {
    name: 'web',
    action() {
        BlazeLayout.render('webTemplate');
    }
})