import "./global.css"

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalPortal } from 'react-native-modals';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import AppNavigation from './src/navigation/AppNavigation.js';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store/store.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <SafeAreaProvider>
        <StatusBar animated translucent backgroundColor="transparent" barStyle="dark-content" />
        <AlertNotificationRoot>
          <Provider store={store}>
            <AppNavigation />
            <ModalPortal />

          </Provider>

        </AlertNotificationRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;