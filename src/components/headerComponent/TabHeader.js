import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fonts } from '../../styles';
// 공통 헤드 컴포넌트
// Tab page에서 사용되는 header section 컴포넌트입니다. (back, close형태의 modal)
 /* props
    title (type : string)
    noti (type : bool )
    notiActive (type: bool)
    onPress (type : function)
 */
export default class TabHeader extends Component{
  
    static defaultProps ={
        title: 'untitled',
        noti: false,
        notiActive: false,
        onPress: () => null,
        backgroundColor: '#fff',
        fontColor: '#000'
    }
    constructor(props){
        super(props);
    }
    render(){
        const {navigation} = this.props;
        let notiIconView = null;
        {this.props.noti ? (
            notiIconView = <TouchableOpacity style={styles.notiIcon}>
                <MaterialIcons name='notifications' size={28} color={'#0090FF'}/>
            </TouchableOpacity> 
            
            ) : (
                notiIconView = <View style={styles.notiIcon}></View>        
            )
        }
    return (
        <View style={[styles.headerContainer,{backgroundColor:this.props.backgroundColor,}]}>
            <View style={styles.headerBox}>
        <View style={styles.headerTitle}> 
        <Text style={[styles.headerTitleText, styles.font, {color: this.props.fontColor,}]}>{this.props.title}</Text>
        </View>
       {notiIconView}
       </View>
        </View>

        );
    }
}



const styles = StyleSheet.create({
    font: {
        // fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    headerContainer:{
        width: '100%',
        height: 50,

        alignItems:'center',
        justifyContent:"center"
    },
    headerBox:{
        width: '90%',
        justifyContent: 'space-between',
    },
    headerTitle:{
        alignItems: 'center',
    },
    headerTitleText:{
        fontSize: 20,

        fontWeight:'700',
        // fontFamily:fonts.primaryRegular,
        justifyContent: 'center',
        alignItems:'center'
    },
    notiIcon:{
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
