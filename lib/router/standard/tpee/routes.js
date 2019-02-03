FlowRouter.route('/', {
    name: 'tpee/dashboard',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeDashboard', sidebar: 'tpeeSideNavbar'});
    }
});

FlowRouter.route('/tpee/sub-module', {
    name: 'tpee/sub-module',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSubModule', sidebar: 'tpeeSideNavbar'});
    }
});

FlowRouter.route('/tpee/settings', {
    name: 'tpee/settings',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSettings', sidebar: 'tpeeSideNavbar'});
    }
});

FlowRouter.notFound = {
    action() {
      BlazeLayout.render('mainTemplate', {module: 'tpee', sidebar: 'tpeeSideNavbar', view: 'tpee404'});
    }
};