FlowRouter.route('/module-test', {
    name: 'module-test',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'module_testHome', sidebar: 'module_testSideNavbar'});
    }
});

FlowRouter.route('/module-test/sub-module', {
    name: 'module-test/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'module_testSubModule', sidebar: 'module_testSideNavbar'});
    }
});

FlowRouter.route('/module-test/settings', {
    name: 'module-test/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'module_testSettings', sidebar: 'module_testSideNavbar'});
    }
});