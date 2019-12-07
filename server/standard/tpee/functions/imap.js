import { Random } from 'meteor/random';

var imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');

// Server: Define a method that the client can call.
Meteor.methods({
    fetchMails() {
        var config = {
            imap: {
                user: 'catchall@tiktakweb.fr',
                password: 'xxxxxxxx',
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
                    bodies: ['HEADER', 'TEXT', ''],
                    markSeen: true,
                };

                return connection.search(searchCriteria, fetchOptions).then(function (results) {

                    // console.log('BASE');
                    // console.log(results[0]);
                    // console.log('FIRST');
                    // console.log(results[0].parts[0]);
                    // console.log('SECOND');
                    // console.log(results[0].parts[1]);
                    // console.log(results[0].parts[1].body['in-reply-to'][0]);

                    results.forEach(r => {
                        let incReplyTo = r.parts[2].body['in-reply-to'][0];
                        let incMessageId = r.parts[2].body['message-id'][0];
                        let incFrom = r.parts[2].body.from;

                        var all = _.find(r.parts, { "which": "" })
                        var id = r.attributes.uid;
                        var idHeader = "Imap-Id: "+id+"\r\n";

                        simpleParser(idHeader+all.body, async (err, mail) => {
                            match = mailMessages.find({ messageId: incReplyTo }).fetch()[0];
                            if (match) {
                                let infos = {
                                    author: incFrom[0],
                                    title: match.title,
                                    content: mail.textAsHtml,
                                    ismail: true,
                                    isReply: true,
                                    document_id: match.document_id,
                                    collection: match.collection,
                                    messageId: incMessageId,
                                    createdAt: Date.now()
                                }

                                mailMessages.insert(infos);
                            } else {
                                console.log('nothing for now');   
                            }
                        });
                    });
                });
            });
        });
    }
});

Meteor.startup(function () {
    // process.env.MAIL_URL = Meteor.settings.public.env.smtp; // Not used here
});