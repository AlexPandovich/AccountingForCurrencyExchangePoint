import "./dailyView.scss";
import Calendar from "../../components/Calendar/Calendar.js";
import TurnoverGrid from "../../components/TurnoverGrid/TurnoverGrid";
import { useState } from "react";
import axios from "axios";
import { today, toLocalIsoString } from "../../utils/DateUtils";
import useFetchBaseOrderData from "../../hooks/useFetchBaseOrderData";
import useCreateTurnoverData from "../../hooks/useCreateTurnoverData";
import TurnoverRawStorage from "../../model/rawData/TurnoverRawStorage";
import TurnoverReportData from "../../model/turnoverReport/TurnoverReportData";
import MyModal from "../../components/MyModal/MyModal";
import DailyReportGrid from "../../components/DailyReportGrid/DailyReportGrid";
import { TurnoverReport } from "../../model/turnoverReport/TurnoverReport";

function DailyView() {
  const [pickedDate, setPickedDate] = useState(() => today());
  const [rawDataStorage, setRawDataStorage] = useState(
    new TurnoverRawStorage(),
  );
  const [dailyTurnoverData, setDailyTurnoverData] = useState(
    new TurnoverReportData(new TurnoverReport(), new TurnoverReport()),
  );

  const [dailyReportVisible, setDailyReportVisible] = useState(false);

  // Load Base Order Data
  useFetchBaseOrderData(pickedDate, rawDataStorage, setRawDataStorage);
  // Make Calculations
  useCreateTurnoverData(rawDataStorage, pickedDate, setDailyTurnoverData);

  const onChangeTurnoverData = (changedOrder) => {
    let newDataStorage = { ...rawDataStorage };
    newDataStorage.map.set(pickedDate, changedOrder);

    setRawDataStorage(newDataStorage);
  };

  const saveReport = () => {
    const rawData = dailyTurnoverData.today.rawData;
    if (rawData) {
      const url = "http://localhost:8080/report/upsert";
      console.log("save raw data");

      axios.post(url, rawData).then((result) => {});

      const newDataStorage = { ...rawDataStorage };
      newDataStorage.map.set(rawData.date, rawData);

      setRawDataStorage(newDataStorage);
    }
  };

  const onChangePickedDate = (newDate) => {
    saveReport();
    setPickedDate(toLocalIsoString(newDate));
  };

  return (
    <div className="dailyView">
      <aside className="menu">
        <Calendar
          date={pickedDate.current}
          onChange={onChangePickedDate}
          loadedDaysMap={rawDataStorage.map}
        />
      </aside>
      <div className="dailyGrid">
        <div className="grid">
          <TurnoverGrid
            paymentOrder={dailyTurnoverData.today}
            onChangeData={onChangeTurnoverData}
          />
        </div>

        <MyModal
          visible={dailyReportVisible}
          setVisible={setDailyReportVisible}
        >
          <DailyReportGrid
            className="reportgrid"
            dailyTurnoverData={dailyTurnoverData}
          />
        </MyModal>

        <div className="buttons">
          <button onClick={saveReport}>Сохранить</button>
          <button onClick={() => setDailyReportVisible(true)}>
            Отчет за день
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailyView;
