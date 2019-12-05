import { Random } from 'meteor/random';

var imaps = require('imap-simple');

// Server: Define a method that the client can call.
Meteor.methods({
    fetchMails() {
        console.log(imaps);
        var config = {
            imap: {
                // user: 'catchall@tiktakweb.fr',
                // password: 'xxxxxxxxxxx',
                user: 'coffin.vincent.sp@gmail.com',
                password: 'xxxxxxxxxx',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 3000
            }
        };
        
        imaps.connect(config).then(function (connection) {
        
            return connection.openBox('INBOX').then(function () {
                var searchCriteria = [
                    'UNSEEN'
                ];
        
                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false,
                };

                return connection.search(searchCriteria, fetchOptions).then(function (results) {
                    var subjects = results.map(function (res) {
                        return res.parts.filter(function (part) {
                            return part.which === 'HEADER';
                        })[0].body.subject[0];
                    });

                    console.log('BASE');
                    console.log(results[0]);
                    console.log('FIRST');
                    console.log(results[0].parts[0]);
                    console.log('SECOND');
                    console.log(results[0].parts[1]);
                    // console.log(subjects);
                    // console.log(results[0].attributes['x-gm-thrid'])
                });
            });
        });
    }
});

Meteor.startup(function () {
    // process.env.MAIL_URL = Meteor.settings.public.env.smtp; // Not used here
});