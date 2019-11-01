// IMPORT MODULES TO GENERATE NAVBAR MENU
import { mainTopNavbarStandard } from './functions/functions.js';
import { mainTopNavbarCustomer } from './functions/functions.js';
import { leftSidebarStandard } from './functions/functions.js';
import { leftSidebarStandardSettings } from './functions/functions.js';

// HELPERS
Template.tpeeTopNavbar.helpers({
    standard_modules: () => {
        return mainTopNavbarStandard();
    },
});

Template.tpeeTopNavbar.helpers({
    customer_modules: () => {
        return mainTopNavbarCustomer();
    },
});

Template.tpeeSideNavbar.helpers({
    leftSidebar: () => {
        return leftSidebarStandard();
    },
});

Template.tpeeSideNavbarSettings.helpers({
    leftSidebarSettings: () => {
        return leftSidebarStandardSettings();
    },
});