import { useEffect, useState } from "react";
import {
  DayData,
  getDataForDate,
  saveNoteToDay,
  saveTimeToDay,
} from "../lib/asyncStorage";
import { useCalendar } from "./useCalendar";

export const useDay = () => {
  const { selectedDate } = useCalendar();
  const [selectedDayData, setSelectedDayData] = useState<DayData | null>(null);
  useEffect(() => {
    getDataForDate(selectedDate).then((data) => {
      setSelectedDayData(data);
    });
  }, []);

  const handleAddNote = async (date: string, note: string) => {
    await saveNoteToDay(date, note);
    return getDataForDate(selectedDate).then((data) => {
      setSelectedDayData(data);
    });
  };

  const handleTimeChange = (date: string, time: string) => {
    console.log("USEDAY", date, time);
    return saveTimeToDay(date, time).then(() => {
      getDataForDate(selectedDate).then((data) => {
        setSelectedDayData(data);
      });
    });
  };

  return {
    selectedDayData,
    selectedDate,
    handleAddNote,
    handleTimeChange,
  };
};
