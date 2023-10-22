import { Box } from 'native-base';

import Step from './Step';

interface StepIndicatorProps {
  steps: number;
  currentStepIndex: number;
}

export default function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
  return (
    <Box flexDirection="row">
      {new Array(steps).fill('').map((_, index) => (
        <Step
          key={`${index}`}
          size={6}
          selected={index === currentStepIndex}
          isFirst={index === 0}
        />
      ))}
    </Box>
  );
}
