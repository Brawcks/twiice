var usersRoutes = FlowRouter.group({
    prefix: '/admin/users',
    name: 'recruitment',
})

usersRoutes.route('/', {
    name: 'users/dashboard',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'usersHome', sidebar: 'sideNavbarUsers', view: 'usersTreeView'});
    }
});

usersRoutes.route('/user/:_id', {
    name: 'users/user',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'usersHome', sidebar: 'sideNavbarUsers', view: 'usersSingleUser'});
    }
});

usersRoutes.route('/settings', {
    name: 'users/settings',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSubModule', sidebar: 'sideNavbarUsers'});
    }
});
