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

export default class DeviceComplateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                <SubHeader mode={'back'} title={"기기 설정 완료"} onPress={() => navigation.goBack()}></SubHeader>
                <View style={styles.subContainer}>

                    <View>
                        <Text style={styles.font}>기기가 모두 설정되었습니다.</Text>

                    </View>
                    <View style={styles.body_section}>
                        <View style={styles.body_section_btn}>
                            <CustomButton
                                title="findPW"
                                mode="completFont"
                                onPress={() => navigation.replace('Main')}
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
