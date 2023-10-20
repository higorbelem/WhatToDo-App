export const getAllDaysInMonth = (month: number, year: number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  );

export const getAllDaysInYear = (year: number): string[] => {
  let res = [];
  for (let index = 1; index <= 12; index++) {
    res = [...res, ...getAllDaysInMonth(index, year)];
  }
  return res;
};

export const splitYearInWeeks = (daysInYear: string[]): Date[][] => {
  const firstWeekDayIndex = daysInYear.findIndex((item) => daysOfTheWeek[new Date(item).getDay()]);
  daysInYear.splice(0, firstWeekDayIndex - 1);

  const weeks = [];

  for (let i = 0; i < daysInYear.length; i += 7) {
    const week = daysInYear.slice(i, i + 7);
    weeks.push(week);
  }

  return weeks;
};

export const getDayIndexFromWeeks = (
  date: Date,
  weeks: Date[][]
): {
  weekIndex: number;
  dayIndex: number;
} => {
  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i];

    for (let j = 0; j < week.length; j++) {
      const day = week[j];

      if (isSameDay(day, date)) {
        return {
          weekIndex: i,
          dayIndex: j,
        };
      }
    }
  }
};

const isSameDay = (dateA: Date, dateB: Date) => {
  if (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  ) {
    return true;
  }
  return false;
};

export const formatString = (date: Date) => {
  return `${daysOfTheWeekFull[date.getDay()]}, ${MonthsFull[date.getMonth()]} ${date.getDate()}`;
};

export const daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const daysOfTheWeekFull = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const MonthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
