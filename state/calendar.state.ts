import { atom } from "jotai";
import { DayData } from "../lib/asyncStorage";
import moment from "moment";

const dayDataAtom = atom<DayData | null>(null);

export const dataAtom = atom(
  (get) => get(dayDataAtom),
  (get, set, newData: DayData) => {
    set(dayDataAtom, newData);
  }
);

const date = moment().format("dddd DD.MM.YYYY");

const selectedDay = atom<string | null>(date);

export const selectedDayAtom = atom(
  (get) => get(selectedDay),
  (get, set, newData: string) => {
    set(selectedDay, newData);
  }
);

const workDays = atom<{}>({});

export const workDaysAtom = atom(
  (get) => get(workDays),
  (get, set, newData: any) => {
    set(workDays, newData);
  }
);
