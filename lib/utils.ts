import moment from "moment";

export const mapDayString = (day: string) => {
  console.log("DAYYYY", day);
  if (startsWithNum(day)) {
    const dateString = moment(day).format("dddd DD.MM.YYYY");
    const dayArr = dateString.split(" ");
    const dayString = dayArr[0];
    const datePart = dayArr[1];

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
  }
  const dateString = moment(day, "dddd DD.MM.YYYY").clone();
  const stringDate = dateString.format("dddd DD.MM.YYYY");
  const dayArr = stringDate.split(" ");
  const dayString = dayArr[0];
  const datePart = dayArr[1];
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

export const startsWithNum = (date: string) => {
  return /^\d/.test(date);
};

export const getSlovakMonth = (month: string) => {
  const splitted = month.split(" ");
  const monthName = splitted[0];
  const year = splitted[1];
  console.log("Monrh", month, monthName, year);

  switch (monthName) {
    case "January": {
      return `Január ${year}`;
    }
    case "February": {
      return `Február ${year}`;
    }
    case "March": {
      return `Marec ${year}`;
    }
    case "April": {
      return `Apríl ${year}`;
    }
    case "May": {
      return `Máj ${year}`;
    }
    case "June": {
      return `Jún ${year}`;
    }
    case "July": {
      return `Júl ${year}`;
    }
    case "August": {
      return `August ${year}`;
    }
    case "September": {
      return `September ${year}`;
    }
    case "October": {
      return `Október ${year}`;
    }
    case "November": {
      return `November ${year}`;
    }
    default: {
      return `December ${year}`;
    }
  }
};
