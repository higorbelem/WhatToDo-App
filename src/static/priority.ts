import { theme } from './theme';

import { PriorityType } from '#/@types/todoItem';

export const priorityColors: {
  [key in PriorityType]: {
    primary: string;
    secondary: string;
  };
} = {
  low: {
    primary: theme.colors.green[900],
    secondary: theme.colors.green[100],
  },
  normal: {
    primary: theme.colors.yellow[900],
    secondary: theme.colors.yellow[100],
  },
  high: {
    primary: theme.colors.red[900],
    secondary: theme.colors.red[100],
  },
};
