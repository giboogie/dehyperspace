import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Image,
  ImageBackground,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton, CustomButtonHalf, SubHeader } from '../../../components'
import CustomInput from '../../../components/CustomInput';
import I18n from '../../../i18n/index';

import { RadioButton, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import * as signupAction from '../../../modules/auth/siginup/store';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-ui-lib';


class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pw: '',
      pwCheckType: null,
      email: '',
      emailCheckText: '',
      fd: '',

      btnDisable: true,
      genderChecked: 'male',
      ageGroup: '10',
      termsChecked: false,
      eventChecked: false,

      signupChecked: false,
      emailChecked: false,
    }
  }
  componentDidMount() {

  }
  componentDidUpdate() {
    if(this.props.signupStore.signupResult === 1){
      this.props.navigation.replace('Login')
    }else if(this.props.signupStore.errorLog){
      console.log(this.props.signupStore.errorLog)
      Alert.alert(
        this.props.signupStore.errorLog,
        "",
        [
          { text: "OK", onPress:() =>this.props.signupReset()}
        ],
        { cancelable: false }
      );
    }
    //id 중복 체크 확인 결과
    // const {signupStore} = this.props

    // if(!this.state.idChecked)
    // {

    //   if(signupStore.idCheckResult==1){
    //     //성공
    //     this.setState({idCheckText: '', idChecked: true})

    //   }else if(signupStore.idCheckResult==2){
    //     this.setState({idCheckText: I18n.t('translation.SignUp.text_8'), idChecked: true})
    //   }
    // }


    // //signup 버튼 활성화 확인
    if(this.state.signupChecked=== false)
    {
      console.log('버튼 활성화 체크')
      if(
        this.state.pwCheckType === true &&
        this.state.termsChecked === true &&
        this.state.emailChecked === true &&
        this.state.name != '' &&
        this.state.pw != '' &&
        this.state.email != '' &&
        this.state.fd != ''
      ){
        console.log('확인완료')
        this.setState({btnDisable: false, signupChecked: true})
      }else{
        console.log('버튼 숨김')
        this.setState({btnDisable: true, signupChecked: true})
      }
    }

    // // console.log(signupStore.signupResult)
    // //signup 요청 결과
    // if(signupStore.signupResult===1){
    //   navigation.navigate('Login')
    //   this.props.signupReset()
    // }else if(signupStore.signupResult===2){
    //   Alert.alert('회원가입 실패', '잘못된 패스워드 입니다.')
    //   this.props.signupReset()
    // }else if(signupStore.signupResult===3){
    //   Alert.alert('회원가입 실패', '잘못된 USDT 주소입니다.')
    //   this.props.signupReset()
    // }else if(signupStore.signupResult===4){
    //   Alert.alert('회원가입 실패', '중복되는 이메일 주소입니다.')
    //   this.props.signupReset()
    // }
  }

  emailCheck = () => {
    console.log('call')
   // this.setState({ idChecked: false, signupChecked: false })
    console.log(this.state.email)
    this.setState({ signupChecked: false, emailChecked: false })

    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


    if (this.state.emailChecked === false && regExp.test(this.state.email)) {
      this.setState({ emailChecked: true , emailCheckText: '' })

    } else {
      this.setState({ emailCheckText: '잘못된 이메일 형식입니다.' })
    }

  }
  nameCheck = () => {
    this.setState({ signupChecked: false })

    if (this.state.referrer != '') {
      this.props.refCheckRequest({ id: this.state.referrer })
    }

  }
  _signupRequest = () => {
    this.props.signupRequest({
      name: this.state.name,
      email: this.state.email,
      pw: this.state.pw,
      fd: this.state.fd,
      gender: this.state.genderChecked,
      ageGr: this.state.ageGroup,
      events: this.state.eventChecked
    })
  }

  pwCheck = (_pw) => {
    //첫번째 비밀번호 TextInput값과 비밀번호 확인 TextInput 검증 
    this.setState({ signupChecked: false })
    if (this.state.pw === _pw && _pw.length >= 6) {
      this.setState({ pwCheckType: true })
    } else if (this.state.pw !== _pw) {
      this.setState({ pwCheckType: false })
    } else {
      //여기서 영문 숫자 조합 체크를 넣어도 될것같음.
      this.setState({ pwCheckType: null })
    }
  }

  // isEmail = () => {
  //   this.setState({ signupChecked: false, emailChecked: false })

  //   var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  //   console.log(this.state.emailChecked)
  //   if (this.state.emailChecked === false && regExp.test(this.state.email)) {
  //     this.setState({ emailChecked: true, emailCheckText: '' })

  //   } else {
  //     this.setState({ emailCheckText: '잘못된 이메일 형식입니다.' })
  //   }

  // }

  render() {
    console.log(this.props.signupStore)
    const { navigation, signupStore } = this.props;

    // keyboardAvoidingView 의 android 알려진 문제로 behavior 를 기본으로 사용할것을 권장함
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 20
    const behavior = Platform.OS === 'ios' ? "padding" : null
    return (
      <View style={styles.rootContainer}>
        <SubHeader mode={'back'} title={"회원가입"} onPress={() => navigation.goBack()}></SubHeader>
        <KeyboardAvoidingView style={styles.avoidView} behavior={behavior} enabled keyboardVerticalOffset={keyboardVerticalOffset} >
          <ScrollView style={styles.scrollView}>
            <View style={styles.body_section}>
            </View>
            <View style={styles.body_section}>
              <View style={styles.body_title}>
                <Text style={[styles.body_title_text, styles.font]}>
                  이름
              </Text>
              </View>
              <CustomInput.Common
              placeholder={'NAME'}
              onChangeText={(_name) => {
                this.setState({ name: _name })
              }}
              
              >
                </CustomInput.Common>
                <View style={styles.body_title}>
                <Text style={[styles.body_title_text, styles.font]}>
                  이메일
              </Text>
              </View>
              <CustomInput.CheckIcon
                placeholder={'EMAIL'}
                onChangeText={(_email) => {
                  this.setState({ email: _email })
                }}
                onEndEditing={() => {
                  this.emailCheck()
                }}
                checkText={this.state.emailCheckText}
              ></CustomInput.CheckIcon>
            </View>

            <View style={styles.body_section}>
              <View style={styles.body_title}>

                <Text style={[styles.body_title_text, styles.font]}>
                  비밀번호
              </Text>
              </View>

              <CustomInput.Pw
                placeholder={I18n.t('translation.SignUp.text_2')}
                confirmPlaceholder={I18n.t('translation.SignUp.text_3')}
                onChangeText={(_pw) => { this.setState({ pw: _pw }) }}
                confirmOnChangeText={(_checkPw) => { this.pwCheck(_checkPw) }}
                checkPw={this.state.pwCheckType}
                checkText={'영문과 숫자를 조합하여 6자리 이상으로 구성하세요.'}
                errorText={'비밀번호가 일치하지 않습니다.'}
              ></CustomInput.Pw>
<View style={styles.body_title}>
                <Text style={[styles.body_title_text, styles.font]}>
                  소속
              </Text>
              </View>
              <CustomInput.Common
              placeholder={'foundation'}
              onChangeText={(_fd) => {
                this.setState({ fd: _fd })
              }}>
                </CustomInput.Common>
            </View>
            
            <View style={styles.body_section}>
              <View style={styles.gender_section}>
                <View style={styles.gender_left}>
                  <Text style={styles.font}>성별</Text>
                </View>
                <View style={styles.gender_right}>
                  <RadioButton.Android
                    value="male"
                    status={this.state.genderChecked === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => this.setState({ genderChecked: 'male', signupChecked: false })}
                    uncheckedColor='#fff'
                    color='#fff'
                  /><Text style={styles.font}>남자</Text>
                  <RadioButton.Android
                    value="female"
                    status={this.state.genderChecked === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => this.setState({ genderChecked: 'female' , signupChecked: false})}
                    uncheckedColor='#fff'
                    color='#fff'
                  /><Text style={styles.font}>여자</Text>
                </View>
              </View>
              <View style={styles.gender_section}>
                <View style={styles.gender_left}>
                  <Text style={styles.font}>연령대</Text>
                </View>
                <View style={styles.gender_right}>
                <RNPickerSelect
            onValueChange={(value) => this.setState({ageGroup:value , signupChecked: false})}
            placeholder={{}}
            style={{
              iconContainer:{
                
                height:20,
                width:80,
                left:50
              },
              inputIOS: {
                width:70,
                height: 25,
                marginLeft:5,
                backgroundColor:'rgba(255, 255, 255, 0.2);',
                paddingLeft:8,
                color: '#fff',
                borderRadius: 5
              },
              inputAndroid: {
                width:70,
                height: 25,
                marginLeft:5,
                backgroundColor:'rgba(255, 255, 255, 0.2);',
                paddingLeft:8,
                color: '#fff',
                borderRadius: 5
              },
            }}
            Icon={() => {
              return <Icon name="angle-down" size={20} color="#fff" />;
            }}
            items={[
                { label: '10대', value: '10' },
                { label: '20대', value: '20' },
                { label: '30대', value: '30' },
                { label: '40대', value: '40' },
                { label: '50대', value: '50' },
                { label: '60대', value: '60' },
            ]}
        />
                </View>
              </View>
            </View>
            <View style={styles.body_section}>
              <View style={styles.body_title}>
                <Text style={[styles.body_title_text, styles.font]}>
                  약관안내
              </Text>
              </View>
              <ScrollView style={styles.agree_container}>
                <Text style={styles.agree_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugi</Text>
              </ScrollView>
              <View style={styles.checkBox}>
              
              <Checkbox.Android
              disabled={false}
      status={this.state.termsChecked ? 'checked' : 'unchecked'}
      uncheckedColor='#fff'
            color='#fff'
      onPress={() => {
        this.setState({termsChecked:!this.state.termsChecked, signupChecked: false });
      }}
    /><Text style={styles.font}>이용약관 및 개인정보 처리방침 동의</Text>
                      </View>
                      <View style={styles.checkBox}>
                      <Checkbox.Android
              disabled={false}
      status={this.state.eventChecked ? 'checked' : 'unchecked'}
      uncheckedColor='#fff'
            color='#fff'
      onPress={() => {
        this.setState({eventChecked:!this.state.eventChecked, signupChecked: false});
      }}
    /><Text style={styles.font}>쿠폰 / 이벤트 알림 선택 동의</Text>
    </View>
            </View>


            <View style={styles.body_section}>
              <View style={styles.body_section_btn}>
                <CustomButton
                  title="SIGN UP"
                  nonClick={this.state.btnDisable}
                  onPress={() => this._signupRequest()}

                >
                </CustomButton>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030711',
  },
  font: {
    color: '#fff',
    includeFontPadding: false
  },
  avoidView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  body_section: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  body_section_btn: {
    width: '90%',
    height: 50
  },
  body_title: {
    width: '90%',
    marginBottom: 12,
    display: "flex",
    flexDirection: "row"
  },
  body_title_text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#121212'
  },
  nput_style: {
    width: '90%',
    height: 47.5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e8e8e8',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 8,

  },
  agree_container: {
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginRight: 15,
    marginLeft: 15,
    overflow: "scroll"
  },
  agree_text: {
    fontSize: 10,
    color: "#646464",
    height: 190
  },
  star: {
    marginRight: 5
  },
  button_half: {
    position: "absolute",
    bottom: 22,
    right: 18,
  },
  sns_register_container: {
    flexDirection: 'row',
    justifyContent: "center",
    width: '100%',
    marginBottom: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  sns_register: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
    paddingTop: 15,
    color: "white",
    borderRadius: 10,
    marginRight: 10
  },
  sns_register_last: {
    marginRight: 0
  },
  sns_register_txt1: {
    fontSize: 10,
    marginLeft: 55,
    fontWeight: "500"
  },
  sns_register_txt2: {
    fontSize: 10,
    marginLeft: 45,
    color: "white",
    fontWeight: "500"
  },
  sns_register_txt3: {
    fontSize: 10,
    marginLeft: 55,
    color: "white",
    fontWeight: "500"
  },
  sns_icon: {
    position: "absolute",
    top: 13,
    left: 15
  },
  logoImage: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 15,
    top: 13
  },
  gender_section: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:10

  },
  gender_left: {
    width: '15%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "flex-start",
  },
  gender_right: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "center",
  },
  pickerSelectStyles:{
    color:'#fff'
  },
  checkBox:{
    width:'95%',
    height:30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "flex-start",
  }
});

const mapStateToProps = (state) => ({
  signupStore : state.SignupStore,

});

const mapDispatchToProps = (dispatch) => ({
  signupRequest : (values) => dispatch(signupAction.signupRequest(values)),
  signupReset : () => dispatch(signupAction.signupReset()),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

export default connected;