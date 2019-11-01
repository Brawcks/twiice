Migrations.add({
    version: 2,
    up() {
        Crm_settings.insert({
            crm_settings: true,
            crm_favorite: false,
            crm_steps: true,
        });
    }
});

Migrations.add({
    version: 3,
    up() {
        Crm_settings.insert({
            crm_settings: true,
            crm_favorite: false,
            crm_steps: true,
        });
    }
});
