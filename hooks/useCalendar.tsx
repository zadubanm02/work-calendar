import React, { useEffect, useState } from "react";
import {
  WorkWeek,
  calculateWorkDays,
  getWorkDates,
  resetAllWorkDays,
  storeWorkDates,
} from "../lib/asyncStorage";
import moment from "moment";

export const useCalendar = () => {
  moment.updateLocale("sk", {
    months: [
      "Január",
      "Február",
      "Marec",
      "Apríl",
      "Máj",
      "Jún",
      "Júl",
      "August",
      "September",
      "Október",
      "November",
      "December",
    ],
    days: [
      "Pondelok",
      "Utorok",
      "Streda",
      "Štrvtok",
      "Piatok",
      "Sobota",
      "Nedeľa",
    ],
  });
  moment.locale("sk");

  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("dddd DD.MM.YYYY")
  );
  const [workDays, setWorkDays] = useState<{}>({});
  const [workWeek, setWorkWeek] = useState<WorkWeek>(WorkWeek.Short);

  const isSelected = (date: string) => {
    return date === selectedDate;
  };

  const saveWorkWeeks = async () => {
    const dates = calculateWorkDays(workWeek);
    const result = await storeWorkDates(dates);

    setWorkDays(result);
  };

  const loadWorkDays = async () => {
    const data = await getWorkDates();
    setWorkDays(data);
  };

  const deleteAll = async () => {
    await resetAllWorkDays();
  };

  return {
    workDays,
    selectedDate,
    setSelectedDate,
    isSelected,
    saveWorkWeeks,
    deleteAll,
  };
};
