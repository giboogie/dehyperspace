import * as React from 'react';
import HomeScreen from '../../screens/main/home/index';
import MainDevice from '../../screens/main/MainView';
import MypageScreen from '../../screens/main/home/index';

import CategoryScreen from'../../screens/main/home/index';
import PromotionScreen from '../../screens/main/home/index';

import GiftScreen from'../../screens/main/home/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import Fontistoicons from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

const tabNavigationData = [
  {
    name: 'home',
    component: HomeScreen,
    Icon: <Anticons name='home' size={22} color='#292929'/>,
    focusedIcon: <Anticons name='home' size={22} color='#292929'/>,
  },
  {
    name: 'category',
    component: MainDevice,
    Icon: <Feather name='settings' size={22} color='#292929'/>,
    focusedIcon: <Feather name='settings' size={22} color='#292929'/>,
  },
  {
    name: 'promotion',
    component: PromotionScreen,
    Icon: <Anticons name='staro' size={22} color='#292929'/>,
    focusedIcon: <Anticons name='star' size={22} color='#292929'/>,
  },
  {
    name: 'mypage',
    component: MypageScreen,
    Icon: <Feather name='user' size={26} color='#292929'/>,
    focusedIcon: <Feather name='user' size={26} color='#292929'/>,
  },
];

export default tabNavigationData;