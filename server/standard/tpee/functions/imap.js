import { Random } from 'meteor/random';
import { Logger } from 'meteor/ostrio:logger';

var imaps = require('imap-simple');

const log = new Logger();

const imapSettings = Meteor.settings.public.env.imap;
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');

// Server: Define a method that the client can call.
Meteor.methods({
    fetchMails() {
        var config = {
            imap: {
                user: imapSettings.user,
                password: imapSettings.password,
                host: imapSettings.host,
                port: imapSettings.port,
                tls: imapSettings.tls,
                authTimeout: imapSettings.authTimeout
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
                    
                    results.forEach(r => {
                        let header = r.parts[2];

                        let incReplyTo = header.body['in-reply-to'][0] ? header.body['in-reply-to'][0] : false;
                        let incMessageId = header.body['message-id'][0] ? header.body['message-id'][0] : false;
                        let incFrom = header.body.from ? header.body.from : false;

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
    SyncedCron.add({
        name: 'Fetch mails from inbox',
        schedule: function(parser) {
          // parser is a later.parse object
          return parser.text('every ' + imapSettings.interval + ' mins');
        },
        job: function() {
            Meteor.call('fetchMails');
        }
    });

    // Start cron here
    SyncedCron.start();
});