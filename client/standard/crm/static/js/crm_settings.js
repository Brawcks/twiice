Template.settingscrm.onCreated(function() {
    var self = this;
    this.editMode = new ReactiveVar(false);
    self.autorun(function() {
        self.subscribe('Crm_settings');
    });
});

Template.settingscrm.helpers({
    settings: () => {
        return Crm_settings.findOne({crm_settings: true});
    },
});

Template.settingscrm.events({
    'click .btn-info': function (event, template){
        template.editMode.set(!template.editMode.get());
    },
});