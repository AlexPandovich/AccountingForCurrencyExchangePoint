import { useEffect} from "react";
import {TurnoverReportFactory} from "../model/turnoverReport/TurnoverReportFactory"
import {subDays} from "date-fns/esm";
import { toLocalIsoString } from "../utils/DateUtils";
import TurnoverRawStorage from "../model/rawData/TurnoverRawStorage";
import RawPaymentReport from "../model/rawData/TurnoverReportBaseData";
import MonthDataStorage from "../model/monthReport/MonthDataStorage";
import {startOfMonth, endOfMonth, isEqual, addDays, startOfDay} from "date-fns";
import {TurnoverReport} from "../model/turnoverReport/TurnoverReport";
import { DailyReport } from "../model/dailyReport/DailyReport";
import DailyReportFactory from "../model/dailyReport/DailyReportFactory";

function getLastDayInPrevMonth(currentDate:string, loadedDataMap:Map<string, RawPaymentReport>) {
	const maxLoadDays = 30;
	const factory = new TurnoverReportFactory();

	let startDate = startOfMonth(new Date(currentDate));
	let startDateStr = "";
	let rawData:RawPaymentReport|undefined = undefined;

	for(let i = 0; i < maxLoadDays && !rawData; ++i) {
		startDate = subDays(startDate, 1);
		startDateStr = toLocalIsoString(startDate);
		rawData = loadedDataMap.get(startDateStr);
	}
	console.log(rawData);
	let turnoverReport:TurnoverReport|undefined = undefined;

	if(rawData) {
		turnoverReport= factory.createTurnoverReport(rawData);
	}

	return turnoverReport;
}

function createCurMonthReports(currentDate:string, loadedDataMap:Map<string, RawPaymentReport>, dest:Array<DailyReport>, lastDay:TurnoverReport|undefined) {
	let startDate = startOfMonth(new Date(currentDate));
	const endDate = addDays(startOfDay(endOfMonth(new Date(currentDate))), 1);
	const factory = new TurnoverReportFactory();
	const dailyFactory = new DailyReportFactory();
	let prevDay = lastDay;

	while(!isEqual(startDate, endDate)) {
		const strDate = toLocalIsoString(startDate);
		const report:RawPaymentReport|undefined = loadedDataMap.get(strDate);
		if(report) {
			const turnoverReport = factory.createTurnoverReport(report);
			dest.push(dailyFactory.createDailyReport(turnoverReport, prevDay));
			prevDay = turnoverReport;
		}
		startDate = addDays(startDate, 1)
	}
}

export default function useCreateMonthData(turnoverStorage:TurnoverRawStorage, currentDate:string, setMonthStorage:any) {
	const effect = useEffect(()=> {
		console.log("create month report storage");

		if(turnoverStorage) {
			let monthStorage:MonthDataStorage = new MonthDataStorage();
			
			let lastDay:TurnoverReport|undefined = getLastDayInPrevMonth(currentDate, turnoverStorage.map);
			console.log(currentDate);

			createCurMonthReports(currentDate, turnoverStorage.map, monthStorage.data, lastDay);
			monthStorage.calculate();
			
			setMonthStorage(monthStorage);
		}
	}, [turnoverStorage]);

	return effect;
}