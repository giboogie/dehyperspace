/* 
    20.07.30 Auriga
    회원가입을 위한 CustomTextInput

    Properties 
    해당 속성은 dot notation 으로 접근 가능하게 개발하였습니다. e.g. <CustomInput.Common/>

    - 기존에 if/else 로 props를 mode, type 등으로 나누어 받은 뒤 조건부 렌더링으로 설계했습니다. (headerComponent 들이 그렇게 되어있습니다.)
    그런데 pw와 id값에 대한 상태 조건, 입력 비입력 상태에 대한 style 분기가 너무 많아서 코드가 너무 가독성이 안좋아져서 변경하였습니다.

    Common >
        props { 
            placeholder : type string, 플레이스 홀더값 props.
            checkText: type string, input box 밑에 경고or 알람 text
            onChangeText: type function , 텍스트가 변경될 때 function
            onEndEditing: type function, 변경이 완료될 때 function 

     }
    CheckIcon >
     props {
        placeholder: type string 
        checkText: type string 
        keyboardType: type string, 기본 TextInput의 props인 키보드 타입. e.g. keyboardType='numberic'
        onChangeText: type function , 텍스트가 변경될 때 function
        onEndEditing: type function, 변경이 완료될 때 function 
     } 
    Pw > (비밀번호 입력, 확인을 동시처리함)
         props {
         placeholder : type string ,  플레이스홀더값 props.,
         checkPlaceholder : type string,  textinput 플레이스 홀더값 props.
         placeholder: type string, 플레이스 홀더값 props.
         confirmPlaceholder: type string, 플레이스 홀더값 props.
         checkText: type string
         errorText: type string
         checkPw: type bool
         onChangeText: type function
         confirmOnChangeText: type function

     } 
     
*/


import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

import { fonts } from '../styles';

const CustomInputText = {
    Common : class Common extends React.Component{
        static defaultProps = {
            placeholder: '',
            checkText: '',
            onChangeText: () => null,
            onEndEditing: () => null,
        }
        constructor(props) {
            super(props);
            this.state = {
                id: null,
                idCheck: false,
                isFocused: false,
            }
        }
        render() {
            let checkInput = null;
            let _checkText =null;
                checkInput = <TextInput style={(this.state.isFocused) ? (styles.body_input_style) : (styles.body_input_outFocusedStyle)}
                    autoCapitalize='none'    
                onFocus={() => { this.onFocusChange(true) }}
                    onBlur={() => { 
                        this.onFocusChange(false)
                        // this.props.onEndEditing
                     }}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={'rgba(255, 255, 255, 0.6);'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.onChangeText}
                    //onEndEditing={this.props.onEndEditing}
                />
                _checkText = <View style={{width:'90%'}}><Text style={[styles.font, styles.pw_text_style02]}>{this.props.checkText}</Text></View>;
            return (
                <View style={styles.mainContainer}>
                    {checkInput}
                    {_checkText}
                </View>
            );
        }
        onFocusChange = (value) => {
            this.setState({ isFocused: value })
        }
    },
    CheckIcon: class CheckIcon extends React.Component{
        static defaultProps ={
            placeholder: '',
            checkText: '',
            keyboardType: 'default',
            onChangeText: () => null,
            onEndEditing: () => null,

        }
        constructor(props) {
            super(props);
            this.state = {
                id: null,
                idCheck: false,
                isFocused: false,
            }
        }
        render() {
            let checkInput = null;
            let _checkText =null;
                checkInput = <TextInput style={(this.state.isFocused) ? (styles.body_input_style) : (styles.body_input_outFocusedStyle)}
                autoCapitalize='none'       
                onFocus={() => { this.onFocusChange(true) }}
                    onBlur={() => { 
                        this.onFocusChange(false)
                        this.props.onEndEditing()
                    }}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={'rgba(255, 255, 255, 0.6);'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                />
                _checkText = <View style={{width:'90%'}}><Text style={[styles.font, styles.pw_text_style02]}>{this.props.checkText}</Text></View>;
            return (
                <View style={styles.mainContainer}>
                    {checkInput}
                    {_checkText}
                </View>
            );
        }
        onFocusChange = (value) => {
            this.setState({ isFocused: value })
        }
    },
    Pw: class Pw extends React.Component{
        static defaultProps = {
            placeholder: '',
            confirmPlaceholder: '',
            checkText: '',
            errorText: '',
            checkPw: null,
            onChangeText: () => null,
            // onEndEditing: () => null,
            confirmOnChangeText: () => null,
            // confirmOnEndEditing: () => null,
        };
        constructor(props) {
            super(props);
            this.state = {
                pw: null,
                pwCheck: null,
                isFocused: false,
                pwCheckFocused: false,
                pwIsFocused: false,
            }
        }
        render() {
            let checkInput = null;
            let checkText =null;
            checkInput =
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TextInput style={(this.state.isFocused) ? (styles.body_input_style) : (styles.body_input_outFocusedStyle)}
                                        autoCapitalize='none'   
                    onFocus={() => { this.onFocusChange(true) }}
                    onBlur={() => { this.onFocusChange(false) }}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={'rgba(255, 255, 255, 0.6);'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={true}
                />
                <TextInput style={(this.state.pwCheckFocused) ? (styles.body_input_style) : (styles.body_input_outFocusedStyle)}
                                        autoCapitalize='none'   
                    onFocus={() => { this.onPasswordFocusChange(true) }}
                    onBlur={() => { this.onPasswordFocusChange(false) }}
                    placeholder={this.props.confirmPlaceholder}
                    placeholderTextColor={'rgba(255, 255, 255, 0.6);'}
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.confirmOnChangeText}
                    secureTextEntry={true}
                />
                {/* {this.state.pwCheck ? (<View style={{width:'90%'}}><Text style={[styles.font, styles.pw_text_style01]}>비밀번호가 일치하지 않습니다.</Text></View>)
                    : (
                        
                    )} */}
            </View>
            if(this.props.checkPw === false){
                checkText = <View style={{width:'90%'}}><Text style={[styles.font, styles.pw_text_style01]}>{this.props.errorText}</Text></View>;
            }else if(this.props.checkPw === true){
                checkText =<View style={{width:'90%'}}><Text style={[styles.font, styles.pw_text_style02]}></Text></View>;
            }else {
                checkText = <View style={{width:'90%'}}><Text style={[styles.font, styles.pw_text_style02]}>{this.props.checkText}</Text></View>;
            }
            return(
                <View style={styles.mainContainer}>
                {checkInput}
                {checkText}
            </View>
            )
        }
        onFocusChange = (value) => {
            this.setState({ isFocused: value })
        }
        onPasswordFocusChange = (value) => {
            this.setState({ pwCheckFocused: value })
        }
    }
    

}
export default CustomInputText;
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        alignItems: 'center'
    },
    font: {
        includeFontPadding: false
      },
      pw_text_style01:{
        fontSize: 12,
        color: '#ff6600'
      },
      pw_text_style02:{
        fontSize: 12,
        color: '#b4b4b4'
      },
    container: {
        width: '90%',
        alignItems: 'center',

        padding: 10
    },
    body_input_style: {
        width: '90%',
        height: 47.5,
        backgroundColor: 'rgba(255, 255, 255, 0.2);',

        borderRadius: 8,
        color:'#fff',
        borderColor: '#e8e8e8',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: 8,
    },
    body_input_outFocusedStyle: {
        width: '90%',
        height: 47.5,
        backgroundColor: 'rgba(255, 255, 255, 0.2);',

        borderRadius: 8,
        color:'#fff',
        borderColor: '#e8e8e8',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: 8,
    }
})


