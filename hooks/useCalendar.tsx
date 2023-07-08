import React, { useEffect, useState } from "react";
import {
  WorkWeek,
  calculateWorkDays,
  getDataForDate,
  getWorkDates,
  resetAllWorkDays,
  storeWorkDates,
} from "../lib/asyncStorage";
import moment from "moment";
import { useAtom } from "jotai";
import { dataAtom, selectedDayAtom } from "../state/calendar.state";

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
  const date = moment().format("dddd DD.MM.YYYY");
  const [selectedDate, setSelectedDate] = useAtom(selectedDayAtom);
  const [workDays, setWorkDays] = useState<{}>({});
  const [workWeek, setWorkWeek] = useState<WorkWeek>(WorkWeek.Short);

  const [data, setData] = useAtom(dataAtom);

  const isSelected = (date: string) => {
    return date === selectedDate;
  };

  const handleDaySelect = (date: string) => {
    setSelectedDate(date);
    getDataForDate(date).then((data) => {
      setData(data);
    });
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

  // useEffect(() => {
  //   console.log()
  // }, [selectedDate]);

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
    handleDaySelect,
  };
};
