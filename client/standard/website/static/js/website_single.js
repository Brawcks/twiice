
Template.websiteSingleCollectionSample.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('websiteCollection_sample', id);
    });
});

Template.websiteSingleCollectionSample.helpers({
    collection_sample_single: () => {
        var id = FlowRouter.getParam('_id');
        return websiteCollection_sample.findOne({_id: id});
    },
    updateCollectionSampleId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
});

Template.websiteSingleCollectionSample.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('websiteDeleteCollection_sample', id);
        FlowRouter.go('website');
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});

