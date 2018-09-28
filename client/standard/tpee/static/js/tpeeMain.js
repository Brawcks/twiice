// IMPORT MODULES TO GENERATE NAVBAR MENU
import { mainTopNavbarStandard } from './functions/functions.js';
import { mainTopNavbarCustomer } from './functions/functions.js';

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