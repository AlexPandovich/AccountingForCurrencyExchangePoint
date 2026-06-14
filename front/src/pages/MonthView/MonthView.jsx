import "./monthView.scss"
import { LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ru } from "date-fns/locale";
import MonthlyGridReport from "../../components/MonthlyGridReport/MonthlyGridReport";
import { useState } from "react";
import useFetchBaseOrderData from "../../hooks/useFetchBaseOrderData";
import TurnoverRawStorage from "../../model/rawData/TurnoverRawStorage";
import MonthDataStorage from "../../model/monthReport/MonthDataStorage";
import useCreateMonthData from "../../hooks/useCreateMonthData";


function MonthView() {
	const [selectedMonth, setSelectedMonth] = useState(new Date());
	const [rawDataStorage, setRawDataStorage] = useState(new TurnoverRawStorage());
	const [monthDataStorage, setMonthDataStorage] = useState(new MonthDataStorage());

	useFetchBaseOrderData(selectedMonth, rawDataStorage, setRawDataStorage);
	useCreateMonthData(rawDataStorage, selectedMonth, setMonthDataStorage);

	const onChangeMonth = (newValue) => {
		console.log(newValue);
		setSelectedMonth(newValue);
	}

	return ( 
		<div className="container">
			<div className="month_selector">
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
				<DatePicker label={'"Месяц" и "Год"'} views={['month', 'year']} value={selectedMonth} onChange={onChangeMonth} />
			</LocalizationProvider>
			
			</div>
			<div className="dailyGrid">
				<MonthlyGridReport monthDataStorage={monthDataStorage}/>
			</div>
		</div>
	 );
}

export default MonthView;