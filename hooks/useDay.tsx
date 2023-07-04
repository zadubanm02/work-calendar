import { useEffect, useState } from "react";
import { getNotesForDate } from "../lib/asyncStorage";
import { useCalendar } from "./useCalendar";

export const useDay = () => {
  const { selectedDate } = useCalendar();
  const [selectedDayData, setSelectedDayData] = useState<any>(null);
  useEffect(() => {
    getNotesForDate(selectedDate).then((data) => {
      setSelectedDayData(data);
    });
  }, []);

  return {
    selectedDayData,
    selectedDate,
  };
};
