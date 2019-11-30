import { leftSidebarCustomer } from './functions/functions.js';

Template.module_testSideNavbar.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});
