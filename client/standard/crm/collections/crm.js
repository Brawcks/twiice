Pipelines = new Meteor.Collection('pipelines');

PipelinesSchema = new SimpleSchema ({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        }
    }
});

Pipelines.attachSchema(PipelinesSchema);