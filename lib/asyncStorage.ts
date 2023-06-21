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
    return data ? transform(JSON.parse(data)) : [];
  } catch (error) {
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

export const saveNoteToDate = async (date: string, note: string) => {
  try {
    const existingData = await AsyncStorage.getItem(date);
    if (existingData) {
      const parsedOld = JSON.parse(existingData);
      const newData = [...parsedOld, note];
      await AsyncStorage.setItem(date, JSON.stringify(newData));
    } else {
      await AsyncStorage.setItem(date, JSON.parse(note));
    }
  } catch (error) {
    throw new Error("Could not save note");
  }
};

export const getNotesForDate = async (date: string) => {
  try {
    const data = await AsyncStorage.getItem(date);
    data ? JSON.parse(data) : null;
  } catch (error) {
    throw new Error("Could not get notes");
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
  // today and monday of todays week
  const now = moment();
  const firstMonday = now.clone();
  // format("yyyy-MM-DD")
  // counters
  // count days from 1 (monday) to 7 (sunday) then back to 1
  let weekDayCount = 1;
  // count work week workWeek.short % 2 = 1 ? short : long only increment
  let weekCount = 0;
  let workWeek = _workWeek;
  let week = firstMonday;

  // loop for 57 weeks from
  for (weekCount; weekCount < 57; weekCount++) {
    week.add(weekCount, "week");
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
    weekDayCount = 1;
    if (workWeek === WorkWeek.Short) {
      workWeek = WorkWeek.Long;
    } else {
      workWeek = WorkWeek.Short;
    }
  }

  return dates;
};

const transform = (dates: string[]) => {
  let newData = {};
  // '2012-05-22': {color: '#70d7c7', textColor: 'white'},
  dates.forEach((day) => {
    newData[day] = { color: "#1960EA", textColor: "white" };
  });

  return newData;
};
