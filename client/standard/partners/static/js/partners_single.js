
Template.partnersSingleCollectionSample.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Partners', id);
    });
});

Template.partnersSingleCollectionSample.helpers({
    partner_single: () => {
        var id = FlowRouter.getParam('_id');
        return Partners.findOne({_id: id});
    },
    updateCollectionSampleId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
});

Template.partnersSingleCollectionSample.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('partnersDeleteCollection_sample', id);
        FlowRouter.go('partners');
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});

