import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../../styles';

// 공통 헤드 컴포넌트
// sub page에서 사용되는 header section 컴포넌트입니다. (back, close형태의 modal)
 /* props
    title (type : string)
    mode (type : string { 'back' , 'close' , 'chat'  })
    qmMode (type: bool) 오른쪽 물음표 버튼 추가

    onPress (type : function)
    reportOnPress (type: function)
    qmOnPress (type: function) 물음표 버튼 클릭시 이벤트
 */
export default class SubHeader extends Component{
  
    static defaultProps ={
        title: 'untitled',
        mode: 'default',
        qmMode: false,
        underLine: true,
        onPress: () => null,
        reportOnPress: () => null,
        qmOnPress: () => null,
    }
    constructor(props){
        super(props);
    }
    render(){

        let IconView = null;
        let qmIconView = null;
        if(this.props.mode === 'back'){
            IconView = <TouchableOpacity style={styles.backIcon}
                        onPress={this.props.onPress}>
                        <FeatherIcon name='chevron-left' size={28} color='#fff' />
                        </TouchableOpacity>

        }else if (this.props.mode === 'close'){

            IconView = <TouchableOpacity style={styles.closeIcon}
                            onPress={this.props.onPress}>
                            <FeatherIcon name='x' size={28} color='#646464' />
                            </TouchableOpacity>
        }else if (this.props.mode === 'chat'){

        }else {

        }

        if(this.props.qmMode){
            qmIconView = 
            <View style={styles.qmIcon}><TouchableOpacity
            onPress={this.props.qmOnPress}>
            <AntDesignIcon name='questioncircleo' size={24} color='#fff' />
            </TouchableOpacity>
            </View>
        }else{
            qmIconView = null;
        }
    return (
        <View style={(this.props.underLine) ? (styles.headerContainer) : (styles.noneLineHeaderContainer)}>
            <View style={styles.headerBox}>
        {IconView}
        <View style={styles.headerTitle}> 
        <Text style={[styles.headerTitleText, styles.font]}>{this.props.title}</Text>
        </View>
        {qmIconView}
       </View>
        </View>

        );
    }
}



const styles = StyleSheet.create({
    font: {
        includeFontPadding: false
    },
    headerContainer:{
        width: '100%',
        height: 50,
        backgroundColor: '#256653',
        paddingTop: 10,
    },
    noneLineHeaderContainer:{
        width: '100%',
        height: 107,
        backgroundColor: '#256653',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        paddingTop: 50,
    },
    headerBox:{
        width: '100%',

    },
    headerTitle:{
        width:'80%',
        position:'absolute',
       justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginHorizontal: '10%'
    },
    headerTitleText:{
        fontSize: 18,
        color: "#fff",
        fontWeight:'500',
    },
    backIcon: {
        width: 28,
        height: 28,

        marginLeft: '3%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    closeIcon:{
        width: 28,
        height: 28,

        marginLeft: '3%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    qmIcon: {
        width: 28,
        height: 28,

marginLeft: '75%',
        position:'absolute',
       justifyContent: 'center',
      alignItems: 'flex-end',
      
    },
})
