
Template.recruitmentSingleCollectionSample.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Collection_sample', id);
    });
});

Template.recruitmentSingleCollectionSample.helpers({
    collection_sample_single: () => {
        var id = FlowRouter.getParam('_id');
        return Collection_sample.findOne({_id: id});
    },
    updateCollectionSampleId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
});

Template.recruitmentSingleCollectionSample.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('recruitmentDeleteCollection_sample', id);
        FlowRouter.go('recruitment');
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});

