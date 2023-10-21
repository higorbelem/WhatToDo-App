import { ReminderType } from '#/@types/todoItem';

export const reminders: ReminderType = {
  '30-minutes-before': {
    text: '30 minutes before',
    seconds: 1800,
  },
  '1-hour-before': {
    text: '1 hour before',
    seconds: 3600,
  },
  '2-hour-before': {
    text: '2 hour before',
    seconds: 7200,
  },
  '4-hour-before': {
    text: '3 hour before',
    seconds: 14400,
  },
  '1-day-before': {
    text: '1 day before',
    seconds: 86400,
  },
};
