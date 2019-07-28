Meteor.startup(() => {
  // code to run on server at startup
});


// PUBLISH COLLECTION SAMPLE ON SERVER
Meteor.publish('websiteCollection_sample', function() {
  return websiteCollection_sample.find({})
})

Meteor.publish('websiteArticlesCategories', function() {
  return websiteArticlesCategories.find({})
})
