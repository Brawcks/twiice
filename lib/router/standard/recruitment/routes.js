FlowRouter.route('/recruitment', {
    name: 'recruitment',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'recruitment', sidebar: 'sideNavbarrecruitment', view: 'recruitmentTreeView'});
    }
});

FlowRouter.route('/recruitment/page/:page', {
    name: 'recruitment/page',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'recruitment', sidebar: 'sideNavbarrecruitment', view: 'recruitmentTreeView'});
    }
});

FlowRouter.route('/recruitment/sub-module', {
    name: 'recruitment/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulerecruitment', sidebar: 'sideNavbarrecruitment'});
    }
});

FlowRouter.route('/recruitment/settings', {
    name: 'recruitment/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingsrecruitment', sidebar: 'sideNavbarrecruitment'});
    }
});

FlowRouter.route('/recruitment/new-collection-sample', {
    name: 'recruitment/new-collection-sample',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'newCollectionSamplerecruitment', sidebar: 'sideNavbarrecruitment'});
    }
});

FlowRouter.route('/recruitment/collection-sample/:_id', {
    name: 'recruitment/collection-sample-single',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'recruitmentSingleCollectionSample', sidebar: 'sideNavbarrecruitment'});
    }
});
