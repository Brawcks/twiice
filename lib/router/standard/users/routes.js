FlowRouter.route('/users', {
    name: 'users/dashboard',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'usersHome', sidebar: 'tpeeSideNavbar', view: 'usersTreeView'});
    }
});

FlowRouter.route('/users/settings', {
    name: 'users/sub-module',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSubModule', sidebar: 'tpeeSideNavbar'});
    }
});
