import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {fonts} from '../styles/index';

import {numberWithCommas} from '../util/comma';

import I18n from '../i18n/index';



export default function ListCard({item, index}){

    return (
        <View style={styles.list}>
        <View style={styles.listItem}>
        <View style={{width:'20%' }}><Text style={[{ color: '#8d8d8d', fontSize:10 },styles.font]}>{item.day} </Text></View>
        <View style={{width:'60%'}}><Text style={[{ color: '#000',fontSize:12},styles.font]}>{item.title} </Text></View>
        <View style={{width:'10%', alignItems: 'flex-end'}}><Text style={[{ color: '#717171',fontSize:10 },styles.font]}>{numberWithCommas(item.values)+I18n.t('translation.mainhome.text_1')}</Text></View>
        </View>
    </View>
    )
}

const styles= StyleSheet.create({
    font : {
        includeFontPadding: false
    },
    list:{
        width: '100%',
        height: 49,
        paddingHorizontal: 50,
    },
    listItem:{
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        // borderBottomWidth: 1,
        borderColor: '#B8B8B8',

    }
})
