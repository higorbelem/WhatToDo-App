import { Platform } from 'expo-modules-core';
import { Box, Pressable, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import { SwipeProvider } from 'react-native-swipe-item';

import AddPopup from '#/components/AddPopup';
import CalendarDays from '#/components/CalendarDays';
import TodoItem from '#/components/TodoItem';

function Home() {
  const [showAddPopup, setShowAddPopup] = useState(false);

  const onDayChanged = (date: Date) => {
    console.log(date);
  };

  const onAddTaskPressed = () => {
    setShowAddPopup(true);
  };

  return (
    <>
      <Box flex={1} backgroundColor="white">
        <CalendarDays onDayChanged={onDayChanged} />

        <ScrollView>
          <SwipeProvider>
            <Box padding={5}>
              <TodoItem title="Meet Ann" description="8:00 PM" priority="low" hasReminders />
              <TodoItem title="Buy the book" />
              <TodoItem title="Call mom" />
              <TodoItem
                title="Make an appointment"
                description="11:00 AM"
                hasReminders
                priority="low"
              />
              <TodoItem title="Visit the University campus" finished />
              <TodoItem title="Buy Fruits" finished />
            </Box>
          </SwipeProvider>
        </ScrollView>

        <Pressable
          position="absolute"
          height={10}
          width="90%"
          alignSelf="center"
          justifyContent="center"
          bottom={Platform.OS === 'ios' ? 10 : 5}
          rounded="md"
          backgroundColor="white"
          borderWidth={1}
          borderColor="primary.900"
          padding={2}
          onPress={onAddTaskPressed}>
          <Text fontSize={16} color="gray.900" fontWeight={600}>
            What do you need to do?
          </Text>
        </Pressable>
      </Box>

      <AddPopup isOpen={showAddPopup} onClose={() => setShowAddPopup(false)} />
    </>
  );
}

export default Home;
