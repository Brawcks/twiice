import { Meteor } from 'meteor/meteor';
var moment = require('moment');


export function leftSidebarCustomer() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = "";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="'+item.url+'" role="tab" aria-controls="v-pills-home" aria-selected="true">'+item.name+'</a>';
    });
    return leftSidebar;
}

export function restTime(dateA, dateB) {
    var x = new moment(dateA);
    var y = new moment(dateB);
    var modifiedDate = y.diff(x, 'days');

    if(modifiedDate <= 1){
        return modifiedDate + " day left";
    }else{
        return modifiedDate + " days left";
    }
}