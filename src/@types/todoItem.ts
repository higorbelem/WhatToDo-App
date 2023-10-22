export type ReminderNameType =
  | '30-minutes-before'
  | '1-hour-before'
  | '2-hour-before'
  | '4-hour-before'
  | '1-day-before';

export type ReminderType = {
  [key in ReminderNameType]: {
    text: string;
    seconds: number;
  };
};

export type PriorityType = 'low' | 'normal' | 'high';

export type TodoType = {
  id: string;
  name: string;
  date?: Date;
  time?: string;
  priority?: PriorityType;
  reminders?: ReminderNameType[];
  done?: boolean;
}
