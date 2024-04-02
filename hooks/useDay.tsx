import { useEffect } from "react";
import {
  DayData,
  getDataForDate,
  saveNoteToDay,
  saveTimeToDay,
} from "../lib/asyncStorage";
import { useAtom, useAtomValue } from "jotai";
import { dataAtom, selectedDayAtom } from "../state/calendar.state";

export const useDay = () => {
  const [data, setData] = useAtom(dataAtom);
  const selectedDate = useAtomValue(selectedDayAtom);
  useEffect(() => {
    getDataForDate(selectedDate as string).then((data) => {
      setData(data);
    });
  }, []);

  const handleAddNote = async (date: string, note: string) => {
    await saveNoteToDay(date, note);
    return getDataForDate(selectedDate as string).then((data) => {
      setData(data);
    });
  };

  const handleTimeChange = (date: string, time: string) => {
    return saveTimeToDay(date, time).then(() => {
      getDataForDate(selectedDate as string).then((data) => {
        setData(data);
      });
    });
  };

  return {
    data,
    selectedDate,
    handleAddNote,
    handleTimeChange,
  };
};
