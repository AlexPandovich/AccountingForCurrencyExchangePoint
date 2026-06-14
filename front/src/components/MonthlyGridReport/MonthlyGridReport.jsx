import ReactDataGrid from '@inovua/reactdatagrid-community'
import { useMemo } from 'react';
import MonthDatasourceFactory from "./MonthDatasourceFactory"
import ColumnsFactory from "./ColumnsFactory"
import jsPDF from "jspdf";
import PdfBuilder from "../../model/pdf/PdfBuilder";
import "./monthlyGridReport.scss"

const gridStyle = { height: '100%', width: '98%',  margin: "0 auto"}

const groups= [
	
	{ name: 'buy', header: 'Покупка 241.1'},
	{ name: 'buyDt241.1', group: 'buy', header: 'Dt 241.1' },
	{ name: 'buyCt241.1', group: 'buy', header: 'Ct 241.1' },


	{ name: 'sell', header: 'Продажа 241.2'},
	{ name: 'sell6classDt', group: 'sell', header: 'Dt241.2  - 6 Клас' },
	{ name: 'sell7сlassCt', group: 'sell', header: 'Credit 241.2 - 7 клас' },
	
]

function createPdf(monthDataStorage) {
	const doc = new jsPDF();
	doc.deletePage(doc.getNumberOfPages());
	PdfBuilder.buildMonthReport(monthDataStorage, doc)
	PdfBuilder.buildEveryDayReports(monthDataStorage, doc);
	
	doc.save("отчет.pdf");
}

function MonthlyGridReport({monthDataStorage}) {
	const datasource = useMemo(()=> {
		const factory = new MonthDatasourceFactory();
		return factory.createDataSource(monthDataStorage);
		
	}, [monthDataStorage])
	const columns = useMemo(()=> {
		return ColumnsFactory.createColumns(monthDataStorage);
	}, [monthDataStorage])
	
	return (
		<div className='monthlyContainer'>
			<ReactDataGrid
			idProperty="id"
			style={gridStyle}
			columns={columns}
			editable={false}
			rowReorderColumn = {false}
			groups={groups}
			dataSource={datasource}
			showColumnMenuTool={false}
		/>
		<div className='buttonContainer'>
			<button onClick={()=>createPdf(monthDataStorage)}>Создать PDF</button>
		</div>
	  </div>
	)
}

export default MonthlyGridReport;