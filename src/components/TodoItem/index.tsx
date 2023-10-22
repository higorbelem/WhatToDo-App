import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import { Box, Pressable, Text, useTheme } from 'native-base';
import { StyleSheet } from 'react-native';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

import { PriorityType } from '#/@types/todoItem';
import { priorityColors } from '#/static/priority';

interface TodoItemProps {
  id: string;
  title: string;
  description?: string;
  hasReminders?: boolean;
  priority?: PriorityType;
  finished?: boolean;
  onFinishTask: () => void;
  onDeleteTask: () => void;
}

export default function TodoItem({
  id,
  title,
  description,
  hasReminders,
  priority,
  finished,
  onFinishTask,
  onDeleteTask,
}: TodoItemProps) {
  const { colors } = useTheme();

  if (finished) {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="white"
        shadow={2}
        rounded="full"
        paddingX={4}
        paddingY={2}
        borderWidth={1}
        borderColor="yellow.900"
        marginY="8px">
        <FontAwesome5 name="check" color={colors.yellow[900]} size={15} />
        <Text fontSize={16} color="gray.900" fontWeight={600} marginLeft={5}>
          {title}
        </Text>
      </Box>
    );
  }

  const rightButton = (
    <SwipeButtonsContainer style={styles.deleteButton}>
      <Pressable backgroundColor="red.100" padding={3} rounded="full" onPress={onDeleteTask}>
        <FontAwesome5 name="trash" color={colors.red[900]} size={16} />
      </Pressable>
    </SwipeButtonsContainer>
  );

  return (
    <SwipeItem
      rightButtons={rightButton}
      style={styles.button}
      swipeContainerStyle={styles.swipeContentContainerStyle}>
      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="white"
        rounded="md"
        shadow={2}
        width="100%"
        height="100%"
        paddingX={2}>
        <Pressable
          rounded="full"
          borderWidth={1}
          borderColor="gray.900"
          padding={1.5}
          onPress={onFinishTask}>
          <FontAwesome5 name="check" color={colors.gray[900]} size={15} />
        </Pressable>

        <Box flex={1} marginLeft={4}>
          <Text fontSize={16} fontWeight={500}>
            {title}
          </Text>

          {!!description && (
            <Text color="gray.900" fontWeight={500}>
              {description}
            </Text>
          )}
        </Box>

        <Box flexDirection="row" alignItems="center" marginRight={3}>
          {priority && (
            <Box
              width={2}
              height={2}
              rounded="full"
              backgroundColor={priorityColors[priority].primary}
              marginRight={3}
            />
          )}

          {hasReminders && <Octicons name="bell-fill" color={colors.gray[900]} size={16} />}
        </Box>
      </Box>
    </SwipeItem>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    marginVertical: 8,
  },
  swipeContentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  deleteButton: {
    alignSelf: 'center',
    aspectRatio: 1,
    flexDirection: 'column',
    padding: 10,
  },
});
