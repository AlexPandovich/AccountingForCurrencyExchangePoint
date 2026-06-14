import { BrowserRouter, Link, Route, Routes, Navigate} from "react-router-dom";
import DailyView from "../pages/DailyView/DailyView";
import MonthView from "../pages/MonthView/MonthView";

function AppRouter() {
	return (          
	<Routes>
		<Route element={<DailyView/>} path ="/"/>
		<Route element={<MonthView/>} path="/month"/>
		<Route path="*" element={<Navigate replace to="/"/>}/>
	</Routes>  );
}

export default AppRouter;