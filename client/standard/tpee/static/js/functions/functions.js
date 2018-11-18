// THIS FILE REGROUPS EVERY TPEE FUNCTIONS

// GENERATE MAIN MENU
var publicSettings = Meteor.settings.public;

// ADD ITEMS TO MENU
// THIS FUNCTION SHOULD MOVE TO CLIENT STANDARD FOLDER
export function mainTopNavbarStandard() {
    var menuStandard = "";
    $.each(publicSettings.modules.standard, function (i, item) {
        // console.log(item);
        menuStandard += '<a class="dropdown-item" href="' + item.url + '">' + item.name + '</a>';
    });
    return menuStandard;
}

// THIS FUNCTION SHOULD MOVE TO CLIENT Z-CUSTOMER FOLDER
export function mainTopNavbarCustomer() {
    var menuCustomer = "";
    $.each(publicSettings.modules.customer, function (i, item) {
        // console.log(item);
        menuCustomer += '<a class="dropdown-item" href="' + item.url + '">' + item.name + '</a>';
    });
    return menuCustomer;
}

export function leftSidebarStandard() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = "";

    $.each(leftSidebarData.sidebar, function (i, item) {
        leftSidebar += '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="' + item.url + '" role="tab" aria-controls="v-pills-home" aria-selected="true">' + item.name + '</a>';
    });
    return leftSidebar;
}

// ACCOUNTS CONFIGURATION


// GLOBAL FUNCTIONS FOR ALL MODULES SHOULD BE DEFINED HERE

Meteor.methods({
    // DESIGN FEATURES / METHODS
    tw_field_decoration: function () {
        // We here decorate bootstrap input depending on twiice special classes
        $('form *').filter(':input').each(function () {
            //your code here
            console.log("a count");
        });
    },

    // TECHNICAL / DATA TRANSFORMATION
    download_csv: function (content, fileName, mimeType) {
        // var download = function (content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
        // download(csvContent, 'dowload.csv', 'text/csv;encoding:utf-8');
    }
});
