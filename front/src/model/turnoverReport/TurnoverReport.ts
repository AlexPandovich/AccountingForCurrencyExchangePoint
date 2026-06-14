 import BigNumber from "bignumber.js";

import { CurrencyOperations } from "./CurrencyOperations";
import TurnoverReportBaseData from "../rawData/TurnoverReportBaseData";

export class TurnoverReport {
	rawData:TurnoverReportBaseData = new TurnoverReportBaseData();
	date:string = "";
	tax:BigNumber = new BigNumber(0);
	operations: Map<string, CurrencyOperations> = new Map();
	mdl: BigNumber = new BigNumber(0);
	bankPayment: BigNumber = new BigNumber(0);
	salary: BigNumber = new BigNumber(0);

	nationalBankRates:Map<string, BigNumber> = new Map();

	startDaySumMdl: BigNumber = new BigNumber(0);
	buyMdlSum: BigNumber = new BigNumber(0);
	sellMdlSum: BigNumber = new BigNumber(0);
	endDayMdlSum:BigNumber = new BigNumber(0);

	comis: BigNumber = new BigNumber(0);
	debitSum: BigNumber = new BigNumber(0);
	creditSum: BigNumber = new BigNumber(0);
	endDayMdl: BigNumber = new BigNumber(0);

	totalStartDayMdl: BigNumber = new BigNumber(0);
	totalEndDayMdl: BigNumber = new BigNumber(0);

	getOperation(currency: string):CurrencyOperations|undefined {
		return this.operations.get(currency);
	}
	getDate():string {return this.date;}
	getTax():number {return this.tax.toNumber();}
	getMdl():number {return this.mdl.toNumber();}
	
	getNbRate(val:string):number|undefined{
		return this.nationalBankRates.get(val)?.toNumber()
	}

	getStartDaySumMdl():number{return this.startDaySumMdl.toNumber();}
	getBuyMdlSum():number{return this.buyMdlSum.toNumber();}
	getSellMdlSum():number{return this.sellMdlSum.toNumber();}
	getEndDayMdlSum():number{return this.endDayMdlSum.toNumber();}

	getComis():number{return this.comis.toNumber();}
	getDebitSum():number {return this.debitSum.toNumber();}
	getCreditSum():number {return this.creditSum.toNumber();}
	getEndDayMdl():number {return this.endDayMdl.toNumber();}

	getTotalStartDayMdl():number {return this.totalStartDayMdl.toNumber();}
	getTotalEndDayMdl():number {return this.totalEndDayMdl.toNumber();}
	
	getBankPayment():number {return this.bankPayment.toNumber();}
	getSalary():number {return this.salary.toNumber();}
}