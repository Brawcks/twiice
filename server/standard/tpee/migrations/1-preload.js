Migrations.add({
    version: 1,
    up() {
        General_settings.insert({
            setting1: true,
            setting2: false,
            tpee_settings: true,
        });
        Crm_settings.insert({
            crm_settings: true,
            crm_favorite: false,
            crm_steps: true,
        });
    }
});
