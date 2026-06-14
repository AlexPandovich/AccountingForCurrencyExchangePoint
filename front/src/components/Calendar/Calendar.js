import { addDays, differenceInCalendarDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import {Calendar as ReactCalendar} from 'react-calendar';
import { useMemo, useState } from 'react';
import "./calendar.scss";
import axios from 'axios';
import { toLocalIsoString } from '../../utils/DateUtils';


const Calendar = ({date, onChange, loadedDaysMap})=> {
	const formatter = new Intl.DateTimeFormat('ru', { month: 'short' });
	const month1 = formatter.format(new Date());
	const month2 = formatter.format(new Date(2003, 5, 12));
	console.log(`${month1} and ${month2}`); // current month in French and "juin".

	function tileClassName({ date, view }) {
		if (view === 'month' && loadedDaysMap) {
			const dateStr = toLocalIsoString(date);
			if(loadedDaysMap.has(dateStr)) {
				return 'highlight';
			}
		}
	}

	return (
		<div className="calendar">
		<ReactCalendar 
		  locale='RU'
		  onChange={onChange} 
		  value={date}
		  tileClassName={tileClassName} 
		/>
	  </div>
	)
}

export default Calendar;