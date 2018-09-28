FlowRouter.route('/', {
    name: 'tpee/dashboard',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeDashboard'});
    }
});

FlowRouter.route('/tpee/sub-module', {
    name: 'tpee/sub-module',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSubModule'});
    }
});

FlowRouter.route('/tpee/settings', {
    name: 'tpee/settings',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSettings'});
    }
});