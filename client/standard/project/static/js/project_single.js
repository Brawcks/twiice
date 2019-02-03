import { restTime } from './functions/functions.js';

Template.projectSingle.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        var id = FlowRouter.getParam('_id');
        self.subscribe('Project', id);
        self.subscribe('Partners');
    });
});

Template.projectSingle.helpers({
    projectSingle: () => {
        var id = FlowRouter.getParam('_id');
        return Project.findOne({_id: id});
    },
    updateCollectionSampleId: function() {
        return FlowRouter.getParam('_id');
    },
    editMode: function () {
        return Template.instance().editMode.get();
    },
    date_rest: function() {
        var id = FlowRouter.getParam('_id');
        var data = Project.findOne({_id: id});

        var dateA = data.dateBegin;
        var dateB = data.dateEnd;
        return restTime(dateA,dateB);
    }
});

Template.projectSingle.events({
    'click .btn-danger': function (){
        var id = FlowRouter.getParam('_id');
        Meteor.call('projectDelete', id);
        FlowRouter.go('project');
        swal("Deleted", "This record was properly deleted !", "success");
    },
    'click .btn-warning': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});

