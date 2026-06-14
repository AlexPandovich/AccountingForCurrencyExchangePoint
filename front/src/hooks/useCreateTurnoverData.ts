import { useEffect} from "react";
import {TurnoverReportFactory} from "../model/turnoverReport/TurnoverReportFactory"
import {subDays} from "date-fns/esm";
import { toLocalIsoString } from "../utils/DateUtils";
import TurnoverReportData from "../model/turnoverReport/TurnoverReportData";
import TurnoverBaseDataFactory from "../model/rawData/TurnoverBaseDataFactory";
import TurnoverRawStorage from "../model/rawData/TurnoverRawStorage";

function getPrevDayReport(currentDate:string, loadedDataMap:any) {
	const maxLoadDays = 30;

	let startDate = new Date(currentDate);
	let startDateStr = "";
	let result = undefined;

	for(let i = 0; i < maxLoadDays && !result; ++i) {
		startDate = subDays(startDate, 1);
		startDateStr = toLocalIsoString(startDate);
		result = loadedDataMap.get(startDateStr);
	}

	return result;
}

export default function useCreateTurnoverData (turnoverStorage:TurnoverRawStorage, currentDate:string, setPaymentOrder:any) {
	const effect = useEffect(()=> {
		console.log("useCreatePaymentOrder");

		if(turnoverStorage) {
			let prevDayRawData = getPrevDayReport(currentDate, turnoverStorage.map);
			let curDayRawData = turnoverStorage.map.get(currentDate);
			const factory = new TurnoverReportFactory();

			if(!prevDayRawData) {
				prevDayRawData = TurnoverBaseDataFactory.createEmptyBaseData("");
			}
			const prevDayReport = factory.createTurnoverReport(prevDayRawData);
			
			if(!curDayRawData) {
				curDayRawData = TurnoverBaseDataFactory.createEmptyBaseData(currentDate);
				TurnoverBaseDataFactory.loadData(curDayRawData, prevDayReport);//load data from prev day
			}
			
			const curdayReport =  factory.createTurnoverReport(curDayRawData);
			const turnoverReportData = new TurnoverReportData(curdayReport, prevDayReport);

			setPaymentOrder(turnoverReportData);
		}
	}, [turnoverStorage, currentDate]);

	return effect;
}