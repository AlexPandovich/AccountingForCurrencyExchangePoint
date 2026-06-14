import MonthDataStorage from "../../model/monthReport/MonthDataStorage";

const colSettings = {textAlign: 'center', editable:false, defaultFlex: 1, sortable:false};

export default class ColumnsFactory {
	static createColumns(monthDataStorage:MonthDataStorage) {
		let buyCtSum = monthDataStorage?.data[0]?.prevDay?.getEndDayMdl();
		let sellDtSum = monthDataStorage?.data[0]?.prevDay?.getEndDayMdlSum();

		let yearstr = monthDataStorage?.data[0]?.curday?.date;
		
		if(!buyCtSum) buyCtSum = 0;
		if(!sellDtSum) sellDtSum = 0;
		if(!yearstr) yearstr = "";

		const year = new Date(yearstr);

		const columns = [
			{ name: 'date', header: `${year.getFullYear()}`, ...colSettings},
		
			{ name: 'buyDt241.2', group: 'buyDt241.1', header: '241.2', ...colSettings },
			{ name: 'buyDt534', group: 'buyDt241.1', header: '534' , ...colSettings },
			{ name: 'buydt241.1total', group: 'buyDt241.1', header: 'Total' , ...colSettings },
		
			{ name: 'buyCt241.2', group: 'buyCt241.1', header: '241.2' , ...colSettings },
			{ name: 'buyCt242.1', group: 'buyCt241.1', header: '242.1 банк' , ...colSettings },
			{ name: 'buyCt531', group: 'buyCt241.1', header: '531 з/п' , ...colSettings },
			{ name: 'buyCtTotal', group: 'buyCt241.1', header: 'Total' , ...colSettings },
			{ name: 'buyCtSum', group: 'buy', header: `${buyCtSum}`, ...colSettings},
		
			{ name: 'sellDtCt241.1', group: 'sell6classDt', header: 'Ct 241.2' , ...colSettings },
			{ name: 'sellDt611', group: 'sell6classDt', header: '611' , ...colSettings },
			{ name: 'sellDt622', group: 'sell6classDt', header: '622' , ...colSettings },
			{ name: 'sellDtTotal', group: 'sell6classDt', header: 'Total' , ...colSettings },
		
			{ name: 'sellCtDt241.1', group: 'sell7сlassCt', header: 'Dt 241.1' , ...colSettings },
			{ name: 'sellCt711', group: 'sell7сlassCt', header: '711' , ...colSettings },
			{ name: 'sellCt722', group: 'sell7сlassCt', header: '722' , ...colSettings },
			{ name: 'sellCtTotal', group: 'sell7сlassCt', header: 'Total' , ...colSettings },
			{ name: 'sellDtSum', group: 'sell', header: `${sellDtSum}` , ...colSettings},
		]

		return columns
	}
}