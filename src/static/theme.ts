import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      900: '#8280ff',
      100: '#e8e7ff',
    },
    red: {
      900: '#ff7285',
      100: '#ffe2e6',
    },
    yellow: {
      900: '#ffca83',
      100: '#fff4e5',
    },
    green: {
      900: '#4ad991',
      100: '#daf7e8',
    },
    gray: {
      900: '#b4b4c6',
      100: '#f0f0f7',
    },
  },
  fontConfig: {
    Quicksand: {
      300: 'Quicksand-Light',
      400: 'Quicksand-Regular',
      500: 'Quicksand-Medium',
      600: 'Quicksand-SemiBold',
      700: 'Quicksand-Bold',
    },
  },
  fonts: {
    heading: 'Quicksand',
    body: 'Quicksand',
    mono: 'Quicksand',
  },
  config: {
    initialColorMode: 'light',
  },
});
