import { Meteor } from "meteor/meteor";

import { leftSidebarCustomer, filter_operator } from './functions/functions.js';

// LOAD DATA ON TEMPLATES 
Template.sideNavbarUsers.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});

// TREE VIEW TEMPLATE

Template.usersTreeView.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('users');
    })
});

Template.usersTreeView.helpers({
    users: () => {
        return Meteor.users.find();
    },
    email: function() {
        return this.emails[0];
    }
});
