Template.crmSinglePipeline.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    this.mailSend = new ReactiveVar(true);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Pipelines', id);
        self.subscribe('Partners');
    });
});

Template.crmSinglePipeline.helpers({
    pipeline: () => {
        var id = FlowRouter.getParam('_id');
        return Pipelines.findOne({_id: id});
    },
    customer: () => {
        var id = FlowRouter.getParam('_id');
        return Partners.findOne({_id: Pipelines.findOne({_id: id}).partners_id});
        // return Meteor.call('get_reldoc', Pipelines, Partners, partners_id); // FIXME !
    },
    updatePipelineId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
    mailSend: function() {
        return Template.instance().mailSend.get();
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
    },
    'click .btn-note': function (event, template){
        template.mailSend.set(false);
    },
    'click .btn-sendmail': function (event, template){
        template.mailSend.set(true);
    },
    'click #mailSend': function (event, template) {
        var id = FlowRouter.getParam('_id');
        var pipeline = Pipelines.findOne({_id: id});
        var contact = Partners.findOne({_id: Pipelines.findOne({_id: id}).partners_id});
        var content = $('#mailSendContent').val()
        Meteor.call(
            'sendEmail',
            contact.email,
            'catchall@tiktakweb.fr',
            pipeline.label,
            content, function (error, result) {
                if (error) {
                    swal("Oops!", "Something went wrong! Mail not sent !", "error");
                } else {
                    swal("Yeah !", "E-mail sent !", "success");
                }
            }
        );
    }
});