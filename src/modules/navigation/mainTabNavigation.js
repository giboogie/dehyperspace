import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles';

import tabNavigationData from './tabNavigationData';



const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      style: {
        position:'absolute',
        width: '100%',
        height: 70,
        borderTopWidth: 0,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        backgroundColor:'#F8F8F8'
      },
      tabStyle: {
        height: 70,    
      },
    }}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx+1}`}
          name={item.name}
          component={item.component}
          options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {/* <Image
                resizeMode="contain"
                source={item.icon}
                style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
              /> */}
              {!focused ? (<View>{item.Icon}</View>) : (<View>{item.focusedIcon}</View>)} 
            </View>
          ),
          tabBarLabel: ({ focused }) => {
            
            return (
              <Text style={{ fontSize: 10, color: focused ? colors.primary : colors.gray }}>
              
              </Text>
            );
            
          }
          

        }} 
        />        
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItemContainer: {
     flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F8F8F8'
    // borderBottomWidth: 2,
    // borderBottomColor: '#000',
    // paddingHorizontal: ,
    
    
  },
  // tabBarIcon: {
  //   width: 26,
  //   height: 26,
  // },
  // tabBarIconFocused: {
  //   tintColor: colors.primary,
  // },
});