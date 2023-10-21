import { IPressableProps, Pressable, Text } from 'native-base';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export default function Button({ text, onPress, ...props }: ButtonProps & IPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      backgroundColor="primary.900"
      alignItems="center"
      justifyContent="center"
      padding={3}
      rounded="md"
      {...props}>
      <Text color="white" fontWeight={600}>
        {text}
      </Text>
    </Pressable>
  );
}
