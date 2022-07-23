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
    NativeModules,
    NativeEventEmitter,
    TextInput
} from 'react-native';
import StepIndicator from '../../../components/StepIndicator';
import Modal from 'react-native-modal';
import WifiManager from "react-native-wifi-reborn";
import AnimatedLoader from "react-native-animated-loader";
import CustomButton from '../../../components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import SubHeader from '../../../components/headerComponent/SubHeader';
class WifiScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peripherals: null,
            mac: null,
            name: null,
            ssid: null,
            pw: null,
            email: null,
            isModalVisible: false,
            isLoadingVisible: false,
            stepNumber: false
        }
    }
    componentDidMount() {
        WifiManager.getCurrentWifiSSID().then(
            ssid => {
                console.log("Your current connected wifi SSID is " + ssid);
                this.setState({ ssid: ssid });
            },
            () => {
                console.log("Cannot get current SSID! ");
                this.setState({ ssid: null })
            }
        );
        AsyncStorage.getItem('email',(err,result) =>{
            this.setState({email:result})
        })
    }
    toggleModal = () => {
        console.log('modal call')
        this.setState({ isModalVisible: !this.state.isModalVisible })
        this.setState({ stepNumber: !this.state.stepNumber })
    }
    pwCheck = () => {
        this.toggleModal();
        this.props.navigation.navigate('Device', { pw: this.state.pw, ssid: this.state.ssid, email:this.state.email });
    }
    render() {
        const { navigation } = this.props
        const wifiState = this.state.ssid
        let wifiStateBox;
        if (wifiState) {
            wifiStateBox =
                <View style={styles.explaTextBox}>
                    <Text style={styles.text}>기기와 연결된 와이파이</Text>
                    <Text style={styles.text}>{this.state.ssid}</Text>
                    <Text style={styles.text}>연결된 와이파이가 맞다면 다음을 눌러 계속 진행해주세요.</Text>
                </View>
        } else {
            wifiStateBox =
                <View style={styles.explaTextBox}>
                    <Text style={styles.text}>기기와 연결된 와이파이</Text>
                    <Text style={styles.text}>연결된 와이파이가 없습니다.</Text>
                    <Text style={styles.text}>와이파이를 다시 확인해주세요.</Text>
                </View>
        }
        return (



            <View style={styles.container}>
                <AnimatedLoader
                    visible={this.state.isLoadingVisible}
                    overlayColor="rgba(0,0,0,0.5)"
                    source={require("./loading.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                ><Text></Text>
                </AnimatedLoader>
                <ImageBackground
                    style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
                    source={require("../../../../assets/images/spacebackground.jpg")}  //이미지경로
                    resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                >
                    <SubHeader mode={'back'} title={""} onPress={()=>navigation.goBack()}></SubHeader>
                    <View>

                    </View>
                    <View style={styles.mainContainer}>
                        <View style={styles.header}>
                            <View style={styles.stepHeader}>
                                <StepIndicator step={this.state.stepNumber ? (3) : (2)}></StepIndicator>
                            </View>
                            <Text style={styles.text}>dehyperspace v1.0</Text>
                        </View>
                        <View style={styles.explaBox}>
                            <Image
                                style={{ width: 150, height: 150 }}
                                source={require("../../../../assets/images/wifiImage.png")}
                                resizeMode="cover"
                            >
                            </Image>
                        </View>
                        <View style={styles.header}>
                            {wifiStateBox}

                        </View>
                    </View>

                </ImageBackground>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                    title ='다음'
                    mode = 'nextFont'
                    onPress={() => this.toggleModal()}>
                        <Text style={styles.text}>연결하기</Text>
                    </CustomButton>
                    </View>
                </View>
                <Modal
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}
                    hideModalContentWhileAnimating={false}
                    onBackdropPress={() => this.toggleModal()}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text>암호를 입력해주세요.</Text>
                        </View>
                        <View style={styles.modalBot}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={true}
                                onChangeText={(pw) => this.setState({ pw })}
                                onSubmitEditing={() => this.pwCheck()}>
                            </TextInput>
                        </View>
                    </View>
                </Modal>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    testeBtn: {


    },
    stepHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: '5%'
    },
    text: {
        color: 'white'
    },
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '90%',
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    explaBox: {
        width: '90%',
        height: 160,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff'
    },
    botBtnView: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        // position: 'absolute'
    },
    explaTextBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19
    },
    nextBtn: {
        // position:'absolute',

        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5F6FA9',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10

    },
    modal: {
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeader: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    textInput: {
        width: '90%',
        height: 30,
        borderBottomWidth: 1,
        borderColor: '#000'
    },
    modalBot: {
        width: '100%',
        alignItems: 'center',

    }

});
export default WifiScreen;