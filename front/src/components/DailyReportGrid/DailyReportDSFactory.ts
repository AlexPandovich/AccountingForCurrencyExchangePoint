import { DailyReport } from "../../model/dailyReport/DailyReport";
import BigNumber from "bignumber.js";

export default class DailyReportDataSourceFactory {
	public static createDataSource(report:DailyReport) {
		let dataSource = [];
		const exRate = this.prepareExchangeRateDiff(report);
		const currencies = this.preapareCurrencies(report, exRate.length);
		const total = this.prepareTotal(report, exRate.length + currencies.length);
		dataSource = [
			...exRate,
			...currencies,
			...total
		]

		console.log("createDataSource")
		return dataSource;
	}

	private static prepareTotal(report:DailyReport, length:number) {
		let dataSource = [];
		dataSource.push({

		});
		
		dataSource.push({
			id:length,
			name: "Total",
			622: report.exchangeDiff.profit.toNumber(),
			611: report.dailyBalance.profit.toNumber(),
			711: report.dailyBalance.loss.toNumber(),
			722: report.exchangeDiff.loss.toNumber()
		})
		return dataSource;
	}
	private static prepareExchangeRateDiff(report:DailyReport) {
		let dataSource = [];
		if(report) {
			dataSource.push({
				id:0,
				name: report.prevDay ? report.prevDay.getDate() : "нету",
				mdl: report.getPrevDayMdl()
			})

			dataSource.push({
				id:1,
				name: report.curday? report.curday?.getDate() : "нету",
				mdl: report.getCurDayMdl(),

				622: report.exchangeDiff.profit.toNumber(),
				722: report.exchangeDiff.loss.toNumber()

			})
			dataSource.push ({

			})
		}
		return dataSource;
	}
	
	private static preapareCurrencies(report:DailyReport, length:number) {
		let dataSource:any = [];
		let startIndex = length;

		if(report) {
			report.balanceBuyMap.forEach((value, key) => {
				dataSource.push({
					id:startIndex,
					name: `(${report.commercialExRateMap.get(key)?.buy.toNumber()}) Покупка ${key} комерческий`,
					nominal: report.getBuyNominal(key),
					mdl: report.getBuyMdl(key),
					611: report.getBuyProfit(key),
					711: report.getBuyLoss(key)
				})
				startIndex++;

				const op = report.curday?.getOperation(key);
				const rate:number|undefined = report?.curday?.getNbRate(key);

				if(rate) {
					const nbSum = op?.buyNominal.mul(new BigNumber(rate)).toNumber();
					dataSource.push({
						id:startIndex,
						name:`(${report.curday?.getNbRate(key)}) официальный`,
						nominal: op?.getBuyNominal(),
						mdl: nbSum
					})

					startIndex++;
				}
			
			})

			dataSource.push({});
			startIndex++;

			report.balanceSellMap.forEach((value, key) => {
				dataSource.push({
					id:startIndex,
					name: `(${report.commercialExRateMap.get(key)?.sell.toNumber()}) Продажа ${key} комерческий`,
					nominal: report.getSellNominal(key),
					mdl: report.getSellMdl(key),
					611: report.getSellProfit(key),
					711: report.getSellLoss(key)
				})
				startIndex ++;
				const op = report.curday?.getOperation(key);
				const rate:number|undefined = report?.curday?.getNbRate(key);
				
				if(rate) {
					const nbSum = op?.sellNominal.mul(new BigNumber(rate)).toNumber();
					dataSource.push({
						id:startIndex,
						name:`(${report.curday?.getNbRate(key)}) Официальный`,
						nominal: op?.getSellNominal(),
						mdl: nbSum
					})
					startIndex++;
				}
			})
		}
		return dataSource;
	}
}