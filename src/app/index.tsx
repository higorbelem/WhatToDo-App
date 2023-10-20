import { Box } from 'native-base';

import CalendarDays from '../components/CalendarDays';

function Home() {
  const onDayChanged = (date: Date) => {
    console.log(date);
  };

  return (
    <Box flex={1} backgroundColor="white">
      <CalendarDays onDayChanged={onDayChanged} />
    </Box>
  );
}

export default Home;
