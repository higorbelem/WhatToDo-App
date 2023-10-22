import { Box, ScrollView, Text } from 'native-base';
import { useEffect, useState, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';

import Day from './Day';
import Header from '../Header';

import {
  getDays,
  getDayIndexFromWeeks,
  MonthsFull,
  splitInWeeks,
  MONTH,
  MONTHS_INTERVAL,
  DAY,
} from '#/helpers/date';

const { width } = Dimensions.get('window');

interface CalendarDaysProps {
  initialLimitDates: {
    startDate: Date;
    endDate: Date;
  };
  onDayChanged: (date: Date) => void;
  onLimitDatesChanged: (startDate: Date, endDate: Date) => void;
}

type selectedDayType = {
  weekIndex: number;
  dayIndex: number;
};

function CalendarDays({ initialLimitDates, onDayChanged, onLimitDatesChanged }: CalendarDaysProps) {
  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<selectedDayType>();
  const [startDate, setStartDate] = useState<Date>(initialLimitDates.startDate);
  const [endDate, setEndDate] = useState<Date>(initialLimitDates.endDate);
  const [currentScrollDateText, setCurrentScrollDateText] = useState(
    `${MonthsFull[new Date().getMonth()]}, ${new Date().getFullYear()}`
  );
  const [closerToBegining, setCloserToBegining] = useState(true);
  const [initialScroll, setInitialScroll] = useState(true);
  const [datesLoading, setDatesLoading] = useState(false);

  const dayScrollRef = useRef<any>();

  useEffect(() => {
    const allDays = getDays(startDate, endDate);

    setDays(allDays);
  }, []);

  useEffect(() => {
    setWeeks(splitInWeeks(days));
  }, [days]);

  useEffect(() => {
    if (weeks.flat().length && initialScroll) {
      setInitialScroll(false);
      setTimeout(() => {
        onTodayPress();
      }, 500);
    }
  }, [weeks]);

  useEffect(() => {
    if (selectedDay) {
      onDayChanged(weeks[selectedDay.weekIndex][selectedDay.dayIndex]);
    }
  }, [selectedDay]);

  const onScrollFinished = (isEnd: boolean, event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (datesLoading) return;

    setDatesLoading(true);
    setTimeout(() => {
      setDatesLoading(false);
    }, 1000);

    if (!isEnd) {
      const newStartDate = new Date(startDate.getTime() - MONTH * MONTHS_INTERVAL);
      setStartDate(newStartDate);

      onLimitDatesChanged(newStartDate, endDate);

      const newDays = getDays(newStartDate, new Date(startDate.getTime() + DAY));
      setDays((prev) => [...newDays, ...prev]);
    } else {
      const newEndDate = new Date(endDate.getTime() + MONTH * MONTHS_INTERVAL);
      setEndDate(newEndDate);

      onLimitDatesChanged(startDate, newEndDate);

      const newDays = getDays(new Date(endDate.getTime() - DAY), newEndDate);
      setDays((prev) => [...prev, ...newDays]);
    }

    dayScrollRef.current.scrollTo({
      y: 0,
      x: !isEnd ? 17 * width : event.nativeEvent.contentSize.width + 17 * width,
      animated: false,
    });
  };

  const onTodayPress = () => {
    const dayIndex = getDayIndexFromWeeks(new Date(), weeks);

    if (dayIndex && dayScrollRef.current?.scrollTo) {
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
    if (event.nativeEvent.contentOffset.x < event.nativeEvent.contentSize.width / 2) {
      setCloserToBegining(true);
    } else {
      setCloserToBegining(false);
    }

    if (event.nativeEvent.contentOffset.x === 0) {
      onScrollFinished(false, event);
    } else if (
      event.nativeEvent.contentOffset.x + event.nativeEvent.layoutMeasurement.width ===
      event.nativeEvent.contentSize.width
    ) {
      onScrollFinished(true, event);
    }

    const currentWeekIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    const day = weeks[currentWeekIndex][0];

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
        scrollEventThrottle={400}
        onScroll={onScroll}>
        {weeks.map((week, weekIndex) => (
          <Box
            key={`${weekIndex}`}
            flexDirection="row"
            justifyContent={closerToBegining ? 'flex-end' : 'flex-start'}
            width={width}>
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
