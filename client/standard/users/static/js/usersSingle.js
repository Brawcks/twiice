import { Meteor } from "meteor/meteor";

// TREE VIEW TEMPLATE

Template.usersSingleUser.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('users', id);
    })
});

// HELPERS

Template.usersSingleUser.helpers({
    user: () => {
        var id = FlowRouter.getParam('_id');
        return Meteor.users.findOne({_id: id});
    },
    email: () => {
        return Meteor.users.findOne({_id: id}).emails[0];
    },
    editMode: function () {
        return Template.instance().editMode.get();
    }
});

// EVENTS

Template.usersSingleUser.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.users.remove(id);
        FlowRouter.go('users/dashboard');
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});