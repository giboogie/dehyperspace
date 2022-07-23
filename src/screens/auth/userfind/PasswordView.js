import React, { Component } from 'react';
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
import { fonts } from '../../../styles';
import { CustomButton, SubHeader } from "../../../components"
import CustomInput from '../../../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as userFindAction from '../../../modules/auth/userfind/store';
let isEmpty = function(value){ if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ return true }else{ return false } };

class PasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findCheck: false,
            emailChecked: false,
            emailCheckText: false,
            email: '',
            name: '',
            btnDisable: true,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
        if(this.props.userFind.findPWResult === 1){
            this.props.navigation.replace('FindComplete')
        }else if(this.props.userFind.findPWResult ===2){
            Alert.alert(
                "이메일이나 이름을 다시 확인해주세요.",
                [
                  { text: "OK" }
                ],
                { cancelable: false }
              );
                this.props.findPWClear()
        }else {

        }
        

        if(this.state.findCheck === false){

            console.log(this.state.email+this.state.name)
        if(this.state.email != '' && this.state.name != ''){
            this.setState({btnDisable: false, findCheck: true})
        }else{
            this.setState({btnDisable: true, findCheck: true})
        }
    }
    }
    emailCheck = () => {
        this.setState({ findCheck: false, emailChecked: false, emailCheckText: '' })
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


        if (this.state.emailChecked === false && regExp.test(this.state.email)) {
            this.setState({ emailChecked: true, emailCheckText: '' })

        } else if(this.state.emailChecked === true && this.state.findCheck === true){
            this.setState({ emailChecked: true, emailCheckText: '' })
        } 
        else {
            this.setState({ emailCheckText: '잘못된 이메일 형식입니다.' })
        }

    }
    _findPWRequest = (values) =>{
        const { navigation } = this.props;

        if(!isEmpty(values.name)&&!isEmpty(values.email)){
          //두개가 비어있지 않으면 
          this.props.findPWRequest(values)
          
        }else{
          Alert.alert(
            "이름, 메일을 입력해주세요",
            [
              { text: "OK" }
            ],
            { cancelable: false }
          );
        }
    }
    render() {
        const { navigation } = this.props;
        console.log(this.props.userFind.findPWResult)
        return (
            <View style={styles.container}>
                <SubHeader mode={'back'} title={"비밀번호 찾기"} onPress={() => navigation.goBack()}></SubHeader>
                <View style={styles.subContainer}>
                    <View style={styles.topText}>
                        <Text style={[styles.font, { fontSize: 20 }]}>이름</Text>
                    </View>

                    <CustomInput.Common
                        placeholder={'NAME'}
                        onChangeText={(_name) => {
                            this.setState({ name: _name ,findCheck:false })
                        }}

                    >
                    </CustomInput.Common>
                    <View style={styles.topText}>
                        <Text style={[styles.font, { fontSize: 20 }]}>이메일</Text>

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
              <View style={styles.body_section_btn}>
                <CustomButton
                  title="findPW"
                  nonClick={this.state.btnDisable}
                  onPress={() => this._findPWRequest({name:this.state.name, email:this.state.email})}

                ></CustomButton>
                            </View>
            </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030711"
    },
    subContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft:20,
        // marginRight:20,
        // paddingBottom: 10,
    },
    loadingStyle: {
        width: 50,
        height: 50,
    },
    font: {
        color: '#fff'
    },

    topText: {
        width: '90%',

        justifyContent: 'flex-end',
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
});

const mapStateToProps = (state) => ({
    userFind : state.UserFindStore
  
  });
  
  const mapDispatchToProps = (dispatch) => ({
    findPWRequest: (values) => dispatch(userFindAction.findPWRequest(values)),
    findPWClear: () => dispatch(userFindAction.findPWClear()),
  });
  
  const connected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordScreen);
export default connected