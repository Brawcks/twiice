const publicSettings = Meteor.settings.public;

Template.tpeeOutgoingMailServer.onCreated(function() {
    var self = this;
});

Template.tpeeOutgoingMailServer.helpers({
    // settings: () => {
    //     return General_settings.findOne({tpee_settings: true});
    // },
});

Template.tpeeOutgoingMailServer.events({
    'click .btn-info': function (event, template){
        Meteor.call(
            'sendEmail',
            publicSettings.env.smtp_mailtest,
            'catchall@tiktakweb.fr',
            'Hello from Twiice!',
            'This is a test of Email.send.', function (error, result) {
                if (error) {
                    swal("Oops!", "Something went wrong! Mail not sent !", "error");
                } else {
                    swal("Yeah !", "E-mail sent !", "success");
                }
            }
        );
    },
});