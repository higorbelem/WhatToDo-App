import { Box, Text } from 'native-base';

import PressableOpacity from '#/components/PressableOpacity';
import { daysOfTheWeek } from '#/helpers/date';

interface DayProps {
  date: Date;
  selected?: boolean;
  onPress?: () => void;
}

function Day({ date, selected, onPress }: DayProps) {
  return (
    <PressableOpacity flex={1} onPress={onPress}>
      {selected && (
        <Box
          position="absolute"
          width={12}
          height={12}
          borderRadius="full"
          backgroundColor="primary.100"
        />
      )}

      <Text color="gray.900" fontWeight={600}>
        {daysOfTheWeek[new Date(date).getDay()]}
      </Text>

      <Text fontWeight={500} fontSize={16}>
        {new Date(date).getDate()}
      </Text>
    </PressableOpacity>
  );
}

export default Day;
