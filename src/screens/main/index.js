import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';


const Stack = createStackNavigator();
import EventScreen from './event/index.js';
import MainScreen from './MainView.js';
import DeviceScreen from './device/index.js';
import FrigeScreen from './frige/index.js';
import WalletScreen from './wallet/index.js'
import SettingScreen from './setting/index.js';
import SafetyScreen from './safety/index.js';
const StackNavigationData = [
    {
        name: 'Main',
        component: MainScreen,
        options: {
          gestureEnabled: true,
        },
      },
    {
        name: 'Device',
        component: DeviceScreen,
        options: {
          gestureEnabled: true,
        },
      },
      {
        name: 'Frige',
        component: FrigeScreen,
        options: {
          gestureEnabled: true,
        },
      },
      {
        name: 'Wallet',
        component: WalletScreen,
        options: {
          gestureEnabled: true,
        },
      },
      {
        name: 'Setting',
        component: SettingScreen,
        options: {
          gestureEnabled: true,
        },
      },
      {
        name: 'Event',
        component: EventScreen,
        options: {
          gestureEnabled: true,
        },
      },
      {
        name: 'Safety',
        component: SafetyScreen,
        options: {
          gestureEnabled: true,
        },
      },

 ]


export default function NavigatorView(props) {

  return (
    <Stack.Navigator
     screenOptions={{
       headerShown: false,
     }}
    >
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`search_stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: 57,
  },
});

