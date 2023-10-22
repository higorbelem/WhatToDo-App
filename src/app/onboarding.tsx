import { router } from 'expo-router';
import { Box, Pressable, ScrollView, Text } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { onboardingType } from '#/@types/onboarding';
import Button from '#/components/Button';
import OnboardingItem from '#/components/OnboardingItem';
import StepIndicator from '#/components/StepIndicator';

const { width } = Dimensions.get('window');

const onboarding: onboardingType[] = [
  {
    title: 'Create tasks',
    description: 'What do you need to do?',
    image: require('#/assets/imgs/onboarding-1.png'),
  },
  {
    title: 'Pin the task',
    description: 'Save the task to the next day',
    image: require('#/assets/imgs/onboarding-2.png'),
  },
  {
    title: 'Mark completed tasks',
    description: 'We know, you like it',
    image: require('#/assets/imgs/onboarding-3.png'),
  },
];

function Onboarding() {
  const scrollRef = useRef<any>();
  const [progress, setProgress] = useState(0);

  const getStartedButtonValue = useRef(new Animated.Value(0)).current;
  const progressTranslateAnimated = getStartedButtonValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });
  const buttonTranslateAnimated = getStartedButtonValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const AnimatedBox = Animated.createAnimatedComponent(Box);

  useEffect(() => {
    if (progress === onboarding.length - 1) {
      Animated.timing(getStartedButtonValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    if (scrollRef?.current?.scrollTo) {
      scrollRef.current.scrollTo({
        y: 0,
        x: width * progress,
        animated: true,
      });
    }
  }, [progress]);

  const onNext = () => {
    setProgress((prev) => prev + 1);
  };

  const OpenHome = () => {
    SecureStore.setItemAsync('secure_onboarding_shown', 'true');
    router.replace('/home');
  };

  return (
    <Box
      safeArea
      flex={1}
      width="full"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white">
      <ScrollView
        ref={scrollRef}
        horizontal
        snapToInterval={width}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {onboarding.map((item, index) => (
          <Box key={`${index}`} width={width}>
            <OnboardingItem title={item.title} description={item.description} image={item.image} />
          </Box>
        ))}
      </ScrollView>

      <Box width="full" alignItems="center">
        <AnimatedBox
          flexDirection="row"
          width="full"
          alignItems="center"
          justifyContent="space-between"
          paddingX={20}
          marginBottom="30px"
          style={{ transform: [{ translateY: progressTranslateAnimated }] }}>
          <Pressable onPress={OpenHome}>
            <Text color="gray.900" fontWeight={700} fontSize={16}>
              SKIP
            </Text>
          </Pressable>

          <StepIndicator currentStepIndex={progress} steps={onboarding.length} />

          <Pressable onPress={onNext}>
            <Text color="primary.900" fontWeight={700} fontSize={16}>
              NEXT
            </Text>
          </Pressable>
        </AnimatedBox>

        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateY: buttonTranslateAnimated }],
          }}>
          <Button text="GET STARTED" width="90%" onPress={OpenHome} />
        </Animated.View>
      </Box>
    </Box>
  );
}

export default Onboarding;
