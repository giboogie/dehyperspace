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
let isEmpty = function (value) { if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) { return true } else { return false } };

export default class FindCompleteScreen extends Component {
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

    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <SubHeader mode={'back'} title={"비밀번호 찾기"} onPress={() => navigation.goBack()}></SubHeader>
                <View style={styles.subContainer}>

                    <View>
                        <Text style={styles.font}>입력하신 메일로 초기화된 비밀번호가 전송되었습니다.</Text>
                        <Text style={styles.font}>스팸,소셜,프로모션 메일함도 꼭 확인해주세요.</Text>
                    </View>
                    <View style={styles.body_section}>
                        <View style={styles.body_section_btn}>
                            <CustomButton
                                title="findPW"
                                mode="completFont"
                                onPress={() => navigation.replace('Login')}
                            ></CustomButton>
                        </View>
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
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    body_section_btn: {
        width: '90%',
        height: 50
    },
});
