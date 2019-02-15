Meteor.startup(() => {
  // code to run on server at startup
});


// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('Collection_sample', function() {
  return Collection_sample.find({})
})
