FlowRouter.route('/module-test', {
    name: 'module-test',
    action() {
        // if(!Meteor.userId()) {
        //     FlowRouter.go('/');
        // }
        BlazeLayout.render('module_testTest');
    }
});