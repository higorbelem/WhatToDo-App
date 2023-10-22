import { useRef, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import { Box, Pressable, Text, useTheme } from 'native-base';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

import { PriorityType } from '#/@types/todoItem';
import { priorityColors } from '#/static/priority';

const { width } = Dimensions.get('window');

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

  const [checked, setChecked] = useState(false);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

  const animatedCheckColor = useRef(new Animated.Value(0)).current;
  const translateValue = useRef(new Animated.Value(0)).current;
  const checkBackColor = animatedCheckColor.interpolate({
    inputRange: [0, 1],
    outputRange: [`${colors.yellow[900]}00`, colors.yellow[900]],
  });
  const translateAnimation = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  const onCheck = () => {
    setTimeout(() => {
      Animated.timing(animatedCheckColor, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onFinishTask();

        Animated.timing(translateValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });
    }, 0);

    setChecked(true);
  };

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
        <AnimatedIcon
          animation="glow"
          iterationCount="infinite"
          name="trash"
          color={colors.red[900]}
          size={16}
        />
      </Pressable>
    </SwipeButtonsContainer>
  );

  return (
    <Animated.View
      style={{
        transform: [{ translateX: translateAnimation }],
      }}>
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
          <AnimatedPressable
            rounded="full"
            borderWidth={1}
            borderColor={checked ? 'transparent' : 'gray.900'}
            padding={1.5}
            onPress={onCheck}
            style={{ backgroundColor: checkBackColor }}>
            <AnimatedIcon
              name="check"
              color={checked ? colors.white : colors.gray[900]}
              size={15}
            />
          </AnimatedPressable>

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
    </Animated.View>
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
