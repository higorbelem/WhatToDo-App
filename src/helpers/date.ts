export const MONTHS_INTERVAL = 4;

export const DAY = 1000 * 60 * 60 * 24;
export const MONTH = DAY * 30;

export const getAllDaysInMonth = (month: number, year: number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  );


export const getDays = (startDate: Date, endDate: Date): Date[] => {
  const res: Date[] = []
  let currentDate = startDate;
  
  while (currentDate.getTime() <= endDate.getTime()) {
    res.push(currentDate)
    currentDate = new Date(currentDate.getTime() + DAY)
  }

  return res;
};

export const splitInWeeks = (days: Date[]): Date[][] => {
  const weeks = [];

  const firstWeekDayIndex = days.findIndex((item) => new Date(item).getDay() === 0);
  weeks.push(days.splice(0, firstWeekDayIndex));

  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7);
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

export const isSameDay = (dateA: Date, dateB: Date) => {
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

export const formatOnlyDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
};

export const formatOnlyTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
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
