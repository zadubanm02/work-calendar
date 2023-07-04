export const mapDayString = (day: string) => {
  const dayString = day.split(" ")[0];
  switch (dayString) {
    case "Monday": {
      return `Pondelok ${day.split(" ")[1]}`;
    }
    case "Tuesday": {
      return `Utorok ${day.split(" ")[1]}`;
    }
    case "Wednesday": {
      return `Streda ${day.split(" ")[1]}`;
    }
    case "Thursday": {
      return `Štvrtok ${day.split(" ")[1]}`;
    }
    case "Friday": {
      return `Piatok ${day.split(" ")[1]}`;
    }
    case "Saturday": {
      return `Sobota ${day.split(" ")[1]}`;
    }
    case "Sunday": {
      return `Nedeľa ${day.split(" ")[1]}`;
    }
    default: {
      return `Deň ${day.split(" ")[1]}`;
    }
  }
};
