import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default function NoticeBox(props){
    return (
        <View style={styles.mainContainer}>
        <View style={styles.container}>
            {props.content.map((item, idx) => (
            <Text 
            style={{color:item.color}}
            key={`Text_item-${idx+1}`}
            >
                {item.text}
            </Text>
            ))}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        alignItems:'center'
    },
    container:{
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10
    }
})

