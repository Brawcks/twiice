import './migrations/1-preload.js';

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  var globalObject=Meteor.isClient?window:global;
    for(var property in globalObject){
        var object=globalObject[property];
        if(object instanceof Meteor.Collection){
            object.remove({});
        }
    }
});

// PUBLISH PIPELINES ON SERVER
Meteor.publish('Pipelines', function() {
  return Pipelines.find({})
})

Meteor.publish('Crm_settings', function() {
  return Crm_settings.find({})
})
