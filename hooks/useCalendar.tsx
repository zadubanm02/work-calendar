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
  //const [workDays, setWorkDays] = useState<{}>({});
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

  const saveWorkWeeks = (workWeek: WorkWeek) => {
    const dates = calculateWorkDays(workWeek);
    return storeWorkDates(dates).then((data) => {
      console.log("DATA", data);
      return setWorkDays(data);
    });
  };

  const handleDelete = (note: string) => {
    console.log("Deleting Note", note);
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

  // useEffect(() => {
  //   console.log()
  // }, [selectedDate]);

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
