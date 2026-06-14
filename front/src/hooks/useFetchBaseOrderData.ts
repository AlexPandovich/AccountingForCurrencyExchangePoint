import { useEffect } from "react";
import axios from "axios";
import {
  startOfMonth,
  subMonths,
  endOfMonth,
  addMonths,
  isAfter,
  isBefore,
} from "date-fns";
import { toLocalIsoString } from "../utils/DateUtils";
import TurnoverReportStorage from "../model/rawData/TurnoverRawStorage";

function needToLoadData(date: string, turnoverStorage: TurnoverReportStorage) {
  let result = false;
  const currentDate = new Date(date);
  if (turnoverStorage.from === "" || turnoverStorage.to === "") {
    /// first data load
    result = true;

    const startDate = startOfMonth(subMonths(currentDate, 1));
    const endDate = endOfMonth(addMonths(currentDate, 1));

    turnoverStorage.from = toLocalIsoString(startDate);
    turnoverStorage.to = toLocalIsoString(endDate);
  } else {
    const leftLimit = endOfMonth(new Date(turnoverStorage.from));
    const rightLimit = startOfMonth(new Date(turnoverStorage.to));

    if (isBefore(currentDate, leftLimit) || isAfter(currentDate, rightLimit)) {
      const startDate = startOfMonth(subMonths(currentDate, 1));
      const endDate = endOfMonth(addMonths(currentDate, 1));

      turnoverStorage.from = toLocalIsoString(startDate);
      turnoverStorage.to = toLocalIsoString(endDate);
      result = true;
    }
  }

  return result;
}

export default function useFetchBaseOrderData(
  date: string,
  turnoverStorage: TurnoverReportStorage,
  setRawOrderData: any,
) {
  useEffect(() => {
    if (needToLoadData(date, turnoverStorage)) {
      const url = `http://127.0.0.1:8080/report?start=${turnoverStorage.from}&end=${turnoverStorage.to}`;

      axios.get(url).then((res) => {
        console.log("receive data from server");
        if (res.data) {
          let newOrderData = new TurnoverReportStorage();
          newOrderData.from = turnoverStorage.from;
          newOrderData.to = turnoverStorage.to;

          console.log(res.data);
          console.log("size " + res.data.length);

          for (let item of res.data) {
            // console.log(item);
            // const strDate = item.date.split('T')[0];
            // const strDate = item.date;
            // item.date = strDate;

            newOrderData.map.set(item.date, item);
            // console.log(item.date);
          }

          setRawOrderData(newOrderData);
        } else {
          setRawOrderData(new TurnoverReportStorage());
        }
      });
    }
  }, [date]);
}
