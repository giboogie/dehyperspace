import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, Text, PermissionsAndroid, Button, ImageBackground,Platform,Alert,NativeModules,NativeEventEmitter,StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AppView from './src/screens/AppView'
import storeIndex from './src/modules/index';
import BleManager from 'react-native-ble-manager'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/modules/rootSaga';
import { fonts } from './src/styles';
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, RESULTS, request, requestMultiple, openSettings} from 'react-native-permissions';
import { Notifications } from 'react-native-notifications';

const eventEmitter = new NativeEventEmitter(NativeModules.BleManager)

const sagaMiddleware = createSagaMiddleware()
const store = createStore(storeIndex, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);



export default function App() {
  const [bluetooth, setBluetooth] = useState(false);
  const [location, setLocation] = useState(false);
  const getBluetoothScanPermission = async () => {
    if(Platform.OS ==='android'){
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      console.log('BleManager.scan done')
      setBluetooth(true)
    } else {
      console.log("Bluetooth permission denied")
      setBluetooth(false)
    }
  }else if (Platform.OS === 'ios'){
      const result = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      if (result === RESULTS.GRANTED) {
        console.log('results clear blu ios-')
        setBluetooth(true)
      }else if(result === RESULTS.BLOCKED) {
        Alert.alert('블루투스 권한이 필요합니다!',
        "설정하시겠습니까?",
        [
          {
            text: "취소",
            onPress:() => console.log('check'),
            style: "cancel" 
          },
          { text: "설정하기", onPress: () => openSettings().catch(() => console.warn('cannot open settings'))},
        ],
        { cancelable: false});
      }else{
        console.log('에뮬레이터 or 디바이스에 블루투스모듈이 없는 상태')
        setBluetooth(true)
      }

  }
  }
  const requestLocationPermission = async () => {
    if(Platform.OS === 'android'){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "React Native Wifi Reborn App Permission",
          message:
            "Location permission is required to connect with or scan for Wifi networks. ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("done")
          setLocation(true)
      } else {
        setLocation(false)
        console.log("Location permission denied");
      }
    } catch (err) {
     // console.warn(err);
    }
  }else if(Platform.OS === 'ios'){
    const result = await requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS,PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);

    if(result[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED || result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED){
      setLocation(true)
    }else if(result[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.BLOCKED && result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED){
      Alert.alert('위치 권한이 필요합니다!',
      "설정하시겠습니까?",
      [
        {
          text: "취소",
          onPress:() => console.log('check'),
          style: "cancel" 
        },
        { text: "설정하기", onPress: () => openSettings().catch(() => console.warn('cannot open settings'))},
      ],
      { cancelable: false});
    }else{
      setLocation(false)
    }
  }
  };
  const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const firebaseBadge = async() =>{
    
    Notifications.ios.setBadgeCount(0);
  }
  useEffect(() => {
    requestUserPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('app')
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  //location permission
  useEffect(() => {
    requestLocationPermission();
  }, []);
  //bluetooth permission
  useEffect(() => {
    getBluetoothScanPermission();
    console.log('getBluetoothPermission')
  }, []);

useEffect(() =>{
  firebaseBadge();
}, []);
  useEffect(() => {
    
    if(bluetooth === true && location === true){
      SplashScreen.hide();
    }

  }, [bluetooth,location]);

  return (
    <Provider store = {store}>
    <SafeAreaProvider>
      <SafeAreaView 
      edges={['top']}
      style={styles.container}>
<StatusBar barStyle={'light-content'}></StatusBar>
      <NavigationContainer>

        {/* <View style={styles.container}></View> */}
          <AppView style={styles.appView}/>

      </NavigationContainer>

      </SafeAreaView>
      </SafeAreaProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#256653',

  },
  status:{
    color:'#fff'
  }

});
