FlowRouter.route('/stacy', {
    name: 'stacy',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'stacy', sidebar: 'sideNavbarstacy'});
    }
});

FlowRouter.route('/stacy/sub-module', {
    name: 'stacy/sub-module',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'subModulestacy', sidebar: 'sideNavbarstacy'});
    }
});

FlowRouter.route('/stacy/settings', {
    name: 'stacy/settings',
    action() {
        // IT RENDER THE MAIN TEMPLATE, AND USE A VARIABLE TO LOAD A MODULE TEMPLATE INSIDE
        BlazeLayout.render('mainTemplate', {module: 'settingsstacy', sidebar: 'sideNavbarstacy'});
    }
});
