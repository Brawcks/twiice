export function leftSidebarCustomer() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = "";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="'+item.url+'" role="tab" aria-controls="v-pills-home" aria-selected="true">'+item.name+'</a>';
    });
    return leftSidebar;
}