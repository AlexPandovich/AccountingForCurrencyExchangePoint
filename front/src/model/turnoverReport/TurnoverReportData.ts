import { TurnoverReport } from "./TurnoverReport";
import { CurrencyOperations } from "./CurrencyOperations";
import TurnoverBaseOperations from "../rawData/TurnoverBaseOperations";

export default class TurnoverReportData {
	today:TurnoverReport = new TurnoverReport();
	prevDay:TurnoverReport = new TurnoverReport();
	
	constructor(today:TurnoverReport, prevDay:TurnoverReport) {
		this.today = today
		this.prevDay = prevDay;
	}
}