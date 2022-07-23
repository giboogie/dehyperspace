import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import { fonts } from '../../../styles';
import {CustomButton} from "../../../components"


export default class SnsLoginView extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
    render(){
        return(
        <View style={styles.container}>
            <View style={styles.sns_main}>
                <Image style={styles.logoImage}
                        source={require('../../../../assets/images/haru_logo.png')}
                        resizeMode='contain'
                />
                <View>
                    <Text style={styles.sns_main_txt}>하루모임</Text>
                </View>
                <View>
                    <Text style={styles.sns_sub_txt}>하루 하루가 즐거운 모임</Text>
                </View>
            </View>
            <View style={styles.auth_container}>
                <View>
                    <Text style={styles.sns_input_txt}>카카오로 로그인</Text>
                </View>
                <TextInput 
                    placeholder="카카오톡 아이디"
                    underlineColorAndroid='transparent'
                    style={styles.sns_input}
                />
                <TextInput 
                    placeholder="비밀번호"
                    underlineColorAndroid='transparent'
                    style={styles.sns_input}
                />
                <TouchableOpacity style={[styles.authBtn, {backgroundColor:"#F9E000"}]}>
                    <Text style={styles.authBtnTxt}
                        onPress={() => {}}
                    >LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:20,
        marginRight:20
    },
    sns_main:{
        justifyContent:"center",
        alignItems:"center",
        padding:50,
    },
    sns_main_txt:{
        color:"#F5A4C7",

        fontSize:35,
        marginBottom:5
    },
    sns_sub_txt:{
        color:"#F5A4C7",

    },
    sns_input_txt:{
        fontSize:20,
        fontWeight:"400",

    },
    sns_input:{
        borderWidth:1,
        padding:15,
        borderRadius:10,
        borderColor:"#E2E2E2",
        marginTop:15
    },
    authBtn : {
        padding:10,
        borderRadius:10,
        marginTop:24
    },
    authBtnTxt:{
        textAlign:"center",
        fontWeight:"700",
        fontSize:18,
        color:"white"
    }
  });