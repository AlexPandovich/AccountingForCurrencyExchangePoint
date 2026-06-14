import DailyReportPdfFactory from "./DailyReportPdfFactory";
import MonthDataStorage from "../monthReport/MonthDataStorage";
import autoTable from 'jspdf-autotable'
import jsPDF from "jspdf";
import MonthReportPdfFactory from "./MonthReportPdfFactory";
import format from 'date-fns/format'

export default class PdfBuilder {
	private static formatDate(date:string|undefined) {
		let result = "";

		if(date) 
			result = format(new Date(date),"yyyy-MM");

		return result;
	}

	public static buildEveryDayReports(monthDataStorage:MonthDataStorage, doc:jsPDF) {
		for(const val of monthDataStorage.data) {
			const gbody = DailyReportPdfFactory.generateBody(val);
			doc.addPage();
			doc.text(String(val.curday?.date), 14, 20);
			autoTable(doc, {
				startY: 22,
				headStyles: { fillColor: [255, 255, 255], textColor: "black", lineWidth: 0.2, halign: 'center'},
				styles: {halign: 'right'},
				head: [['Operation', 'Nominal', 'MDL', '622', "611", '711', '722']],
				body: gbody,
				theme: 'grid'
				})
		}
	}
	
	public static buildMonthReport(monthDataStorage:MonthDataStorage, doc:jsPDF) {
		doc.addPage();
		const headerCt = MonthReportPdfFactory.generateCreditHeader(monthDataStorage);
		const bodyCt = MonthReportPdfFactory.generateCreditBody(monthDataStorage);

		if(monthDataStorage.data.length)
			doc.text(this.formatDate(monthDataStorage.data[0].curday?.date), 14, 20);

		autoTable(doc, {
			startY: 22,
			headStyles: { fillColor: [255, 255, 255], textColor: "black", lineWidth: 0.2, halign: 'center'},
			styles: {halign: 'right', valign: "middle"},
			head: headerCt,
			theme: 'grid',
			body: bodyCt,
		});

		doc.addPage();
		const headerDt = MonthReportPdfFactory.generateDebitHeader(monthDataStorage);
		const bodyDt = MonthReportPdfFactory.generateDebigBody(monthDataStorage);
		if(monthDataStorage.data.length)
			doc.text(this.formatDate(monthDataStorage.data[0].curday?.date), 14, 20);

		autoTable(doc, {
			startY: 22,
			headStyles: { fillColor: [255, 255, 255], textColor: "black", lineWidth: 0.2, halign: 'center'},
			styles: {halign: 'right', valign: "middle"},
			head: headerDt,
			theme: 'grid',
			body: bodyDt,
		});
	}
}