var usersRoutes = FlowRouter.group({
    prefix: '/admin/users',
    name: 'recruitment',
})

usersRoutes.route('/', {
    name: 'users/dashboard',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'usersHome', sidebar: 'tpeeSideNavbar', view: 'usersTreeView'});
    }
});

usersRoutes.route('/settings', {
    name: 'users/sub-module',
    action() {
        BlazeLayout.render('mainTemplate', {module: 'tpeeSubModule', sidebar: 'tpeeSideNavbar'});
    }
});
