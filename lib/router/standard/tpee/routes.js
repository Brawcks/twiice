var tpeeRoutes = FlowRouter.group({
    prefix: '/admin/tpee',
    name: 'recruitment',
})

tpeeRoutes.route('/', {
    name: 'tpee/dashboard',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeDashboard', sidebar: 'tpeeSideNavbar'});
    }
});

tpeeRoutes.route('/sub-module', {
    name: 'tpee/sub-module',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSubModule', sidebar: 'tpeeSideNavbar'});
    }
});

tpeeRoutes.route('/settings', {
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