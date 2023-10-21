import { Text, Pressable } from 'native-base';

interface ReminderItemProps {
  text: string;
  selected?: boolean;
  onPress?: () => void;
}

function ReminderItem({ text, selected, onPress }: ReminderItemProps) {
  return (
    <Pressable
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      paddingX={3}
      paddingY={1}
      rounded="full"
      margin={1}
      backgroundColor={selected ? 'primary.900' : 'gray.100'}
      onPress={onPress}>
      <Text color={selected ? 'white' : 'black'}>{text}</Text>
    </Pressable>
  );
}

export default ReminderItem;
