import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, Box, useTheme, Pressable } from 'native-base';

import { formatString } from '#/helpers/date';

interface HeaderProps {
  onTodayPress: () => void;
}

function Header({ onTodayPress }: HeaderProps) {
  const { colors } = useTheme();
  return (
    <Box flexDirection="row" alignItems="flex-end" padding={4}>
      <Text flex={1} fontSize={30} fontWeight={700}>
        What to do
      </Text>

      <Pressable flexDirection="row" alignItems="center" onPress={onTodayPress}>
        <Text color="gray.900" fontWeight={700} marginRight={1}>
          {formatString(new Date())}
        </Text>

        <Ionicons name="calendar" color={colors.primary[900]} size={20} />
      </Pressable>
    </Box>
  );
}

export default Header;
