import TurnoverBaseOperations from "./TurnoverBaseOperations";

export default class TurnoverReportBaseData {
	date: string = "";
	tax: number = 0.001;
	mdl: number = 0;
	operations: Array<TurnoverBaseOperations> = [];
	bankPayment: number = 0;
	salary: number = 0;
}