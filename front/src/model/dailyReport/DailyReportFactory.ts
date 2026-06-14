import TurnoverReportData from "../turnoverReport/TurnoverReportData";
import BigNumber from "bignumber.js";
import { Balance } from "./Balance";
import { TurnoverReport } from "../turnoverReport/TurnoverReport";
import { DailyReport } from "./DailyReport";
import { CurrencyOperations } from "../turnoverReport/CurrencyOperations";
import { CommercialRate } from "./CommercialRate";


export default class DailyReportFactory {
	
	valuteList = ["USD", "EUR", "RUB", "RON", "UAH"];

	createDailyReport(today:TurnoverReport, prevday:TurnoverReport|undefined) {
		let report = new DailyReport(today, prevday);
		report.dailyBalance = new Balance();
		this.calculateBuyBalance(report);
		this.calculateSellBalance(report);
		this.calculateExchangeDiff(report);
		this.calculateCommercialRates(report);
		return report;
	}

	private calculateExchangeDiff(report:DailyReport) {
		if(report.curday) {
			const sumPrevDay = report.prevDay ? report.prevDay.endDayMdlSum : new BigNumber(0);
			const curDaySum = report.curday.startDaySumMdl;
			const result = curDaySum.minus(sumPrevDay);
			if(result.greaterThan(0)) 
				report.exchangeDiff.profit = result;
			else 
				report.exchangeDiff.loss = result.abs();
		}
	}

	private calculateCommercialRates(report:DailyReport) {
		let op:CurrencyOperations|undefined = undefined;
		for(const val of this.valuteList) {
			op = report.curday?.getOperation(val);
			if(op) {
				let rate = new CommercialRate();
				rate.buy = op.buyMdl.div(op.buyNominal);
				rate.sell = op.sellMdl.div(op.sellNominal);

				report.commercialExRateMap.set(val, rate);
			}
		}
	}

	private calculateBuyBalance(report:DailyReport) {

		let result;
		let nbSum;
		let op:CurrencyOperations|undefined = undefined;
		let nbRate:BigNumber|undefined = undefined;

		for(const val of this.valuteList) {
			op = report.curday?.getOperation(val);
			let balance = new Balance();
			nbRate = report.curday?.nationalBankRates.get(val);

			if(op && nbRate && !op.buyNominal.equals(0)) {
				nbSum = op.buyNominal.mul(nbRate);
				result = nbSum.minus(op.buyMdl);

				if(result.greaterThan(0)) {
					balance.profit = result;
					report.dailyBalance.profit = report.dailyBalance.profit.add(result.abs());
				}else {
					balance.loss = result.abs();
					report.dailyBalance.loss = report.dailyBalance.loss.add(result.abs());
				}

				report.balanceBuyMap.set(val, balance);
			}
		}
	}
	private calculateSellBalance(report:DailyReport) {
		let result;
		let nbSum;
		let op:CurrencyOperations|undefined = undefined;
		let nbRate:BigNumber|undefined = undefined;

		for(const val of this.valuteList) {
			op= report.curday?.getOperation(val);
			let balance = new Balance();
			nbRate = report.curday?.nationalBankRates.get(val);

			if(op && nbRate && !op.sellNominal.equals(0)) {
				nbSum = op.sellNominal.mul(nbRate);
				result = op.sellMdl.minus(nbSum);

				if(result.greaterThan(0)) {
					balance.profit = result;
					report.dailyBalance.profit = report.dailyBalance.profit.add(result.abs());
				}else {
					balance.loss = result.abs();
					report.dailyBalance.loss = report.dailyBalance.loss.add(result.abs());
				}

				report.balanceSellMap.set(val, balance);
			}
		}
	}
}