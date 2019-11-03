import jsPDF from 'jspdf';

export function leftSidebarCustomer() {
    // SIDEBAR
    var leftSidebarData = require('../data/sidebar.json');
    var leftSidebar = "";

    $.each(leftSidebarData.sidebar, function(i, item) {
        leftSidebar += '<a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="'+item.url+'" role="tab" aria-controls="v-pills-home" aria-selected="true">'+item.name+'</a>';
    });
    return leftSidebar;
}

export function exportPDF() {
    var doc = new jsPDF()
    var id = FlowRouter.getParam('_id');
    var pipeline = Pipelines.findOne({_id: id});

    doc.text("Pipeline label : " + pipeline.label, 10, 10);
    doc.text("Step : " + pipeline.crm_steps, 10, 20);
    doc.text("Expected revenue : " + pipeline.expected_revenue + " €", 10, 30);
    doc.save(pipeline.label + '.pdf');
}

export function filter_operator(operator, filter, val) {
    var complete_filter = {};
    switch (operator) {
        case "equalTo":
            complete_filter = {[filter]: { $eq: val } };
            break;
        case "isDifferentFrom":
            complete_filter = {[filter]: { $ne: val } };
            break
        case "contain":
            complete_filter = {[filter]: { $regex: '.*' + val + '.*' }};
            break
        case "doNotContain":
            complete_filter = {[filter]: { $not: { $regex: val } } };
            break
        case "isSet":
            complete_filter = {[filter]: { $exists: true } };
            break
        case "isNotSet":
            complete_filter = {[filter]: { $exists: false } };
            break
        default:
            break;
    }
    return complete_filter;
}
