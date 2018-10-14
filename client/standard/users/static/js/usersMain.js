// TREE VIEW TEMPLATE

Template.usersTreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('userList');
    })
});

Template.usersTreeView.helpers({
    usersTreeList: () => {
        return Meteor.users.find({});
    }
});

console.log(Meteor.users.find({}));
