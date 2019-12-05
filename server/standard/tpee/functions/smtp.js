import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Random } from 'meteor/random'

// Server: Define a method that the client can call.
Meteor.methods({
    sendEmail(to, from, subject, text) {
        // Make sure that all arguments are strings.
        check([to, from, subject, text] [String]);

        // Let other method calls from the same client start running, without
        // waiting for the email sending to complete.
        this.unblock();
        var messageId = "<" + Random.secret() + "@tiktakweb.fr>";
        Email.send({ to, from, subject, text, messageId });
        return messageId;
    }
});

Meteor.startup(function () {
    process.env.MAIL_URL = Meteor.settings.public.env.smtp;
});