import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import "./turnoverGrid.scss"

import TurnoverDSFactory, {isNumeric} from "./TurnoveDSFactory";
import { useState, useEffect, useCallback } from 'react'

const colSettings = {draggable: false, textAlign: 'center', sortable:true, defaultFlex: 1, editable:true};

const columns = [
	{ name: 'id', header: 'Id', defaultVisible: false, minWidth: 100, type: 'number' },
	{ name: 'name', header: '', group: "currency", ...colSettings, editable: false},
	{ name: 'startDayNominal', header: 'inNominal', group: 'startDay',  ...colSettings},
	{ name: 'startDayMdl', header: 'inMDL', group: 'startDay', ...colSettings},
	{ name: 'buyNominal', header: 'inNominal', group: 'buy',  ...colSettings},
	{ name: 'buyMdl', header: 'inMDL', group: 'buy', ...colSettings},
	{ name: 'sellNominal', header: 'inNominal', group: 'sell', ...colSettings},
	{ name: 'sellMdl', header: 'inMDL', group: 'sell', ...colSettings},
	{ name: 'endDayNominal', header: 'inNominal', group: 'endDay', ...colSettings},
	{ name: 'endDayMdl', header: 'inMDL', group: 'endDay', ...colSettings},
]

const gridStyle = { height: '100%' }
  
const TurnoverGrid = ({paymentOrder, onChangeData})=> {
	console.log("InovuaGrid Render");
	const [data, setDataSource] = useState(()=> {
		const factory = new TurnoverDSFactory();
		return factory.createDataSource(paymentOrder);
	});

	useEffect(() => {
		if(paymentOrder) {
			const factory = new TurnoverDSFactory();
			const datasource = factory.createDataSource(paymentOrder);
			setDataSource(datasource);
			console.log("set displayed data from grid");
		}
	}, [paymentOrder])

	const onEditComplete = useCallback(({ value, columnId, rowId }) => {
		if (value !== undefined) {
			let newValue = value.toString().replace(",", ".");
		
			console.log(newValue);
			console.log(columnId);
			console.log(rowId);
			
			if(newValue === "") {
				newValue = "0";
			}
			if(data[rowId].hasOwnProperty(columnId) && isNumeric(newValue)) {
				const number = parseFloat(newValue);
				data[rowId][columnId] = number;
				const factory = new TurnoverDSFactory();
				const response = factory.createResponseObject(data, paymentOrder);
				console.log("On edit compleate");
				console.log(response);

				onChangeData(response);
			}
		}
	  }, [data])

	return (
		<div>
			<div className="displayData">{paymentOrder.date}</div>
			<ReactDataGrid
			idProperty="id"
			style={gridStyle}
			columns={columns}
			onEditComplete={onEditComplete}
			dataSource={data}
			showColumnMenuTool={false}
			/>
	  </div>
	)
}

export default TurnoverGrid;