import TurnoverReportBaseData from "./TurnoverReportBaseData";

export default class TurnoverRawStorage {
	from:string = "";
	to:string = "";
	map:Map<string, TurnoverReportBaseData> = new Map();
}