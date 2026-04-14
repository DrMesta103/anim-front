import { format, startOfWeek, endOfWeek } from "date-fns-jalali";

export function getPersianDates(date: Date) {
  const todaysDate = format(date, "yyyy-MM-dd");

  const todaysWeekDay = format(date, "eeee");

  const start = startOfWeek(date, { weekStartsOn: 6 });
  const end = endOfWeek(date, { weekStartsOn: 6 });

  const thisWeek = [format(start, "yyyy-MM-dd"), format(end, "yyyy-MM-dd")];

  return {
    todaysDate,
    todaysWeekDay,
    thisWeek,
  };
}
