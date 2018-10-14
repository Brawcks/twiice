Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.publish('userList', function () {
    return Meteor.users.find({});
});