import { Pressable, Box } from 'native-base';

import { PriorityType } from '#/@types/todoItem';
import { priorityColors } from '#/static/priority';

interface PriorityItemProps {
  priority: PriorityType;
  onPress: (priority: PriorityType) => void;
  selected?: boolean;
}

function PriorityItem({ priority, onPress, selected }: PriorityItemProps) {
  return (
    <Pressable
      w={6}
      h={6}
      rounded="full"
      borderColor={selected ? priorityColors[priority].primary : 'gray.100'}
      backgroundColor={selected ? priorityColors[priority].secondary : 'transparent'}
      borderWidth={1}
      padding={1.5}
      marginRight={3}
      onPress={() => onPress(priority)}>
      <Box w="full" h="full" rounded="full" backgroundColor={priorityColors[priority].primary} />
    </Pressable>
  );
}

export default PriorityItem;
