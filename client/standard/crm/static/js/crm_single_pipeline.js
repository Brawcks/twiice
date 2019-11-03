import jsPDF from 'jspdf';

Template.crmSinglePipeline.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Pipelines', id);
        self.subscribe('Partners');
        self.subscribe('mailMessages');
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
    crm_steps: () => {
        return PipelinesSchema.get('crm_steps', 'allowedValues');
    },
    mailsMessages: () => {
        var id = FlowRouter.getParam('_id');
        return mailMessages.find({document_id: id, collection: "Pipelines"}, {sort: { createdAt: -1}});
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
    },
    'click .btn-info': function (event, template){
        var doc = new jsPDF()
        var id = FlowRouter.getParam('_id');
        var pipeline = Pipelines.findOne({_id: id});

        doc.text(pipeline.label, 10, 10)
        doc.save(pipeline.label + '.pdf')
    },
    'click .step': function (e){
        var id = FlowRouter.getParam('_id');
        var step = $(e.target).text();
        Pipelines.update(id, {
            $set: { 
                crm_steps: step 
            }
        });
    },
    'click #writeNote': function (event, template) {
        var id = FlowRouter.getParam('_id');
        var pipeline = Pipelines.findOne({_id: id});
        var contact = Partners.findOne({_id: Pipelines.findOne({_id: id}).partners_id});
        var content = $('#writeNoteContent').val()

        mailMessages.insert({
            author: 'Test',
            title: pipeline.label,
            content: content,
            ismail: false,
            document_id: id,
            collection: "Pipelines"
        }, function (error, result) {
            if (error) {
                console.error(error);
            }
        });
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
                    mailMessages.insert({
                        author: 'Test',
                        title: pipeline.label,
                        content: content,
                        ismail: true,
                        document_id: id,
                        collection: "Pipelines"
                    }, function (error, result) {
                        if (error) {
                            console.error(error);
                        }
                    });
                }
            }
        );
    }
});