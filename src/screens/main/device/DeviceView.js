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
} from 'react-native';
import StepIndicator from '../../../components/StepIndicator';
import WifiManager from "react-native-wifi-reborn";
// import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { stringToBytes } from 'convert-string';
import { bytesToString } from 'convert-string';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-community/async-storage';
import SubHeader from '../../../components/headerComponent/SubHeader';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function DeviceChecking({number}) {

  if(number === 0){
    return <View style={[styles.deviceCheck, styles.deviceFalse]}><AntIcon name='close' size={20} color='#fff' /></View>
  }else if (number === 1) {
    return <View style={[styles.deviceCheck, styles.deviceTrue]}><AntIcon name='check' size={20} color='#fff' /></View>
  }else if(number ===2) {
    return <View style={[styles.deviceCheck, styles.deviceError]}><AntIcon name='exclamation' size={20} color='#fff' /></View>
  }
}
function DeviceAllChecking({number}) {

  if(number === 0){
    return <View style={styles.checkTextBox}><Text style={styles.text}>기기를 연결중입니다.</Text><LottieView style={styles.lottie} source={require('./loading.json')} autoPlay loop /></View>
  }else if (number === 1) {
    AsyncStorage.setItem('device','update',() =>{
    
  })
    return <View></View>
  }else{
    return <View></View>
  }
}
class DeviceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanning: false,
      peripherals: null,
      email:null,
      mac: null,
      name: null,
      ssid: null,
      pw: null,
      deviceCheck: false,
      device: [
        {
          no: 0,
          name: null,
          mac: null,
          status: 0,
        },
        {
          no: 1,
          name: null,
          mac: null,
          status: 0,
        },
        {
          no: 2,
          name: null,
          mac: null,
          status: 0,
        },
        {
          no: 3,
          name: null,
          mac: null,
          status: 0,
        }
      ] //name,mac
    }
  }
       
  componentDidMount() {

    const { navigation, route } = this.props
    console.log(route.params.ssid)
    this.setState({ ssid: route.params.ssid })
    this.setState({ pw: route.params.pw })
    this.setState({ email: route.params.email})
    BleManager.start({ showAlert: false })

    this.handleUpdateValue = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic
    );
    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral', (args) =>{this.handleDiscoverPeripheral(args)}
      
    );
    // this.handlerStop = bleManagerEmitter.addListener(
    //       'BleManagerStopScan', 
    //       this.handleStopScan
    // );
    setTimeout(() => {
      this.scanForDevices();
    }, 1000);

  }

  componentDidUpdate() {
    if (this.state.device[3].status == 1){
      setTimeout(() =>{
        this.props.navigation.navigate('DeviceComplete')
      }, 1000);
    }
    if (this.state.device[0].status == 1) {
      console.log('no 0 connceted')
      setTimeout(() => {
        this.scanForDevices();
      }, 1000);
    }
  }
  componentWillUnmount() {
    this.handlerDiscover.remove;
    this.handleUpdateValue.remove();
    this.setState({
      isScanning: false,
      peripherals: null,
      email:null,
      mac: null,
      name: null,
      ssid: null,
      pw: null,
      deviceCheck: false,
      device: [
        {
          no: 0,
          name: null,
          mac: null,
          status: 0,
        },
        {
          no: 1,
          name: null,
          mac: null,
          status: 0,
        },
        {
          no: 2,
          name: null,
          mac: null,
          status: 0,
        },
        {
          no: 3,
          name: null,
          mac: null,
          status: 0,
        }
      ] //name,mac

    })
  }
  scanForDevices = () => {

    BleManager.scan([], 5).then((results) => {
      console.log('Scanning...');
      console.log(results)

    }).catch(err => {
      console.error(err);
    });

  }

  handleDiscoverPeripheral = (peripheral) => {
    const { peripherals, device } = this.state;
    console.log('discover start')
    console.log("localName:"+ peripheral.advertising.localName)
    console.log("name:"+ peripheral.name)
    console.log("advertising:"+ JSON.stringify(peripheral.advertising))
    // BleManager.retrieveServices(peripheral.name).then(
    //   (peripheralInfo) => {
    // //     // Success code
    //     console.log("Peripheral info:", peripheralInfo);
    // //   })
    // console.log("==========" + peripheral.name)
    // console.log("==========" + device[1].status)
    if (device[0].status === 0) {
      if (peripheral.advertising.localName == 'freezer_body') {
        this.setState({ mac: peripheral.id });
        this.setState({ name: 'freezer_body' });
        this.setState({
          device: device.map(
            item => item.no === 0 ? { ...item, ...{ name: peripheral.name, mac: peripheral.id } }
              : item
          )
        })
        this.handleConnect(this.state.mac, 0)
      }
    } else if (device[1].status === 0) {
      if (peripheral.advertising.localName == 'freezer_door') {
        this.setState({ mac: peripheral.id });
        this.setState({ name: 'freezer_door' });
        this.setState({
          device: device.map(
            item => item.no === 1 ? { ...item, ...{ name: peripheral.name, mac: peripheral.id } }
              : item
          )
        })
      }
      this.handleConnect(this.state.mac, 1)

    }
    else if (device[2].status === 0) {
      if (peripheral.advertising.localName == 'fridge_door') {
        this.setState({ mac: peripheral.id });
        this.setState({ name: 'fridge_door' });
        this.setState({
          device: device.map(
            item => item.no === 2 ? { ...item, ...{ name: peripheral.name, mac: peripheral.id } }
              : item
          )
        })
      }
      this.handleConnect(this.state.mac, 2)

    }
    else if (device[3].status === 0) {
      if (peripheral.advertising.localName == 'fridge_body') {
        this.setState({ mac: peripheral.id });
        this.setState({ name: 'fridge_body' });
        this.setState({
          device: device.map(
            item => item.no === 3 ? { ...item, ...{ name: peripheral.name, mac: peripheral.id } }
              : item
          )
        })
      }
      this.handleConnect(this.state.mac, 3)

    }
    // this.setState({ peripherals });
  // })
  };

  handleStopScan = () => {
    BleManager.stopScan().then(() => {
      console.log('Scan is stopped. Devices: ', this.state.mac);
    })
  }
  handleConnect = (address, num) => {
    BleManager.connect(address).then(() => {
      console.log("Connected" + address);
      this.handleStopScan();
      this.handlePWWrite(this.state.device[num].mac, this.state.device[num].no)

    }).catch((error) => {
      console.log(error)
    });
  }
  handleDisconnect = (address) => {
    BleManager.disconnect(address).then(() => {
      console.log("Disconnected");
    }).catch((error) => {
      console.log(error)
    });
  }
  handleUpdateValueForCharacteristic = ({ value, peripheral, characteristic, service }) => {
    const { peripherals, device } = this.state;
    // Convert bytes array to string
    const data = bytesToString(value);
    console.log(`Recieved ${data} for characteristic ${characteristic}`);
    if (!data) {
      console.log('status update fail')
    } else if(data ==0) {
      if (device[0].status == 0) {
        this.setState({
          device: device.map(
            item => item.no === 0 ? { ...item, ...{ status: 1 } }
              : item
          )
        })
      } else if (device[1].status == 0) {
        this.setState({
          device: device.map(
            item => item.no === 1 ? { ...item, ...{ status: 1 } }
              : item
          )
        })
      }
      else if (device[2].status == 0) {
        this.setState({
          device: device.map(
            item => item.no === 2 ? { ...item, ...{ status: 1 } }
              : item
          )
        })

      }
      else if (device[3].status == 0) {
        this.setState({
          device: device.map(
            item => item.no === 3 ? { ...item, ...{ status: 1 } }
              : item
          )
        })
        this.handlerDiscover.remove;
      }
      console.log('status update complate')
      this.handleDisconnect(this.state.mac);
    }else if(data == 1){
      console.log('WifiPw error')
      console.log("index"+this.state.device.findIndex(x => x.mac === this.state.mac))
      this.setState({
        device: device.map(
          item => item.no === this.state.device.findIndex(x => x.mac === this.state.mac) ? { ...item, ...{ status: 2 } }
            : item
        )
      })
      this.handleUpdateValue.remove();
      this.handleDisconnect(this.state.mac);
    }
  }

  handlePWWrite = (address, no) => {
    const { device } = this.state;
    BleManager.retrieveServices(address).then(
      (peripheralInfo) => {
        // Success code
        console.log("Peripheral info:", peripheralInfo.services[0]);
        console.log("Peripheral info:", peripheralInfo.name);
        console.log("Peripheral info:", peripheralInfo.id);
        console.log("Peripheral info:", peripheralInfo.id);
        const dataID = stringToBytes("!" + this.state.ssid);
        const dataPW = stringToBytes("@"+this.state.pw);
        const dataIP = stringToBytes("#192.168.0.158");
        const dataEmail = stringToBytes("$"+this.state.email);
        //console.log(data
        BleManager.write(address, peripheralInfo.services[0], "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", dataID).then(() => {
          console.log("WriteID: " + dataID);
          BleManager.write(address, peripheralInfo.services[0], "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", dataPW).then(() => {
            console.log("WritePW: " + dataPW)
            BleManager.write(address, peripheralInfo.services[0], "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", dataIP).then(() => {
              console.log("WriteIP: " + dataIP)
              BleManager.write(address, peripheralInfo.services[0], "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", dataEmail).then((data) => {
                console.log("WriteEmail: " + dataEmail)

                BleManager.startNotification(address, peripheralInfo.services[0], "6E400003-B5A3-F393-E0A9-E50E24DCCA9E").then((readData) => {
                  console.log("Read: " + readData);

                }).catch((error) => {
                  console.log(error + "readError")
                })
              }).catch((error) => {
                console.log(error + "emailError")
              })
            }).catch((error) => {
              console.log(error + "ipError")
            })
          }).catch((error) => {
            console.log(error + "pwError")
          })
        }).catch((error) => {
          console.log(error + "idError")
        })
      }
    )
  }

  render() {
  
    const { navigation, route } = this.props

    console.log("디바이스0" + this.state.device.length)
    console.log("디바이스0" + this.state.device[0].status)
    console.log("디바이스0" + this.state.device[1].status)
    return (
      <View>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
          source={require("../../../../assets/images/spacebackground.jpg")}  //이미지경로
          resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
        >
          <SubHeader mode={'back'} title={""} onPress={()=>navigation.goBack()}></SubHeader>
          <View style={styles.header}>
                                  <View style={styles.stepHeader}>
                        <StepIndicator step={4}></StepIndicator>
                        </View>
                        </View>
   
          <DeviceAllChecking number={this.state.device[3].status}></DeviceAllChecking>
          <View style={styles.deviceTextBox}>
          <Text style={styles.text}>현재 연결된 기기</Text>
          </View>
          <View style={styles.deviceBox}>
                <View style={styles.deviceStatus}>
                  <View>
                  <Text style={styles.text}>dehyperlabs v1.0</Text>
                  <Text style={styles.text}>냉동 1번기기</Text>
                  </View>
                  <DeviceChecking number={this.state.device[0].status}></DeviceChecking>
                  </View>
                  <View style={styles.deviceStatus}>
                  <View>
                  <Text style={styles.text}>dehyperlabs v1.0</Text>
                  <Text style={styles.text}>냉동 2번기기</Text>
                  </View>
                  <DeviceChecking number={this.state.device[1].status}></DeviceChecking>
                  </View>
                  <View style={styles.deviceStatus}>
                  <View>
                  <Text style={styles.text}>dehyperlabs v1.0</Text>
                  <Text style={styles.text}>냉장 1번기기</Text>
                  </View>
                  <DeviceChecking number={this.state.device[2].status}></DeviceChecking>
                  </View>
                  <View style={styles.deviceStatus}>
                  <View>
                  <Text style={styles.text}>dehyperlabs v1.0</Text>
                  <Text style={styles.text}>냉장 2번기기</Text>
                  </View>
                  <DeviceChecking number={this.state.device[3].status}></DeviceChecking>
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
    alignItems: 'center',

  },
  testeBtn: {


  },
  header:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    marginBottom: 16
}, 
  stepHeader:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingHorizontal: '5%'
},
  btn: {
    width: 70,
    height: 70,
    backgroundColor: '#949494',
    marginBottom: 5
  },
  text: {
    color: 'white'
  },
  deviceBox:{
    width:'100%',
    // height: 60,
    // backgroundColor: 'rgba(255, 255, 255, 0.2);',
    // borderRadius: 10,
    alignItems: 'center',
  },
  deviceStatus:{
    width: '90%',
    paddingHorizontal: '5%',
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2);',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  deviceBoxTop:{
    width:'90%',
    paddingLeft: '6.4%',
    paddingRight: '6.4%',
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  deviceBoxBot :{
    marginTop: 20,
    width:'100%',
    paddingLeft: '6.4%',
    paddingRight: '6.4%',
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  deviceCheck:{
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent:'center',
  },
  deviceTrue:{

    backgroundColor: '#2AB930'
  },
  deviceError:{
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#F4C805'
  },
  deviceFalse:{

    backgroundColor: '#DA100B'
  },
  lottie: {
    width: 50,
    height: 50
},
checkTextBox: {
  width:'100%',
  height: 200,
  alignItems: 'center',
  justifyContent:'center',
},
deviceTextBox:{
  width:'100%',
  marginBottom: 10,
  paddingHorizontal: '5%',
  alignItems: 'flex-start',
  justifyContent:'center'
}
  

});
export default DeviceScreen;