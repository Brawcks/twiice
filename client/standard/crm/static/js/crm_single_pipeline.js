Template.crmSinglePipeline.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Pipelines', id);
    });
});

Template.crmSinglePipeline.helpers({
    pipeline: () => {
        var id = FlowRouter.getParam('_id');
        return Pipelines.findOne({_id: id});
    },
    updatePipelineId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
});

Template.crmSinglePipeline.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('crmDeletePipeline', id);
        FlowRouter.go('crm');
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
        console.log(template.editMode.get());
    },
});