import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';


const Stack = createStackNavigator();
import SafetyScreen from './SafetyView.js';
import SafetyDetailScreen from './SafetyDetail.js';

const StackNavigationData = [
    {
        name: 'Safety',
        component: SafetyScreen,
        options: {
          gestureEnabled: true,
        },
      },
      {
        name: 'SafetyDetail',
        component: SafetyDetailScreen,
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
          key={`setting_stack_item-${idx+1}`}
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

