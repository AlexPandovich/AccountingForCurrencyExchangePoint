import { DailyReport } from "../dailyReport/DailyReport";
import BigNumber from "bignumber.js";

export default class DailyReportPdfFactory {
	private static generateExchRateDiff(report:DailyReport):Array<Array<string>> {
		let result:Array<Array<string>> = [];
		if(report) {
			let tmp:Array<string>= [];
			tmp.push(report.prevDay ? report.prevDay.getDate() : "нету");
			tmp.push("");
			tmp.push(String(report.getPrevDayMdl()));
			result.push(tmp);

			tmp = [];
			tmp.push(report.curday? report.curday?.getDate() : "нету");
			tmp.push("");
			tmp.push(String(report.getCurDayMdl()));
			tmp.push(String(report.exchangeDiff.profit.toNumber()));
			tmp.push("");
			tmp.push("");
			tmp.push(String(report.exchangeDiff.loss.toNumber()));

			result.push(tmp);
		}
		result.push([]);

		return result;
	}

	private static generateCurrencies(report:DailyReport):Array<Array<string>> {
		let result:Array<Array<string>> = [];

		report.balanceBuyMap.forEach((value, key) => {
			result.push([
				`(${report.commercialExRateMap.get(key)?.buy.toNumber()}) incasari ${key}`,
				String(report.getBuyNominal(key)),
				String(report.getBuyMdl(key)),
				"",
				String(report.getBuyProfit(key)),
				String( report.getBuyLoss(key))
			])

			const op = report.curday?.getOperation(key);
			const rate:number|undefined = report?.curday?.getNbRate(key);
			if(rate) {
				const nbSum = op?.buyNominal.mul(new BigNumber(rate)).toNumber();
				result.push([
					`(${report.curday?.getNbRate(key)}) official`,
					String(op?.getBuyNominal()),
					String(nbSum)
				])
			}
		})

		if(report.balanceSellMap.size)
			result.push([]);
		
		report.balanceSellMap.forEach((value, key) => {
			
			result.push([
				`(${report.commercialExRateMap.get(key)?.sell.toNumber()}) plati ${key}`,
				 String(report.getSellNominal(key)),
				 String(report.getSellMdl(key)),
				 "",
				 String(report.getSellProfit(key)),
				 String(report.getSellLoss(key))
			])
			const op = report.curday?.getOperation(key);
			const rate:number|undefined = report?.curday?.getNbRate(key);
			
			if(rate) {
				const nbSum = op?.sellNominal.mul(new BigNumber(rate)).toNumber();
				result.push([
					`(${report.curday?.getNbRate(key)}) oficial`,
					String(op?.getSellNominal()),
					String(nbSum)
				])
			}
		})

		return result;
	}
	private static generateTotal(report:DailyReport):Array<Array<string>> {
		let result:Array<Array<string>> = [];
		result.push([]);

		result.push([
			"Total",
			"",
			"",
			String(report.exchangeDiff.profit.toNumber()),
			String(report.dailyBalance.profit.toNumber()),
			String(report.dailyBalance.loss.toNumber()),
			String(report.exchangeDiff.loss.toNumber())
		])

		return result;
	}

	public static generateBody(report: DailyReport) {
		let result:Array<Array<string>> = [];
	    const exRate = this.generateExchRateDiff(report);
		const currencies = this.generateCurrencies(report);
		const total = this.generateTotal(report);

		result = [
			...exRate,
			...currencies,
			...total
		];

		return result;
	}
}