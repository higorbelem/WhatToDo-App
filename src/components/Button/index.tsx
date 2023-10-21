import { IPressableProps, Pressable, Text } from 'native-base';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function Button({
  text,
  disabled,
  onPress,
  ...props
}: ButtonProps & IPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      backgroundColor={disabled ? 'gray.900' : 'primary.900'}
      alignItems="center"
      justifyContent="center"
      padding={3}
      rounded="md"
      disabled={disabled}
      {...props}>
      <Text color="white" fontWeight={600}>
        {text}
      </Text>
    </Pressable>
  );
}
