import { Meteor } from "meteor/meteor";

// TREE VIEW TEMPLATE

Template.usersTreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        // self.subscribe('users');
    })
});

Template.usersTreeView.helpers({
    usersTreeList: () => {
        return Meteor.users.find({});
    }
});
