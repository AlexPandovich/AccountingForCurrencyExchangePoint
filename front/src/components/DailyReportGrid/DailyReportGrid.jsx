import ReactDataGrid from '@inovua/reactdatagrid-community'
import { useMemo } from 'react';
import DailyReportFactory from "../../model/dailyReport/DailyReportFactory"
import {TurnoverReportData} from "../../model/turnoverReport/TurnoverReportData";
import { DailyReport } from '../../model/dailyReport/DailyReport';
import DailyReportDSFactory from './DailyReportDSFactory';
import "./dailyReportGrid.scss";

const gridStyle = { height: '100%' }

const colSettings = {textAlign: 'center', editable:false, defaultFlex: 1, sortable:false};

const columns = [
	{ name: 'id', header: 'Id', defaultVisible: false, minWidth: 100, type: 'number' },
	{ name: 'name', header: 'Operation', ...colSettings, defaultFlex:1.5},
	{ name: 'nominal', header: 'Nominal', ...colSettings},
	{ name: 'mdl', header: 'Mdl', ...colSettings},
	{ name: 'dummy', header: '', ...colSettings, defaultFlex: 0.2},
	{ name: '622', header: '622', ...colSettings},
	{ name: '611', header: '611', ...colSettings},
	{ name: '711', header: '711', ...colSettings},
	{ name: '722', header: '722', ...colSettings},

]

function DailyReportGrid({dailyTurnoverData}) {
	const datasource = useMemo(()=> {
		const factory = new DailyReportFactory();
		const report = factory.createDailyReport(dailyTurnoverData.today, dailyTurnoverData.prevDay);
		return  DailyReportDSFactory.createDataSource(report);

	}, [dailyTurnoverData])

	return (
		<ReactDataGrid
		idProperty="id"
		style={gridStyle}
		columns={columns}
		editable={true}
		rowReorderColumn = {false}
		dataSource={datasource}
		showColumnMenuTool={false}
	  />
	)
}

export default DailyReportGrid;