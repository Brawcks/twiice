Migrations.add({
    version: 1,
    up() {
        Crm_settings.insert({
            crm_settings: true,
            crm_favorite: false,
            crm_steps: true,
        });
    }
});
