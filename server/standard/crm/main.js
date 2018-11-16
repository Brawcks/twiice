import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
});

// PUBLISH PIPELINES ON SERVER
Meteor.publish('Pipelines', function() {
  return Pipelines.find({})
})
