import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import {CustomButton} from "../../../components"
import Icon from 'react-native-vector-icons/FontAwesome';
import * as loginAction from '../../../modules/auth/login/Authstore';
import AnimatedLoader from "react-native-animated-loader";
let isEmpty = function(value){ if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ return true }else{ return false } };
class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        iconUrl : "tiny_logo.png",
        email: '',
        password: '',
      }
    }
componentDidMount = () =>{

}
componentDidUpdate() {
  if(this.props.auth.result === 1 ){
    this.props.navigation.replace('Home')
    console.log(this.props.auth)
  }else if(this.props.auth.result ===2) {
    console.log(this.props.auth.errors)
    Alert.alert(
      this.props.auth.errors, undefined,
      [
        { text: "OK" }
      ],
    );
    this.props.loginClear()
  }

}
_error(){
  const {navigation} = this.props
  if(this.props.auth.errors){
      Alert.alert(
          "네트워크 에러",undefined
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ],
          { cancelable: false }
        );
      console.log("네트워크에러")
  }
}
// 이메일 체크 정규 함수 
/*
validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    console.log("Email is Not Correct");
    this.setState({ email: text })
    return false;
  }
  else {
    this.setState({ email: text })
    console.log("Email is Correct");
  }
}
*/
  _loginRequest =  (values) => {
    const { navigation } = this.props;

    if(!isEmpty(values.email)&&!isEmpty(values.password)){
      //두개가 비어있지 않으면 
      this.props.loginRequest(values)
      
    }else{
      Alert.alert(
        "아이디, 비밀번호를 입력해주세요",undefined
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );

    }
    
}
    

  
    render(){
      console.log(this.state)
      console.log(this.props.auth)
      const {navigation} = this.props;
        return(
         <View style={styles.container}>
                                        <AnimatedLoader
                        visible={this.props.isLoadingVisible}
                        overlayColor="rgba(0,0,0,0.5)"
                        source={require("../../../components/loading.json")}
                        animationStyle={styles.loadingStyle}
                        speed={1}
                    ><Text></Text>
                    </AnimatedLoader>
          <ScrollView>
            <View style={styles.subContainer}>

              <View style={styles.topText}>
                <Text style={[styles.font, {fontSize: 20}]}>LOGIN</Text>
              </View>
            <View style={styles.auth_container}>
                <TextInput 
                    placeholder="Email"
                    underlineColorAndroid='transparent'
                    style={styles.sns_input}
                    autoCapitalize='none'
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder="Password"
                    underlineColorAndroid='transparent'
                    style={styles.sns_input}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    onChangeText={(password) => this.setState({ password })}
                />
                <TouchableOpacity style={styles.auth_btn}
                // onPress={()=> navigation.replace('Main')}>
                onPress={()=> {this._loginRequest({email:this.state.email, password:this.state.password})}}>
                                                      <ImageBackground
                                    style={styles.BtnImg}
                                    source={require("../../../../assets/images/box/btnBox2.png")}  //이미지경로
                                    resizeMode="stretch" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                                ></ImageBackground>
                    {/* <Text style={styles.auth_btn_txt}>LOGIN</Text> */}
                    <Image style={styles.btnIcon}
                                source={require("../../../../assets/images/box/loginFont.png")}></Image>
                </TouchableOpacity>
                <View style={styles.pw_findBox}>
                <View style={styles.pw_find}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('UserFind')}
                  >
                        <Text style={[styles.pw_find_txt, styles.pw_find_txt1]}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={[styles.pw_find_txt, styles.pw_find_txt2]}>회원가입하기</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <Text style={styles.or}>OR</Text>
                <View style={styles.sns_btn_container}>
                  <TouchableOpacity style={[styles.sns_btn, {backgroundColor:'rgba(255, 255, 255, 0.25)'}]}>
                      <Image style={[styles.sns_icon, styles.sns_kakao]}
                            source={require('../../../../assets/images/google.png')}
                            resizeMode='cover'
                      />
                      <Text style={styles.sns_btn_txt}>구글로 로그인하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.sns_btn, {backgroundColor:'rgba(255, 255, 255, 0.25)'}]}>
                      <Image style={[styles.sns_icon, styles.sns_kakao]}
                            source={require('../../../../assets/images/kakaotalk.png')}
                            resizeMode='cover'
                      />
                      <Text style={styles.sns_btn_txt}>카카오톡으로 로그인하기</Text>
                  </TouchableOpacity>
                </View>
            </View>

        </View> 
        </ScrollView>
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:"#030711"
    },
    subContainer:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
        // marginLeft:20,
        // marginRight:20,
        // paddingBottom: 10,
    },
    loadingStyle:{
      width:50,
      height:50,
  },
    font:{
      color:'#fff'
    },
    sns_main:{
        justifyContent:"center",
        alignItems:"center",
        padding:50,
    },
    sns_main_txt:{
        color:"#rgba(124, 155, 222, 1)",

        fontSize:35,
        marginBottom:5
    },
    sns_sub_txt:{
        color:"#rgba(124, 155, 222, 1)",

    },
    sns_input_txt:{
        fontSize:20,
        fontWeight:"400",
        color:'#fff'

    },
    sns_input:{
      width:'90%',
      height: 50,
      padding: 10,
        borderWidth:1,
        // padding:15,
        borderRadius:10,
        borderColor:"#E2E2E2",
        marginTop:15,
        color:'#fff'
    },
    auth_btn : {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 58,
        borderRadius:10,
        marginTop:24
    },
    BtnImg:{
      width: '100%',
      height: '100%',
      position:'absolute'
    },
    auth_btn_txt:{
        textAlign:"center",
        fontWeight:"700",
        fontSize:18,
        color:"white"
    },
    pw_findBox:{
      width: '90%',
      alignItems:"center",
      justifyContent:"center"
    },
    pw_find: {
      width:'45%',
      flexDirection:"row",
      justifyContent:"space-between"
    },
    pw_find_txt:{
      paddingTop:10,
      color:'#fff',
      fontSize:12
    }, 
    pw_find_txt1: {
      marginRight:24
    },
    pw_find_txt2: {
      marginRight:0
    },
    or:{
      fontSize:18,
      textAlign:"center",
      color:'#fff',
      marginTop:24,
      fontWeight:"700"
    },
    sns_icon: {
      position:"absolute",
      width: 40,
      height: 40,
      top:10,
      left:80
    },
    sns_kakao:{
      top:0,
      left:65
    },
    sns_btn :{
      borderRadius:10,
      marginTop:16,
      paddingTop:15,
      paddingBottom:15
    },
    sns_btn_txt:{
      color: "white",
      fontWeight:"700",
      fontSize:14,
      marginLeft:135,
      textAlignVertical:"center",
  },
  topText:{
    width:'90%',
    height: 100,
    justifyContent: 'flex-end',
  },
  auth_container:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sns_btn_container:{
    width:'90%'
  },
  btnIcon:{
    width: 75,
    height: 50
  },
  kakao:{
    }
  });

  const mapStateToProps = (state) => ({
    auth : state.AuthStore,
    isLoadingVisible : state.AuthStore.isLoadingVisible
  });
  
  const mapDispatchToProps = (dispatch) => ({
    loginRequest : (values) => dispatch(loginAction.loginRequest(values)),
    loginClear : (values) => dispatch(loginAction.loginClear(values)),
  });
  
  const connected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen);
  
  export default connected;
  