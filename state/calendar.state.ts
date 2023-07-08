import { atom } from "jotai";
import { DayData } from "../lib/asyncStorage";

const dayDataAtom = atom<DayData | null>(null);

export const dataAtom = atom(
  (get) => get(dayDataAtom),
  (get, set, newData: DayData) => {
    set(dayDataAtom, newData);
  }
);

const selectedDay = atom<string | null>(null);

export const selectedDayAtom = atom(
  (get) => get(selectedDay),
  (get, set, newData: string) => {
    set(selectedDay, newData);
  }
);
