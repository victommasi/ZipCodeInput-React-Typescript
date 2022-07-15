import { add, startOfWeek } from "date-fns";

export const getWeekDaysByDate = (date: Date): Date[] => {
  const start: Date = startOfWeek(date);
  const weekArr: Date[] = [];

  for (let i = 0; i < 7; i++) {
    weekArr.push(add(start, { days: i }));
  }
  return weekArr;
};
