import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

// import * as loginActions from '../../modules/auth/login/Authstore';
//임시 로딩 페이지. 사용할지 말지 고려중
import { fonts, colors } from '../../styles';

let emailCheck;
let tokenCheck;
AsyncStorage.getItem('token',(err,result) =>{
  token = result
  console.log('token' + token)
  console.log('token error' + err)
})
AsyncStorage.getItem('email',(err,result) =>{
  email = result
  console.log('email' + email)
})
class AuthLoadingScreen extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
      const {navigation} = this.props;
      // if(emailCheck === 'null' && tokenCheck === 'null'){
      //   console.log('null?')
      // }else{
      //   navigation.replace('Main')
      // }
      // navigation.navigate('Login')
      this.checkLogin()
    }
async checkLogin() {
  const {navigation} = this.props;
  try{
    let token = await AsyncStorage.getItem('token');
    let email = await AsyncStorage.getItem('email');

    if (token != null && email != null ){
      navigation.replace('Home')
    }else{

    }
  }catch(error){
    //error 
  }
}
    render(){
      const {navigation} = this.props;
        return (
            <View style={styles.container}>
                                  <ImageBackground
                        style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
                        source={require("../../../assets/images/spacebackground.jpg")}  //이미지경로
                        resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                    >
                    <View style={styles.logo}>
                               <Image
        style={{width:120, height:161}}
        source={require('../../../assets/images/dehylogo.png')}
        resizeMode="stretch" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택
      /> 
      </View>
                    <View style={styles.btnContainer}>
                      
                      <View style={styles.botBtn}>
              <TouchableOpacity style={styles.botBtnTouch}
              onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.font}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botBtnTouch}
               onPress={()=>navigation.navigate('SignUp')}>
                <Text style={styles.font}>SIGN UP</Text>
              </TouchableOpacity>
              </View>
              </View>
              </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#030711',
    },
    font:{
      color:'#fff'
    },
    logo:{
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
    },
    btnContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems:'center',
      flexDirection: 'column',
      // position: 'absolute'
  },
  botBtn: {
      width: '80%',
      height: 'auto',
      marginBottom: 100
  },
  botBtnTouch:{
    width:'100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginBottom: 10
  }
  });
  
// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = (dispatch) => ({
// })

// const connected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AuthLoadingScreen)
export default AuthLoadingScreen;