import jsPDF from 'jspdf';

export function exportPDF() {
    var doc = new jsPDF()
    var id = FlowRouter.getParam('_id');
    var pipeline = Pipelines.findOne({_id: id});

    doc.text("Pipeline label : " + pipeline.label, 10, 10);
    doc.text("Step : " + pipeline.crm_steps, 10, 20);
    doc.text("Expected revenue : " + pipeline.expected_revenue + " €", 10, 30);
    doc.save(pipeline.label + '.pdf');
}
