import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StoreProvider, StoreContext } from './context/StoreProvider';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <StoreProvider>
      <StoreContext.Consumer>
        {context => {
          return context.token == ""
            ? <LoginScreen />
            : <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
        }}
      </StoreContext.Consumer>
    </StoreProvider>
  )
}
