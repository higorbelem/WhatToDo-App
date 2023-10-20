import { Pressable, IPressableProps } from 'native-base';
import { Animated } from 'react-native';

interface PressableOpacityProps extends IPressableProps {
  children: any;
}

function PressableOpacity({ children, ...props }: PressableOpacityProps) {
  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
      <Animated.View
        style={{
          opacity: animated,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default PressableOpacity;
