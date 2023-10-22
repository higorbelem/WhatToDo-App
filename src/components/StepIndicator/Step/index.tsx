import { useTheme } from 'native-base';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface StepProps {
  selected: boolean;
  size: number;
  isFirst: boolean;
}

export default function Step({ selected, size, isFirst }: StepProps) {
  const { colors } = useTheme();
  const selectedValue = useRef(new Animated.Value(0)).current;
  const widthAnimated = selectedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [size, size * 5],
  });
  const colorAnimated = selectedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primary[100], colors.primary[900]],
  });

  useEffect(() => {
    Animated.timing(selectedValue, {
      toValue: selected ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  return (
    <Animated.View
      style={{
        height: size,
        width: widthAnimated,
        borderRadius: size / 2,
        backgroundColor: colorAnimated,
        marginLeft: isFirst ? 0 : 7,
      }}
    />
  );
}
