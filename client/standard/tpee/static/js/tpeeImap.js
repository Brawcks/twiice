const publicSettings = Meteor.settings.public;

Template.tpeeIncomingMailServer.onCreated(function() {
    var self = this;
});

Template.tpeeIncomingMailServer.helpers({
    // settings: () => {
    //     return General_settings.findOne({tpee_settings: true});
    // },
});

Template.tpeeIncomingMailServer.events({
    'click .btn-info': function (event, template){
        Meteor.call(
            'fetchMails', function (error, result) {
                if (error) {
                    swal("Oops!", "Something went wrong! Mail not fetched !", "error");
                } else {
                    swal("Yeah !", "E-mail fetched !", "success");
                }
            }
        );
    },
});