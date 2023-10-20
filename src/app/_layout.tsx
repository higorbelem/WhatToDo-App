import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, View } from 'native-base';
import { useCallback } from 'react';

import { theme } from '#/static/theme';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('#/assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Light': require('#/assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('#/assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('#/assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('#/assets/fonts/Quicksand-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <View flex={1} onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </View>
    </NativeBaseProvider>
  );
}
