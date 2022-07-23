import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    FlatList,
    Dimensions,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import * as loginAction from '../../../modules/auth/login/Authstore';
import Modal from 'react-native-modal';
import SubHeader from '../../../components/headerComponent/SubHeader';
class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
           
        }
    }
   _logout = () =>{
    const {navigation} = this.props;
    AsyncStorage.clear();
    this.props.logout();
    navigation.replace('root');
   }
    render() {
        const { navigation, route } = this.props
       console.log(route)
        return (
            <View style={styles.container}>
<View style={styles.subContainer}>
                    <SubHeader mode={'back'} title={"앱 설정"} onPress={()=>navigation.goBack()}></SubHeader>
<View style={styles.accountContainer}>
    <TouchableOpacity style={styles.account}>
        <Text style={styles.font}>디하이퍼스페이스 계정관리</Text>
    </TouchableOpacity>
    <View  style={styles.line}></View>
    <TouchableOpacity style={styles.account}>
        <Text style={styles.font}>디하이퍼스페이스 닉네임 설정</Text>
    </TouchableOpacity>
</View>
<View style={styles.notiContainer}>
<TouchableOpacity style={styles.account}>
        <Text style={styles.font}>앱 알림</Text>
    </TouchableOpacity>
</View>
<View style={styles.notiContainer}>
<TouchableOpacity 
style={styles.account}
onPress={()=>this._logout()}>
        <Text style={styles.font}>로그아웃</Text>
    </TouchableOpacity>
    
</View>

</View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: '#030711',
        justifyContent: 'center'

    },
    subContainer:{
        width:'100%',
        height:'100%',
    },
    font: {
        color: '#fff'
    },
    line : {
        borderBottomColor:'#acacac',
        borderBottomWidth:1, 
        borderRadius:1,
        width:'90%',
    },
    accountContainer:{
        width: '100%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2);'
    },
    account:{
        width: '100%',
        paddingHorizontal:'5%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    notiContainer:{
        marginTop: 16,
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2);'
    }

});
  const mapStateToProps = (state) => ({

  });
  
  const mapDispatchToProps = (dispatch) => ({
    logout : (values) => dispatch(loginAction.logout(values)),
  });
  
  const connected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SettingScreen);
  
  export default connected;
  