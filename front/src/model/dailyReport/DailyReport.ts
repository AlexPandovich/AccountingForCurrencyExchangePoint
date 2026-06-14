import BigNumber from "bignumber.js";

import { TurnoverReport } from "../turnoverReport/TurnoverReport";
import { Balance } from "./Balance";
import { CommercialRate } from "./CommercialRate";

export class DailyReport {
	curday:TurnoverReport|undefined = undefined;
	prevDay:TurnoverReport|undefined = undefined;

	exchangeDiff:Balance = new Balance();
	
	balanceBuyMap:Map<string, Balance> = new Map();
	balanceSellMap:Map<string, Balance> = new Map();
	commercialExRateMap:Map<string, CommercialRate> = new Map();

	dailyBalance:Balance = new Balance();

	constructor(curday:TurnoverReport, prevDay:TurnoverReport|undefined) {
		this.curday = curday;
		this.prevDay = prevDay;
	}

	getCurDayMdl() {return this.curday?.getStartDaySumMdl();}
	getPrevDayMdl() {return this.prevDay?.getEndDayMdlSum()}

	getBuyNominal(currency:string):number|undefined {
		return this.curday?.getOperation(currency)?.getBuyNominal();
	}
	getBuyMdl(currency:string):number|undefined{
		return this.curday?.getOperation(currency)?.getBuyMdl();
	}
	getSellNominal(currency:string):number|undefined {
		return this.curday?.getOperation(currency)?.getSellNominal();
	}
	getSellMdl(currency:string):number|undefined {
		return this.curday?.getOperation(currency)?.getSellMdl();
	}

	getBuyProfit(currency:string):number|undefined {
		return this.balanceBuyMap.get(currency)?.getProfit();
	}

	getBuyLoss(currency:string):number|undefined {
		return this.balanceBuyMap.get(currency)?.getLoss();
	}

	getSellProfit(currency:string):number|undefined {
		return this.balanceSellMap.get(currency)?.getProfit();
	}

	getSellLoss(currency:string):number|undefined {
		return this.balanceSellMap.get(currency)?.getLoss();
	}
}