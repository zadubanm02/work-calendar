import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const storeWorkDates = async (dataObject: DataStruct) => {
  try {
    for (const [yearMonth, dates] of Object.entries(dataObject)) {
      const datesData = JSON.stringify(dates);
      await AsyncStorage.setItem(yearMonth, datesData);
    }
  } catch (e) {
    // saving error
  }
};

export const resetWorkDays = async (firstMonth: string) => {
  const months = getMonths(firstMonth);
  try {
    await AsyncStorage.multiRemove(months);
  } catch (e) {
    // remove error
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
