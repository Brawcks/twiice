Meteor.startup(() => {
  // code to run on server at startup
});


// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('Partners', function() {
  return Partners.find({})
})
