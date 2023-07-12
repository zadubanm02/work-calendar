import React, { useEffect, useState } from "react";
import {
  WorkWeek,
  calculateWorkDays,
  deleteNoteForDay,
  getDataForDate,
  getWorkDates,
  resetAllWorkDays,
  storeWorkDates,
} from "../lib/asyncStorage";
import moment from "moment";
import { useAtom } from "jotai";
import {
  dataAtom,
  selectedDayAtom,
  workDaysAtom,
} from "../state/calendar.state";

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
  const [selectedDate, setSelectedDate] = useAtom(selectedDayAtom);
  const [workDays, setWorkDays] = useAtom(workDaysAtom);

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

  const saveWorkWeeks = (workWeek: WorkWeek) => {
    const dates = calculateWorkDays(workWeek);
    return storeWorkDates(dates).then((data) => {
      return setWorkDays(data);
    });
  };

  const handleDelete = (note: string) => {
    deleteNoteForDay(selectedDate as string, note).then(() => {
      getDataForDate(selectedDate as string).then((data) => {
        setData(data);
      });
    });
  };

  const loadWorkDays = async () => {
    const data = await getWorkDates();
    setWorkDays(data);
  };

  const deleteAll = () => {
    return resetAllWorkDays().then(() => {
      setWorkDays({});
    });
  };

  return {
    workDays,
    selectedDate,
    setSelectedDate,
    isSelected,
    saveWorkWeeks,
    deleteAll,
    handleDaySelect,
    handleDelete,
  };
};
