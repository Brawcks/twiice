Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.publish('users', function () {
    return Meteor.users.find({});
});