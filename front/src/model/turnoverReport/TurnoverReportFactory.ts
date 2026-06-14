import { CurrencyOperations } from "./CurrencyOperations";
import {TurnoverReport} from "./TurnoverReport";
import BigNumber from "bignumber.js";
import RawPaymentReport from "../rawData/TurnoverReportBaseData";
import RawPaymentOperations from "../rawData/TurnoverBaseOperations";

export class TurnoverReportFactory {
	createTurnoverReport(today:RawPaymentReport) {
		let res = new TurnoverReport();

		res.rawData = today;
		res.date = today.date;
		res.tax = new BigNumber(today.tax);

		if(today.bankPayment) 
			res.bankPayment = new BigNumber(today.bankPayment);
			
		if(today.salary) 
			res.salary = new BigNumber(today.salary);

		for(let op of today.operations) {
			let opCur:CurrencyOperations = this.#toCurrencyOperations(op);
			res.operations.set(op.currency, opCur);
		}
		
		res.mdl = new BigNumber(today.mdl);

		this.#makeCalculations(res)
		return res;
	}

    #makeCalculations(order:TurnoverReport) {
		this.#calcEndDayNominal(order);
		this.#calcNbRates(order);
		this.#calcEndDayMdl(order);
		
		this.#calculateSums(order);
		this.#calculateComis(order);
		this.#calculateMdlBalance(order);
		this.#calculateTotalBalance(order);
	}

	#toCurrencyOperations(op:RawPaymentOperations):CurrencyOperations {
		let result = new CurrencyOperations();
		result.currency = op.currency;
		result.startDayNominal = new BigNumber(op.startDayNominal);
		result.startDayMdl = new BigNumber(op.startDayMdl);

		result.buyNominal = new BigNumber(op.buyNominal);
		result.buyMdl = new BigNumber(op.buyMdl);

		result.sellNominal = new BigNumber(op.sellNominal)
		result.sellMdl = new BigNumber(op.sellMdl);
	
		result.endDayMdl = new BigNumber(op.endDayMdl);
		return result;
	}
	
	#calcNbRates(res:TurnoverReport) {
		// Compute exchange rates for currencies

		res.operations.forEach((value, key) => {
			let nbRate:BigNumber = new BigNumber(0);
			if(value.startDayNominal.equals(0) && value.endDayNominal.equals(0)) {
				
			}else if(value.startDayNominal.equals(0) && !value.endDayNominal.equals(0)) 
				nbRate = value.endDayMdl.dividedBy(value.endDayNominal);
			else 
				nbRate =  value.startDayMdl.dividedBy(value.startDayNominal);

			res.nationalBankRates.set(key, nbRate);
		})

	}

	#calcEndDayNominal(res:TurnoverReport) {
		res.operations.forEach((value, key) => {
			value.endDayNominal = value.startDayNominal.plus(value.buyNominal).minus(value.sellNominal);
		})
	}

	#calcEndDayMdl(res:TurnoverReport) {
		let exchangeRate;

		res.operations.forEach((value, key) => {
			exchangeRate = res.nationalBankRates.get(key);

			value.endDayMdl = exchangeRate? value.endDayNominal.mul(exchangeRate) : new BigNumber(0);
		});
	}

	#calculateSums(res:TurnoverReport) {
		 res.startDaySumMdl = new BigNumber(0);
		 res.buyMdlSum = new BigNumber(0);
		 res.sellMdlSum = new BigNumber(0);
		 res.endDayMdlSum = new BigNumber(0);
		 
		 const values = res.operations.values(); 
		 for(const val of values) {
			res.startDaySumMdl = res.startDaySumMdl.plus(val.startDayMdl);
			res.buyMdlSum = res.buyMdlSum.plus(val.buyMdl);
			res.sellMdlSum = res.sellMdlSum.plus(val.sellMdl);
			res.endDayMdlSum = res.endDayMdlSum.plus(val.endDayMdl);
		 }
	}

	#calculateComis(res:TurnoverReport) {
		res.comis = res.sellMdlSum.mul(res.tax);
	}

	#calculateMdlBalance(res:TurnoverReport) {
		res.debitSum = res.sellMdlSum.plus(res.comis);
		res.creditSum = res.buyMdlSum;
		
		res.endDayMdl = res.mdl.plus(res.debitSum).minus(res.creditSum).minus(res.salary).minus(res.bankPayment);
	}

	#calculateTotalBalance(res:TurnoverReport) {
		res.totalStartDayMdl = res.startDaySumMdl.plus(res.mdl);
		res.totalEndDayMdl = res.endDayMdlSum.plus(res.endDayMdl);
	}
}