import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

type DataStruct = {
  [yearMonth: string]: string[];
};

/*
    Data structure like map
    onMonthChange load data for month
    {
        '2023-06': [
            2023-06-19,
            2023-06-20,
            2023-06-21,
            2023-06-24,
            2023-06-25,
        ],
         '2023-07': [
            2023-07-01,
            2023-07-06,
            2023-07-07,
        ],
    }
*/

export const storeWorkDatesAsMap = async (dataObject: DataStruct) => {
  try {
    for (const [yearMonth, dates] of Object.entries(dataObject)) {
      const datesData = JSON.stringify(dates);
      await AsyncStorage.setItem(yearMonth, datesData);
    }
  } catch (e) {
    throw new Error("Could not save work days");
  }
};

export const getWorkDaysAsMap = async (firstMonth: string) => {
  try {
    const months = getMonths(firstMonth);
    let finalData = {};
    months.forEach(async (month) => {
      const data = await AsyncStorage.getItem(month);
      finalData = { ...finalData, month: JSON.parse(data ?? "") };
    });
    return finalData;
  } catch (error) {
    throw new Error("Could not get dates");
  }
};

export const getWorkDatesForMonth = async (month: string) => {
  try {
    const data = await AsyncStorage.getItem(month);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    throw new Error(`Could not get dates for ${month}`);
  }
};

export const storeWorkDates = async (dates: string[]) => {
  try {
    await AsyncStorage.removeItem("workDays");
    const datesData = JSON.stringify(dates);
    await AsyncStorage.setItem("workDays", datesData);
    return transform(dates);
  } catch (e) {
    throw new Error("Could not save work days");
  }
};

export const getWorkDates = async (): Promise<{}> => {
  try {
    const data = await AsyncStorage.getItem("workDays");
    console.log("CALLING FROM ASYNC STORAGE", transform(JSON.parse(data)));

    return data ? transform(JSON.parse(data)) : [];
  } catch (error) {
    console.log("ERRRRR", error);
    throw new Error("Could not get dates");
  }
};

export const resetAllWorkDays = async () => {
  try {
    await AsyncStorage.removeItem("workDays");
  } catch (error) {
    throw new Error("Could not reset");
  }
};

export const resetWorkDays = async (firstMonth: string) => {
  const months = getMonths(firstMonth);
  try {
    await AsyncStorage.multiRemove(months);
  } catch (e) {
    // remove error
    throw new Error("Could not reset calendar");
  }
};

const getMonths = (firstMonth: string): string[] => {
  let finalMonths: string[] = [];
  let year = parseInt(firstMonth.split("-")[0]);
  let month: number = parseInt(firstMonth.split("-")[1]);
  for (let i = 0; i < 12; i++) {
    if (month >= 12) {
      month = 1;
      finalMonths.push(`${year + 1}-${month}`);
    } else {
      finalMonths.push(`${year}-${month}`);
    }
    month++;
  }
  return finalMonths;
};

export enum WorkWeek {
  Long = "Long",
  Short = "Short",
}

/*
    for every week (52x) {
        
    }
*/

export const calculateWorkDays = (_workWeek: WorkWeek) => {
  const dates: string[] = [];
  const now = moment();
  const firstMonday = now.clone().startOf("week");

  let weekDayCount = 1;
  let weekCount = 0;
  let workWeek = _workWeek;
  let week = firstMonday;
  for (weekCount; weekCount < 700; weekCount++) {
    if (weekCount > 0) {
      week.add(weekCount, "week");
    }
    for (weekDayCount; weekDayCount < 8; weekDayCount++) {
      if (workWeek === WorkWeek.Short) {
        if (weekDayCount === 3 || weekDayCount === 4 || weekDayCount === 5) {
          dates.push(week.weekday(weekDayCount).format("yyyy-MM-DD"));
        }
      } else {
        if (
          weekDayCount === 1 ||
          weekDayCount === 2 ||
          weekDayCount === 6 ||
          weekDayCount === 7
        ) {
          dates.push(week.weekday(weekDayCount).format("yyyy-MM-DD"));
        }
      }
    }
    weekDayCount = 0;
    if (workWeek === WorkWeek.Short) {
      workWeek = WorkWeek.Long;
    } else {
      workWeek = WorkWeek.Short;
    }
    week = moment().startOf("week");
  }
  console.log("RETURNING DATES", dates);
  return dates;
};

const transform = (dates: string[]) => {
  console.log("DATES???", dates);
  if (dates.length === 1) {
    console.log("Dont have values");
  }
  let newData = {};
  // '2012-05-22': {color: '#70d7c7', textColor: 'white'},
  dates.forEach((day) => {
    newData[day] = { color: "rgb(249, 157, 39)", textColor: "white" };
  });

  return newData;
};

export type DayData = {
  notes?: string[];
  time?: string;
};

export const saveNoteToDay = async (date: string, note: string) => {
  console.log("SAVENOTEDAT", date);
  try {
    const existingData = await AsyncStorage.getItem(date);
    console.log("Existing data", existingData);
    if (existingData) {
      const parsedOld = JSON.parse(existingData) as DayData;
      console.log("PRADSEWDA", parsedOld.notes);
      if (parsedOld.notes) {
        console.log("IM HERE", parsedOld.notes);
        const newNootes = parsedOld.notes;
        newNootes.push(note);
        console.log("Poznamocky zas", newNootes);
        const newDataObj = { ...parsedOld, notes: newNootes };
        return await AsyncStorage.setItem(date, JSON.stringify(newDataObj));
      }
      parsedOld.notes = [note];
      await AsyncStorage.setItem(date, JSON.stringify(parsedOld));
    } else {
      const newDayData: DayData = { notes: [note] };
      await AsyncStorage.setItem(date, JSON.stringify(newDayData));
    }
  } catch (error) {
    throw new Error("Could not save note");
  }
};

export const saveTimeToDay = async (date: string, time: string) => {
  try {
    const existingData = await AsyncStorage.getItem(date);
    if (existingData) {
      const parsedOld = JSON.parse(existingData) as DayData;
      parsedOld.time = time;
      await AsyncStorage.setItem(date, JSON.stringify(parsedOld));
    } else {
      const data: DayData = { time };
      await AsyncStorage.setItem(date, JSON.stringify(data));
    }
  } catch (error) {
    throw new Error("Could not save note");
  }
};

export const deleteNoteForDay = async (date: string, note: string) => {
  try {
    const existingData = await AsyncStorage.getItem(date);
    if (existingData) {
      const parsedOld = JSON.parse(existingData) as DayData;
      if (parsedOld.notes) {
        const index = parsedOld.notes.indexOf(note, 0);
        if (index > -1) {
          parsedOld.notes.splice(index, 1);
          return await AsyncStorage.setItem(date, JSON.stringify(parsedOld));
        }
      }
    }
  } catch (error) {
    throw new Error("Could not delete note");
  }
};

export const getDataForDate = async (date: string): Promise<DayData> => {
  try {
    const data = await AsyncStorage.getItem(date);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    throw new Error("Could not get notes");
  }
};
