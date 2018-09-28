// THIS FILE REGROUPS EVERY TPEE FUNCTIONS

// GENERATE MAIN MENU
var publicSettings = Meteor.settings.public;
var menuStandard = "";
var menuCustomer = "";

// ADD ITEMS TO MENU
var name = ""; 
var url = ""; 

export function mainTopNavbarStandard() {
    $.each(publicSettings.modules.standard, function(i, item) {
        // console.log(item);
        menuStandard += '<a class="dropdown-item" href="'+item.url+'">'+item.name+'</a>';
    });
    return menuStandard;
}

export function mainTopNavbarCustomer() {
    $.each(publicSettings.modules.customer, function(i, item) {
        // console.log(item);
        menuCustomer += '<a class="dropdown-item" href="'+item.url+'">'+item.name+'</a>';
    });
    return menuCustomer;
}

