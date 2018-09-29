import { leftSidebarCustomer } from './functions/functions.js';

Template.sideNavbarstacy.helpers({
    leftSidebar: () => {
        return leftSidebarCustomer();
    },
});
