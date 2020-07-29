import moment from "moment";

// returns date of the last week
export const getLastWeekDate = () =>
  moment().subtract(7, "days").format("YYYY-MM-DD");
