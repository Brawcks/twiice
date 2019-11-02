Template.tpeeGlobalMessages.onCreated(function() {
    var self = this;
    this.mailSend = new ReactiveVar(true);
});

Template.tpeeGlobalMessages.helpers({
    mailSend: function() {
        return Template.instance().mailSend.get();
    },
});

Template.tpeeGlobalMessages.events({
    'click .btn-note': function (event, template){
        template.mailSend.set(false);
    },
    'click .btn-sendmail': function (event, template){
        template.mailSend.set(true);
    },
});