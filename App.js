import React, {useState, useEffect, useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {useRoute} from './src/router';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const routing = useRoute(true);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./src/Screens/assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./src/Screens/assets/fonts/Roboto-Medium.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
     prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (
<NavigationContainer onLayout={onLayoutRootView}>
  {routing}
</NavigationContainer>
  );
}


 