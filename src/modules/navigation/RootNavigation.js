import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { fonts } from '../../styles'
import StackNavigationData from './StackNavigationData';
import modalStackNavigationData from './modalStackNavigationData';
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = ()=> {
  return (
    <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      {StackNavigationData.map((item, idx) => (
        <MainStack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={item.options}
        />
      ))}
    </MainStack.Navigator>
  )
}

export default function NavigatorView(props) {

  return (
    
    <RootStack.Navigator
    mode="modal"
     screenOptions={{
       headerShown: false,
     }}
    >
        <RootStack.Screen
        name="root"
        component={MainStackScreen}
        />

      {modalStackNavigationData.map((item, idx) => (
        <RootStack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={item.options}
        />
        ))}

    </RootStack.Navigator>
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