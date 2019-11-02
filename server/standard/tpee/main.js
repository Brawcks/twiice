import './migrations/1-preload.js';
import './functions/smtp.js';

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
});

// PUBLISH PIPELINES ON SERVER
Meteor.publish('General_settings', function() {
  return General_settings.find({})
})

Meteor.publish('mailMessages', function() {
  return mailMessages.find({})
})
