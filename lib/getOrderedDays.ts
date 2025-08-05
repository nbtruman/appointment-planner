export function getOrderedDays():Array<string> {
    const today = new Date();
    const startDay = today.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];  
    return days.slice(startDay).concat(days.slice(0, startDay));
}