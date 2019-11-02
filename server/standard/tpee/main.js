import './migrations/1-preload.js';

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
});

// PUBLISH PIPELINES ON SERVER
Meteor.publish('General_settings', function() {
  return General_settings.find({})
})
