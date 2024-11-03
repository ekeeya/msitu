import "./global.css"

import React from 'react';
import {StatusBar, View, TouchableOpacity, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import AppNavigation from './src/navigation/AppNavigation.js';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
//import {Provider} from 'react-redux';
//import {store} from './src/store/store.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App({navigation}): React.JSX.Element {
  return (
      <GestureHandlerRootView style={{flex: 1}}>

        <SafeAreaProvider>
          <StatusBar animated translucent backgroundColor="transparent" barStyle="dark-content"  />
          <AlertNotificationRoot>
            <AppNavigation />
            <View className="absolute flex flex-row justify-between top-10 left-2 right-2 bg-white/70 p-2 rounded-lg items-center z-10">
        <TouchableOpacity
          className='bg-white/90 p-2 border border-black rounded-lg'
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu-outline" size={30} color="teal" />
        </TouchableOpacity>
        <Text className='font-avenirBold'>Project Digital Solutions</Text>
        <View className='flex flex-row'>
          <TouchableOpacity className='bg-white/100 border border-black p-2 rounded-lg'>
            <AntDesignIcon name="addfolder" size={30} color="teal" />
          </TouchableOpacity>
        </View>
      </View>
          </AlertNotificationRoot>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

export default App;
