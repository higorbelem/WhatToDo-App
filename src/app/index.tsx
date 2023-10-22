import * as SecureStore from 'expo-secure-store';
import { Box, Image } from 'native-base';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';

function Index() {
  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();

      let onboardingShown = await SecureStore.getItemAsync('secure_onboarding_shown');

      if (onboardingShown === 'true') {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    })();
  }, []);
  return (
    <Box height="full" width="full">
      <Image
        source={require('#/assets/imgs/splash.png')}
        height="full"
        width="full"
        resizeMode="cover"
        alt="Todo image"
      />
    </Box>
  );
}

export default Index;
