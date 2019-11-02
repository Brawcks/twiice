Template.tpeeGeneralSettings.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        self.subscribe('General_settings');
    });
});

Template.tpeeGeneralSettings.helpers({
    settings: () => {
        return General_settings.findOne({tpee_settings: true});
    },
});

// Template.tpeeGeneralSettings.events({
//     'click .btn-info': function (event, template){
//         template.editMode.set(!template.editMode.get());
//     },
// });