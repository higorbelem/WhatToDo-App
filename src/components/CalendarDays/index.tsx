import { Box, ScrollView, Text } from 'native-base';
import { useEffect, useState, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';

import Day from './Day';
import Header from '../Header';

import {
  getAllDaysInYear,
  getDayIndexFromWeeks,
  MonthsFull,
  splitYearInWeeks,
} from '#/helpers/date';

const { width } = Dimensions.get('window');

interface CalendarDaysProps {
  onDayChanged: (date: Date) => void;
}

type selectedDayType = {
  weekIndex: number;
  dayIndex: number;
};

function CalendarDays({ onDayChanged }: CalendarDaysProps) {
  const [weeksInYear, setWeeksInYear] = useState<Date[][]>([]);
  const [selectedDay, setSelectedDay] = useState<selectedDayType>();
  const [currentScrollDateText, setCurrentScrollDateText] = useState(
    `${MonthsFull[new Date().getMonth()]}, ${new Date().getFullYear()}`
  );

  const dayScrollRef = useRef<any>();

  useEffect(() => {
    const allDaysInYear = getAllDaysInYear(new Date().getFullYear());

    setWeeksInYear(splitYearInWeeks(allDaysInYear));
  }, []);

  useEffect(() => {
    if (selectedDay) {
      onDayChanged(weeksInYear[selectedDay.weekIndex][selectedDay.dayIndex]);
    }
  }, [selectedDay]);

  const onTodayPress = () => {
    const dayIndex = getDayIndexFromWeeks(new Date(), weeksInYear);

    if (dayScrollRef.current?.scrollTo) {
      dayScrollRef.current?.scrollTo({
        x: width * dayIndex.weekIndex,
        animated: true,
      });
    }

    setSelectedDay(dayIndex);
  };

  const onDayPress = (weekIndex: number, dayIndex: number) => {
    setSelectedDay({
      dayIndex,
      weekIndex,
    });
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentWeekIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    const day = weeksInYear[currentWeekIndex][0];

    setCurrentScrollDateText(`${MonthsFull[day.getMonth()]}, ${day.getFullYear()}`);
  };

  return (
    <Box safeArea backgroundColor="white" shadow="2" paddingBottom={Platform.OS === 'ios' ? 0 : 8}>
      <Header onTodayPress={onTodayPress} />

      <Text padding={4}>{currentScrollDateText}</Text>

      <ScrollView
        ref={dayScrollRef}
        width="full"
        flexGrow={0}
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 3 }}
        scrollEventThrottle={1000}
        onScroll={onScroll}>
        {weeksInYear.map((week, weekIndex) => (
          <Box key={`${weekIndex}`} flexDirection="row" width={width}>
            {week.map((day, dayIndex) => (
              <Day
                key={`${dayIndex}`}
                date={day}
                selected={
                  selectedDay?.weekIndex === weekIndex && selectedDay?.dayIndex === dayIndex
                }
                onPress={() => onDayPress(weekIndex, dayIndex)}
              />
            ))}
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}

export default CalendarDays;
