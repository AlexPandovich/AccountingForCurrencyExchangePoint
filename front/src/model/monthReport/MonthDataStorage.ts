import { DailyReport } from "../dailyReport/DailyReport";
import MonthSum from "./MonthSum";
import MonthCalculations from "./MonthCalculations";
import BigNumber from "bignumber.js";

export default class MonthDataStorage {
	data: Array<DailyReport> = [];
	monthSum:MonthSum = new MonthSum();
	calculations:Array<MonthCalculations> = []

	calculate() {
		this.#makeCalculations();
		this.#calculateSum();
		this.#calculateBalance();
	}

	#calculateBalance() {
		let buyCtSum = this.data[0]?.prevDay?.endDayMdl;
		let sellDtSum = this.data[0]?.prevDay?.endDayMdlSum;
		if(!buyCtSum) buyCtSum = new BigNumber(0);
		if(!sellDtSum) sellDtSum = new BigNumber(0);

		this.monthSum.buyCtSum = buyCtSum.plus(this.monthSum.buydt2411total).minus(this.monthSum.buyCtTotal);
		this.monthSum.sellDtSum = sellDtSum.plus(this.monthSum.sellDtTotal).minus(this.monthSum.sellCtTotal);
	}

	#makeCalculations() {
		for(const val of this.data) {
			const calc = new MonthCalculations();
			if(val.curday) {
				calc.dt2412Sum = val.curday?.creditSum.plus(val.dailyBalance.profit).plus(val.exchangeDiff.profit);
				calc.ct2412Sum = val.curday?.sellMdlSum.plus(val.dailyBalance.loss).plus(val.exchangeDiff.loss);
				calc.buyCtTotal = val.curday.creditSum.plus(val.curday.salary).plus(val.curday.bankPayment);
			}
			this.calculations.push(calc);
		}
	}	

	#calculateSum() {
		const sum = this.monthSum;
		for(const id in this.data) {
			const report = this.data[id];
			if(report.curday) {
				sum.buyDt2412 = this.monthSum.buyDt2412.add(report.curday.getSellMdlSum());
				sum.buyDt534 = this.monthSum.buyDt534.add(report.curday?.getComis());
				sum.buydt2411total = this.monthSum.buydt2411total.add(report.curday?.getDebitSum());
				
				sum.buyCt2412 = this.monthSum.buyCt2412.add(report.curday.getCreditSum());
				sum.buyCt2421 = sum.buyCt2421.add(report.curday.getBankPayment()); 
				sum.buyCt531 = sum.buyCt531.add(report.curday.getSalary()); 
				sum.buyCtTotal = sum.buyCtTotal.add(this.calculations[id].buyCtTotal);

				

				sum.sellDtCt2411 = sum.sellDtCt2411.plus(report.curday?.getCreditSum());
				sum.sellDt611 = sum.sellDt611.plus(report.dailyBalance.getProfit());
				sum.sellDt622 = sum.sellDt622.plus(report.exchangeDiff.getProfit())
				sum.sellDtTotal = sum.sellDtTotal.plus(this.calculations[id].dt2412Sum);

				sum.sellCtDt2411 = sum.sellCtDt2411.plus(report.curday?.getSellMdlSum());
				sum.sellCt711 = sum.sellCt711.plus(report.dailyBalance.getLoss());
				sum.sellCt722 = sum.sellCt722.plus(report.exchangeDiff.getLoss());
				sum.sellCtTotal = sum.sellCtTotal.plus(this.calculations[id].ct2412Sum);

				
			}
		}
	}
}