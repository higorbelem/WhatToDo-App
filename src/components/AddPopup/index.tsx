import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text, Box, useTheme, Actionsheet, Input, Switch } from 'native-base';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { SwitchChangeEvent } from 'react-native/types';
import * as yup from 'yup';

import Button from '../Button';
import PriorityItem from '../PriorityItem';
import ReminderItem from '../ReminderItem';

import { PriorityType, ReminderNameType } from '#/@types/todoItem';
import { reminders } from '#/static/reminders';

interface AddPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required('To do name is required'),
  time: yup.date().optional(),
  reminders: yup.array<string[]>().optional(),
  priority: yup.string().optional(),
});

function AddPopup({ isOpen, onClose }: AddPopupProps) {
  const [showTimeButton, setShowTimeButton] = useState(false);
  const [time, setTime] = useState<Date>();
  const [name, setName] = useState<string>();
  const [selectedReminders, setSelectedReminders] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>();
  const [isValid, setIsValid] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      setIsValid(
        await schema.isValid({
          name,
          time,
          reminders: selectedReminders,
          priority: selectedPriority,
        })
      );
    })();
  }, [name, selectedReminders, time, selectedPriority]);

  const onTimeSwitchChange = (event: SwitchChangeEvent) => {
    if (event.nativeEvent.value === false) {
      setTime(undefined);
    }
    setShowTimeButton(event.nativeEvent.value);
  };

  const onTimeSelected = (event: DateTimePickerEvent) => {
    if (event.type === 'set') {
      if (Platform.OS === 'android') setShowTimeButton(false);

      const newTime = new Date(event.nativeEvent.timestamp);

      setTime(newTime);
    }
  };

  const onReminderPressed = (reminder: ReminderNameType) => {
    if (selectedReminders.find((item) => item === reminder)) {
      setSelectedReminders((prev) => prev.filter((item) => item !== reminder));
    } else {
      setSelectedReminders((prev) => [...prev, reminder]);
    }
  };

  const onPriorityPressed = (priority: PriorityType) => {
    if (priority === selectedPriority) {
      setSelectedPriority(undefined);
      return;
    }

    setSelectedPriority(priority);
  };

  const onSave = async () => {
    if (
      await schema.isValid({
        name,
        time,
        reminders: selectedReminders,
        priority: selectedPriority,
      })
    ) {
      console.log('Do Something');
    }
  };

  const onNameChange = (name: string) => {
    setName(name);
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="full" padding={3}>
          <Input
            height={10}
            placeholder="What do you need to do?"
            variant="outline"
            borderColor="primary.900"
            focusOutlineColor="primary.900"
            backgroundColor="white"
            fontSize={16}
            color="gray.900"
            fontWeight={600}
            onChangeText={onNameChange}
          />

          <Box marginTop={4}>
            <Box width="full" alignItems="center" flexDirection="row">
              <Box flex={1} alignItems="center" flexDirection="row">
                <Ionicons name="alarm" color={colors.gray[900]} size={18} />
                <Text marginLeft={2}>
                  {time
                    ? `${time.getHours()}:${time.getMinutes()}`
                    : `${new Date().getHours()}:${new Date().getMinutes()}`}
                </Text>
              </Box>

              <Switch size="sm" color={colors.green[900]} onChange={onTimeSwitchChange} />
            </Box>

            {showTimeButton && (
              <DateTimePicker
                value={time ?? new Date()}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
                onChange={onTimeSelected}
              />
            )}

            <Box w="full" borderBottomWidth={2} borderColor="gray.100" marginTop={4} />
          </Box>

          <Box marginTop={4}>
            <Box width="full" alignItems="center" flexDirection="row">
              <Octicons name="bell-fill" color={colors.gray[900]} size={18} />
              <Text marginLeft={2}>Remind me</Text>
            </Box>

            <Box flexDirection="row" flexWrap="wrap" marginY={4}>
              {Object.entries(reminders).map((item) => (
                <ReminderItem
                  key={item[0]}
                  text={item[1].text}
                  selected={
                    !!selectedReminders.find(
                      (reminder) => reminder === (item[0] as ReminderNameType)
                    )
                  }
                  onPress={() => onReminderPressed(item[0] as ReminderNameType)}
                />
              ))}
            </Box>

            <Box w="full" borderBottomWidth={2} borderColor="gray.100" />
          </Box>

          <Box marginTop={4}>
            <Box width="full" alignItems="center" flexDirection="row">
              <AntDesign name="exclamationcircle" color={colors.gray[900]} size={18} />
              <Text flex={1} marginLeft={2}>
                Priority
              </Text>

              <Box flexDirection="row">
                <PriorityItem
                  priority="low"
                  onPress={onPriorityPressed}
                  selected={selectedPriority === 'low'}
                />
                <PriorityItem
                  priority="normal"
                  onPress={onPriorityPressed}
                  selected={selectedPriority === 'normal'}
                />
                <PriorityItem
                  priority="high"
                  onPress={onPriorityPressed}
                  selected={selectedPriority === 'high'}
                />
              </Box>
            </Box>
          </Box>

          <Button text="SAVE" marginTop={12} disabled={!isValid} onPress={onSave} />
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default AddPopup;
