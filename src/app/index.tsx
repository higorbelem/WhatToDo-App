import { Platform } from 'expo-modules-core';
import { Box, Pressable, ScrollView, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { SwipeProvider } from 'react-native-swipe-item';

import AddPopup from '#/components/AddPopup';
import CalendarDays from '#/components/CalendarDays';
import TodoItem from '#/components/TodoItem';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETE_TASK, FINISH_TASK, GET_TASKS } from '#/graphql/queries/task';
import { formatOnlyDate, isSameDay, MONTH, MONTHS_INTERVAL } from '#/helpers/date';
import { getDeviceId } from '#/services/deviceId';
import { TodoType } from '#/@types/todoItem';

const initialStartDate = new Date(Date.now() - MONTH * MONTHS_INTERVAL);
const initialEndDate = new Date(Date.now() + MONTH * MONTHS_INTERVAL);

function Home() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [tasks, setTasks] = useState<TodoType[]>([]);
  const [currentTasks, setCurrentTasks] = useState<TodoType[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [getTasks, { loading, refetch, error, data, called }] = useLazyQuery(GET_TASKS);
  const [finishTask, { loading: loadingFinishTask, error: errorFinishTask, data: dataFinishTask }] =
    useMutation(FINISH_TASK);
  const [deleteTask, { loading: loadingDeleteTask, error: errorDeleteTask, data: dataDeleteTask }] =
    useMutation(DELETE_TASK);

  useEffect(() => {
    if (!errorFinishTask && dataFinishTask) {
      fetchTasks(initialStartDate, initialEndDate);
    }
  }, [errorFinishTask, dataFinishTask]);

  useEffect(() => {
    if (!errorDeleteTask && dataDeleteTask) {
      fetchTasks(initialStartDate, initialEndDate);
    }
  }, [errorDeleteTask, dataDeleteTask]);

  useEffect(() => {
    if (!error && data?.tasks) {
      setTasks(data.tasks as TodoType[]);

      setCurrentTasks(
        (data.tasks as TodoType[]).filter((item) => isSameDay(new Date(item.date), currentDate))
      );
    }
  }, [error, data]);

  useEffect(() => {
    fetchTasks(initialStartDate, initialEndDate);
  }, []);

  const fetchTasks = async (startDate: Date, endDate: Date) => {
    const deviceId = await getDeviceId();

    if (!called) {
      await getTasks({
        variables: {
          deviceId,
          startDate: formatOnlyDate(startDate),
          endDate: formatOnlyDate(endDate),
        },
      });
    } else {
      await refetch({
        deviceId,
        startDate: formatOnlyDate(startDate),
        endDate: formatOnlyDate(endDate),
      });
    }
  };

  const onDayChanged = (date: Date) => {
    setCurrentDate(date);
    setCurrentTasks((tasks as TodoType[]).filter((item) => isSameDay(new Date(item.date), date)));
  };

  const onAddTaskPressed = () => {
    setShowAddPopup(true);
  };

  const onLimitDatesChanged = (startDate: Date, endDate: Date) => {
    fetchTasks(startDate, endDate);
  };

  const onAddPopupClse = (hasAdded: boolean) => {
    if (hasAdded) {
      fetchTasks(initialStartDate, initialEndDate);
    }

    setShowAddPopup(false);
  };

  const onDeleteTask = async (task: TodoType) => {
    const deviceId = await getDeviceId();
    await deleteTask({
      variables: {
        taskId: task.id,
        deviceId,
      },
    });
  };

  const onFinishTask = async (task: TodoType) => {
    const deviceId = await getDeviceId();
    await finishTask({
      variables: {
        taskId: task.id,
        deviceId,
      },
    });
  };

  return (
    <>
      <Box flex={1} backgroundColor="white">
        <CalendarDays
          onDayChanged={onDayChanged}
          onLimitDatesChanged={onLimitDatesChanged}
          initialLimitDates={{
            startDate: initialStartDate,
            endDate: initialEndDate,
          }}
        />

        <ScrollView>
          <SwipeProvider>
            <Box padding={5}>
              {currentTasks.map((item) => (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  description={item.time}
                  priority={item.priority}
                  hasReminders={!!item.reminders.length}
                  finished={item.done}
                  onDeleteTask={() => onDeleteTask(item)}
                  onFinishTask={() => onFinishTask(item)}
                />
              ))}
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

      <AddPopup currentDate={currentDate} isOpen={showAddPopup} onClose={onAddPopupClse} />
    </>
  );
}

export default Home;
