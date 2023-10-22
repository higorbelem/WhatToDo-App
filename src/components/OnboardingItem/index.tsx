import { Box, Image, Text } from 'native-base';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingItemProps {
  title: string;
  description: string;
  image: number;
}

export default function OnboardingItem({ title, description, image }: OnboardingItemProps) {
  return (
    <Box alignItems="center">
      <Image source={image} height={width * 0.75} width={width * 0.75} alt="Todo image" />

      <Text fontSize={24} fontWeight={500} marginTop={8}>
        {title}
      </Text>
      <Text fontSize={18} fontWeight={500} color="gray.900">
        {description}
      </Text>
    </Box>
  );
}
