Meteor.startup(() => {
  // code to run on server at startup
});


// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('Project', function() {
  return Project.find({});
})
