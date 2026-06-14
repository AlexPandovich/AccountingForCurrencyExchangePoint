import { CurrencyOperations } from "../../model/turnoverReport/CurrencyOperations";
import { TurnoverReport } from "../../model/turnoverReport/TurnoverReport";
import TurnoverReportBaseData from "../../model/rawData/TurnoverReportBaseData";
import BigNumber from "bignumber.js";

export function isNumeric(str:any) {
	if (typeof str != "string") return false // we only process strings!  
		return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
			!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



export default class TurnoverDSFactory {
	valuteList:Array<string> = ["USD", "EUR", "RUB", "RON", "UAH"];

	public createResponseObject (datasource:Array<any>, paymentOrder:TurnoverReport) {
		const result:TurnoverReportBaseData = new TurnoverReportBaseData();
		result.tax = paymentOrder.getTax();
		result.date = paymentOrder.getDate();
		const length = this.valuteList.length;
	
		result.tax = new BigNumber(datasource[length+2].startDayMdl).div(100).toNumber(); // convert from percents to number
		result.bankPayment = datasource[length + 3].startDayMdl;
		result.salary = datasource[length+4].startDayMdl;
		result.mdl = datasource[length+6].startDayMdl;
	
		result.operations = [];
	
		for(const i in this.valuteList) {
			result.operations.push({currency:this.valuteList[i], 
				startDayNominal:datasource[i].startDayNominal, startDayMdl:datasource[i].startDayMdl,
				buyNominal:datasource[i].buyNominal, buyMdl:datasource[i].buyMdl, 
				sellNominal:datasource[i].sellNominal, sellMdl:datasource[i].sellMdl,
				endDayMdl:datasource[i].endDayMdl,
				bankPayment: 0, salary : 0
			})
		}
	
		return result;
	}

	public createDataSource(paymentOrder:TurnoverReport) {
		let dataSource = [];
		const currenciesDate = this.getCurrenciesData(paymentOrder);
		const length = currenciesDate.length;
		const footer = this.getFooterDate(paymentOrder, length);
	
		dataSource = [
			...currenciesDate,
			...footer
		]
		return dataSource;
	}

	private getCurrenciesData(paymentOrder:TurnoverReport) {
		let currencies = []
		
		if(paymentOrder) {
			let op:CurrencyOperations|undefined;
			for(let i = 0; i < this.valuteList.length; ++i) {
				op = paymentOrder.getOperation(this.valuteList[i]);
	
				if(op) {
					const rate:number|undefined = paymentOrder.getNbRate(op.currency);
					currencies.push({
						id:i, name: `(${rate}) ${op.getCurrencyName()}`,
						startDayNominal:op.getStartDayNominal(), startDayMdl:op.getStartDayMdl(), 
						buyNominal: op.getBuyNominal(), buyMdl:op.getBuyMdl(), 
						sellNominal: op.getSellNominal(), sellMdl:op.getSellMdl(),
						endDayNominal: op.getEndDayNominal(), endDayMdl: op.getEndDayMdl()
					})
				} else {
					currencies.push({
						id:i, name: this.valuteList[i], startDayNominal:0, startDayMdl:0, buyNominal:0, buyMdl:0, sellNominal:0, sellMdl:0,endDayNominal:0, endDayMdl:0
					})
				}
			}
		} 
	
		return currencies;
	}

	private getFooterDate(po:TurnoverReport, length:number) {
		let footer:Array<any> = [];
	
		if(po) {
			const taxInPercents =  po.tax.mul(100).toNumber();

			footer = [
				{ id:length, name: "Total", startDayMdl:po.getStartDaySumMdl(), buyMdl:po.getBuyMdlSum(), sellMdl:po.getSellMdlSum(), endDayMdl:po.getEndDayMdlSum()},
				{ id:length + 1},
				{ id:length + 2, name: "comis", startDayMdl: taxInPercents, buyMdl:po.getComis()},
				{ id:length + 3, name: "Банк", startDayMdl:po.getBankPayment()},
				{ id:length + 4, name: "Зарплата", startDayMdl:po.getSalary()},
				{ id:length + 5},
				{ id:length + 6, name: "MDL", startDayMdl: po.getMdl(), buyMdl:po.getDebitSum(), sellMdl:po.getCreditSum(), endDayMdl: po.getEndDayMdl()},
				{ id:length + 7, name: "Total", startDayMdl:po.getTotalStartDayMdl(), endDayMdl:po.getTotalEndDayMdl()},
			]
			
		} 
	
		return footer;
	}
}







