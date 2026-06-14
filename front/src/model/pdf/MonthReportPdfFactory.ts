import MonthDataStorage from "../monthReport/MonthDataStorage";
import format from 'date-fns/format'

export default class MonthReportPdfFactory {
	private static  formatDate(date:string|undefined) {
		let result = "";

		if(date) 
			result = format(new Date(date),"MM-dd");

		return result;
	}

	public static generateCreditHeader(monthDataStorage:MonthDataStorage): Array<Array<any>>{

		let buyCtSum = monthDataStorage?.data[0]?.prevDay?.getEndDayMdl();
				let yearstr = monthDataStorage?.data[0]?.curday?.date;
		
		if(!buyCtSum) buyCtSum = 0;
		if(!yearstr) yearstr = "";

		const year = new Date(yearstr);

		let result:Array<Array<any>> = [
			[
				{
					content: `${year.getFullYear()}`,
					rowSpan: 3
				},
				{
					content: 'Incasari',
				 	colSpan: 8
				},
			],
			[
				{
					content:"Dt 241.1",
					colSpan: 3
				},
				{
					content:"Ct 241.1",
					colSpan:4
				},
				{
					content:`${buyCtSum}`,
					rowSpan:2
				}
			],
			[
				"241.1",
				"534",
				"total",
				"Dt241.2",
				"242.1",
				"531",
				"total"
			]
		];

		return result;
	}
	public static generateCreditBody(monthDataStorage:MonthDataStorage):Array<Array<string>> {
		let result:Array<Array<string>> = [];

		if(monthDataStorage && monthDataStorage.data) {
			for(const id in monthDataStorage.data) {
				const val = monthDataStorage.data[id];

				result.push([
					this.formatDate(val.curday?.date),
					String(val.curday?.getSellMdlSum()),
					String(val.curday?.getComis()),
					String(val.curday?.getDebitSum()),

					String( val.curday?.getCreditSum()),
					///add salary 
					String(val.curday?.getBankPayment()),
					// add bank payment
					String(val.curday?.getSalary()),
					String(monthDataStorage.calculations[id].buyCtTotal.toNumber()), ///calculate sum 

					String(val.curday?.getEndDayMdl()) 
				])
			}
			this.generateCreditTotal(monthDataStorage, result);
		}

		return result;
	}
	public static generateCreditTotal(monthDataStorage:MonthDataStorage, result:Array<Array<string>>) {
		const monthSum = monthDataStorage.monthSum;
		result.push([]);

		result.push([
			"Total",
			String(monthSum.buyDt2412.toNumber()),
			String(monthSum.buyDt534.toNumber()),
			String(monthSum.buydt2411total.toNumber()),

			String(monthSum.buyCt2412.toNumber()),
			// ///add salary 
			String(monthSum.buyCt2421.toNumber()),
			// // add bank payment
			String(monthSum.buyCt531.toNumber()),
			String(monthSum.buyCtTotal.toNumber()),
			String(monthSum.buyCtSum.toNumber()), 
		])
	}

	public static generateDebitHeader(monthDataStorage:MonthDataStorage): Array<Array<any>>{
		let sellDtSum = monthDataStorage?.data[0]?.prevDay?.getEndDayMdlSum();
		let yearstr = monthDataStorage?.data[0]?.curday?.date;
		
		if(!sellDtSum) sellDtSum = 0;
		if(!yearstr) yearstr = "";

		const year = new Date(yearstr);

		let result:Array<Array<any>> = [
			[
				{
					content: `${year.getFullYear()}`,
					rowSpan: 3
				},
				{
					content: 'Plati',
				 	colSpan: 9
				},
			],
			[
				{
					content:"Dt 241.2 - 6 class",
					colSpan: 4
				},
				{
					content:"Ct 241.2 - 7 class",
					colSpan:4
				},
				{
					content:`${sellDtSum}`,
					rowSpan:2
				}
			],
			[
				"Ct241.2",
				"611",
				"622",
				"Total",

				"dt241.1",
				"711",
				"722",
				"Total"
			]
		];

		return result;
	}
	public static generateDebigBody(monthDataStorage:MonthDataStorage):Array<Array<string>> {
		let result:Array<Array<string>> = [];
		if(monthDataStorage && monthDataStorage.data) {
			for(const id in monthDataStorage.data) {
				const val = monthDataStorage.data[id];

				result.push([
					this.formatDate(val.curday?.date),
					
					String(val.curday?.getCreditSum()),
					String(val.dailyBalance.getProfit()),
					String(val.exchangeDiff.getProfit()),
					String(monthDataStorage.calculations[id].dt2412Sum.toNumber()),

					String(val.curday?.getSellMdlSum()),
					String(val.dailyBalance.getLoss()),
					String(val.exchangeDiff.getLoss()),
					String(monthDataStorage.calculations[id].ct2412Sum.toNumber()),
					
					String(val.curday?.getEndDayMdlSum()) ///calculate sum 
				])
			}
			this.generateDebitTotal(monthDataStorage, result);
		}
		return result;
	}

	public static generateDebitTotal(monthDataStorage:MonthDataStorage, result:Array<Array<string>>) {
		const monthSum = monthDataStorage.monthSum;
		result.push([]);

		result.push([
			"Total",
			String( monthSum.sellDtCt2411.toNumber()),
			String( monthSum.sellDt611.toNumber()),
			String( monthSum.sellDt622.toNumber()),
			String( monthSum.sellDtTotal.toNumber()),

			String( monthSum.sellCtDt2411.toNumber()),
			String( monthSum.sellCt711.toNumber()),
			String( monthSum.sellCt722.toNumber()),
			String( monthSum.sellCtTotal.toNumber()),
						
			String( monthSum.sellDtSum.toNumber())
		])
	}
}