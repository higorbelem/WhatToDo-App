import { Platform } from 'expo-modules-core';
import { Box, Image, Pressable, ScrollView, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
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

const { width } = Dimensions.get('window');

function Home() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [tasks, setTasks] = useState<TodoType[]>([]);
  const [currentTasks, setCurrentTasks] = useState<TodoType[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);

  const [getTasks, { loading, refetch, error, data, called }] = useLazyQuery(GET_TASKS);
  const [finishTask, { loading: loadingFinishTask, error: errorFinishTask, data: dataFinishTask }] =
    useMutation(FINISH_TASK);
  const [deleteTask, { loading: loadingDeleteTask, error: errorDeleteTask, data: dataDeleteTask }] =
    useMutation(DELETE_TASK);

  useEffect(() => {
    if (!errorFinishTask && dataFinishTask) {
      fetchTasks(startDate, endDate);
    }
  }, [errorFinishTask, dataFinishTask]);

  useEffect(() => {
    if (!errorDeleteTask && dataDeleteTask) {
      fetchTasks(startDate, endDate);
    }
  }, [errorDeleteTask, dataDeleteTask]);

  useEffect(() => {
    if (!error && data?.tasks) {
      setTasks(data.tasks as TodoType[]);

      setCurrentTasks(
        (data.tasks as TodoType[])
          .filter((item) => isSameDay(new Date(item.date), currentDate))
          .sort((a, b) => Number(a.done) - Number(b.done))
      );
    }
  }, [error, data]);

  useEffect(() => {
    fetchTasks(startDate, endDate);
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
    setCurrentTasks(
      (tasks as TodoType[])
        .filter((item) => isSameDay(new Date(item.date), date))
        .sort((a, b) => Number(a.done) - Number(b.done))
    );
  };

  const onAddTaskPressed = () => {
    setShowAddPopup(true);
  };

  const onLimitDatesChanged = (startDate: Date, endDate: Date) => {
    fetchTasks(startDate, endDate);

    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onAddPopupClse = (hasAdded: boolean) => {
    if (hasAdded) {
      fetchTasks(startDate, endDate);
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

        {currentTasks.length ? (
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
        ) : (
          <Box flex={1} width="full" flexDirection="column" alignItems="center" paddingTop="50px">
            <Image
              source={require('#/assets/imgs/onboarding-3.png')}
              height={width * 0.5}
              width={width * 0.5}
              alt="Todo image"
            />

            <Text fontSize={20} fontWeight={700} marginTop={8}>
              You have no tasks
            </Text>
            <Text fontSize={16} fontWeight={500}>
              Write something below
            </Text>
          </Box>
        )}

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
