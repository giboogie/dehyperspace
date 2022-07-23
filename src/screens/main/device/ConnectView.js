import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    NativeModules,
    NativeEventEmitter,
    ImageBackground,
    Text,
 
} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import StepIndicator from '../../../components/StepIndicator';
import SubHeader from '../../../components/headerComponent/SubHeader';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class ConnectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peripherals: null,
            mac: null,
            name :null,
            ssid : null,
        }
    }
componentDidMount(){
    BleManager.start({ showAlert: false }).then(() => {
        // Success code
        console.log("Module initialized");
      });
}
    render() {
        const {navigation} = this.props

        return (
          <View style={styles.container}>
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
                        <StepIndicator step={1}></StepIndicator>
                        </View>
                        <Text style={styles.text}>기기의 전원이 켜져있는지 확인해주세요.</Text>
                    </View>
                    <View style={styles.explaBox}>
                    <ImageBackground 
                style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
                source={require("../../../../assets/images/deviceOn.png")}  //이미지경로
                resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.text}>모든 제품에 빨간불이 켜져있어야 합니다.</Text>
                        <Text style={styles.text}>확인 후 1번제품부터 연결이 시작되어 총 4번 진행됩니다.</Text>
                   
                    </View>
                    </View>

                </ImageBackground>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                    <CustomButton
                    title ='다음'
                    mode = 'nextFont'
                    onPress={() => navigation.navigate('Wifi')}>
                        <Text style={styles.text}>연결하기</Text>
                    </CustomButton>
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

    },
    testeBtn:{
        
          
    },
    stepHeader:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: '5%'
    },
    text:{
      color:'white'
    },
    mainContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        width:'90%',
        marginBottom: 16
    }, 
    explaBox:{
        width:'90%',
        height: 198,
        borderRadius: 10,
        marginBottom: 20,
    },
    botBtnView: {
        width: '90%',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        // position: 'absolute'
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19
    },
    nextBtn:{
        // position:'absolute',

        width:'100%',
        height:70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#5F6FA9',
        borderTopRightRadius: 10,
        borderTopLeftRadius:10

    }

});
export default ConnectScreen;