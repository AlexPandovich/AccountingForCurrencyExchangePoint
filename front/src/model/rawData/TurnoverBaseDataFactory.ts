import TurnoverReportBaseData from "./TurnoverReportBaseData";
import TurnoverBaseOperations from "./TurnoverBaseOperations";
import { TurnoverReport } from "../turnoverReport/TurnoverReport";

export default class TurnoverBaseDataFactory {
	static createEmptyBaseData(date:string):TurnoverReportBaseData {
		let baseData:TurnoverReportBaseData = new TurnoverReportBaseData();
		const valuteList = ["USD", "EUR", "RUB", "RON", "UAH"];
		baseData.date = date;
		for(const valute of valuteList) {
			let baseOp = new TurnoverBaseOperations()
			baseOp.currency = valute;
			baseData.operations.push(baseOp);
		}
		baseData.tax = 0.001;

		return baseData;
	}
	
	static loadData(dest:TurnoverReportBaseData, from:TurnoverReport) {
		dest.operations = [];
		for(const [key, op] of from.operations) {
			const baseOp = new TurnoverBaseOperations()
			baseOp.startDayNominal = op.endDayNominal.toNumber();
			baseOp.startDayMdl = op.endDayMdl.toNumber()
			baseOp.currency = op.currency;
			dest.operations.push(baseOp);
		}

		dest.mdl = from.endDayMdl.toNumber();
		dest.tax = from.tax.toNumber();
	}
}