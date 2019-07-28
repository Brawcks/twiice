var recruitmentRoutes = FlowRouter.group({
    prefix: '/admin/recruitment',
    name: 'recruitment',
})

recruitmentRoutes.route('/', {
    name: 'recruitment',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'recruitment', sidebar: 'sideNavbarrecruitment', view: 'recruitmentTreeView'});
    }
});

recruitmentRoutes.route('/page/:page', {
    name: 'recruitment/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'recruitment', sidebar: 'sideNavbarrecruitment', view: 'recruitmentTreeView'});
    }
});

recruitmentRoutes.route('/sub-module', {
    name: 'recruitment/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulerecruitment', sidebar: 'sideNavbarrecruitment'});
    }
});

recruitmentRoutes.route('/settings', {
    name: 'recruitment/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingsrecruitment', sidebar: 'sideNavbarrecruitment'});
    }
});

recruitmentRoutes.route('/new-collection-sample', {
    name: 'recruitment/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSamplerecruitment', sidebar: 'sideNavbarrecruitment'});
    }
});

recruitmentRoutes.route('/collection-sample/:_id', {
    name: 'recruitment/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'recruitmentSingleCollectionSample', sidebar: 'sideNavbarrecruitment'});
    }
});
