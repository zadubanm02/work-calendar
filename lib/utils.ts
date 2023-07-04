import moment from "moment";

export const mapDayString = (day: string) => {
  const dateString = moment(day).format("dddd DD.MM.YYYY");
  const dayArr = dateString.split(" ");
  const dayString = dayArr[0];
  const datePart = dayArr[1];
  console.log("MapDayString", day, dayString, datePart);
  switch (dayString) {
    case "Monday": {
      return `Pondelok ${datePart}`;
    }
    case "Tuesday": {
      return `Utorok ${datePart}`;
    }
    case "Wednesday": {
      return `Streda ${datePart}`;
    }
    case "Thursday": {
      return `Štvrtok ${datePart}`;
    }
    case "Friday": {
      return `Piatok ${datePart}`;
    }
    case "Saturday": {
      return `Sobota ${datePart}`;
    }
    case "Sunday": {
      return `Nedeľa ${datePart}`;
    }
    default: {
      return `Deň ${datePart}`;
    }
  }
};
