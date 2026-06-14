import MonthDataStorage from "../../model/monthReport/MonthDataStorage";
import format from 'date-fns/format'

export default class MonthDatasourceFactory {

	createDataSource(monthDataStorage:MonthDataStorage) {
		let dataSource:any = [];
		this.#fillData(monthDataStorage, dataSource);
		this.#fillTotal(monthDataStorage, dataSource);
		
		return dataSource;
	}

	#formatDate(date:string|undefined) {
		let result = "";

		if(date) 
			result = format(new Date(date),"MM-dd");

		return result;
	}

	#fillData(monthDataStorage:MonthDataStorage, dataSource:any = []) {
		if(monthDataStorage && monthDataStorage.data) {
			for(const id in monthDataStorage.data) {
				const val = monthDataStorage.data[id];

				dataSource.push({
					"date": this.#formatDate(val.curday?.date),
					"buyDt241.2": val.curday?.getSellMdlSum(),
					'buyDt534': val.curday?.getComis(),
					'buydt241.1total': val.curday?.getDebitSum(),

					'buyCt241.2' : val.curday?.getCreditSum(),
					///add salary 
					'buyCt242.1' : val.curday?.getBankPayment(),
					// add bank payment
					'buyCt531' : val.curday?.getSalary(),
					'buyCtTotal' : monthDataStorage.calculations[id].buyCtTotal.toNumber(), ///calculate sum 

					'buyCtSum' : val.curday?.getEndDayMdl(), 

					'sellDtCt241.1': val.curday?.getCreditSum(),
					'sellDt611' : val.dailyBalance.getProfit(),
					'sellDt622' : val.exchangeDiff.getProfit(),
					'sellDtTotal' : monthDataStorage.calculations[id].dt2412Sum.toNumber(),

					'sellCtDt241.1' : val.curday?.getSellMdlSum(),
					'sellCt711' : val.dailyBalance.getLoss(),
					"sellCt722" : val.exchangeDiff.getLoss(),
					'sellCtTotal': monthDataStorage.calculations[id].ct2412Sum.toNumber(),
					
					"sellDtSum": val.curday?.getEndDayMdlSum() ///calculate sum 
				})
			}
		}
		return dataSource;
	}

	#fillTotal(monthDataStorage:MonthDataStorage, dataSource:any = []) {
		const monthSum = monthDataStorage.monthSum;
		dataSource.push({ });
		dataSource.push({
			"date": "Total",
			"buyDt241.2": monthSum.buyDt2412.toNumber(),
			'buyDt534': monthSum.buyDt534.toNumber(),
			'buydt241.1total': monthSum.buydt2411total.toNumber(),

			'buyCt241.2' : monthSum.buyCt2412.toNumber(),
			// ///add salary 
			'buyCt242.1' : monthSum.buyCt2421.toNumber(),
			// // add bank payment
			'buyCt531' : monthSum.buyCt531.toNumber(),
			'buyCtTotal' : monthSum.buyCtTotal.toNumber(),
			'buyCtSum' : monthSum.buyCtSum.toNumber(), //calculate sum 

			'sellDtCt241.1': monthSum.sellDtCt2411.toNumber(),
			'sellDt611' : monthSum.sellDt611.toNumber(),
			'sellDt622' : monthSum.sellDt622.toNumber(),
			'sellDtTotal' : monthSum.sellDtTotal.toNumber(),

			'sellCtDt241.1' : monthSum.sellCtDt2411.toNumber(),
			'sellCt711' : monthSum.sellCt711.toNumber(),
			"sellCt722" : monthSum.sellCt722.toNumber(),
			'sellCtTotal': monthSum.sellCtTotal.toNumber(),
						
			"sellDtSum": monthSum.sellDtSum.toNumber()
		})
	}
}