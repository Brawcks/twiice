Template.crmSinglePipeline.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Pipelines', id);
    });
});

Template.crmSinglePipeline.helpers({
    pipeline: () => {
        var id = FlowRouter.getParam('_id');
        return Pipelines.findOne({_id: id});
    }
});

Template.crmSinglePipeline.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('crmDeletePipeline', id);
        FlowRouter.go('crm');
    },
});