import React, { useEffect, useState } from "react";
import {
  WorkWeek,
  calculateWorkDays,
  getWorkDates,
  resetAllWorkDays,
  storeWorkDates,
} from "../lib/asyncStorage";

export const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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

  //   useEffect(() => {

  //   }, [])

  return {
    workDays,
    selectedDate,
    setSelectedDate,
    isSelected,
    saveWorkWeeks,
    deleteAll,
  };
};
