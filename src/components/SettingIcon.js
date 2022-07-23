import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity } from"react-native";
import Icon  from 'react-native-vector-icons/AntDesign';



export default function SettingIcon({navigation}){
    return (
        <View style={styles.icon_container}>
        <TouchableOpacity
            onPress={()=>navigation.navigate('envSetting')}
        ><Icon name="setting" size={18} color="#000" /></TouchableOpacity>
        <TouchableOpacity
            onPress={()=>navigation.navigate('alarm')}
        ><Icon name="bells" size={18} color="#000" /></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icon_container: {
        position: "absolute",
        top: 18,
        right: 30,
        zIndex: 1,
        flexDirection: "row",
        width: "11%",
        justifyContent: "space-between",
    }
})