// THIS FILE REGROUPS EVERY TPEE FUNCTIONS

// GENERATE MAIN MENU
var publicSettings = Meteor.settings.public;

// ADD ITEMS TO MENU
// THIS FUNCTION SHOULD MOVE TO CLIENT STANDARD FOLDER
export function mainTopNavbarStandard() {
    var menuStandard = "";
    $.each(publicSettings.modules.standard, function(i, item) {
        // console.log(item);
        menuStandard += '<a class="dropdown-item" href="'+item.url+'">'+item.name+'</a>';
    });
    return menuStandard;
}

// THIS FUNCTION SHOULD MOVE TO CLIENT Z-CUSTOMER FOLDER
export function mainTopNavbarCustomer() {
    var menuCustomer = "";
    $.each(publicSettings.modules.customer, function(i, item) {
        // console.log(item);
        menuCustomer += '<a class="dropdown-item" href="'+item.url+'">'+item.name+'</a>';
    });
    return menuCustomer;
}

export function leftSidebarStandard() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = "";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="'+item.url+'" role="tab" aria-controls="v-pills-home" aria-selected="true">'+item.name+'</a>';
    });
    return leftSidebar;
}

// ACCOUNTS CONFIGURATION


// GLOBAL FUNCTIONS FOR ALL MODULES SHOULD BE DEFINED HERE

Meteor.methods({
    
});
