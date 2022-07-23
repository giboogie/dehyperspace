import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    FlatList,
    Dimensions,
    Alert,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import * as frigeAction from '../../../modules/main/frige/frigeStore';
import { WebView} from 'react-native-webview';
import Modal from 'react-native-modal';


import AnimatedLoader from "react-native-animated-loader";
import SubHeader from '../../../components/headerComponent/SubHeader';

//const freezeHtml = require('../../../../assets/index.html');
class FrigeScreen extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);
        this._error = this._error.bind(this);
        this.state = {
            key: 1,
            isModalVisible: false,
            isErrorModalVisible : false,
            name: null,
            quantity: null,
            color: null,
            src : null,
            webLoaded: false
        }
    }
componentDidMount = () =>{
    const {navigation} = this.props
    this.props.frigeDataRequest()

    console.log(this.props.data)
    if(this.props.totalLength === 0){
        Alert.alert(
            "기기가 연결되지 않았거나 제품 설치가 되어있지 않습니다!",
            '기기를 연결하고 제품을 냉장고에 설치해주세요.',
            [
              { text: "OK", onPress: () => navigation.replace('Device') }
            ],
            { cancelable: false }
          );
    }

}
componentDidUpdate = () =>{
    this._error();
}

    toggleModal = () => {

        console.log('modal call')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

onWebViewMessage = (e) => {
   // let url = "'"+JSON.parse(e.nativeEvent.data).details+"'"
   console.log(e.nativeEvent.data)
   this.setState({src: JSON.parse(e.nativeEvent.data).details})
   this.setState({name: JSON.parse(e.nativeEvent.data).name})
   this.setState({quantity: JSON.parse(e.nativeEvent.data).quantity})
   if (JSON.parse(e.nativeEvent.data).color == 'skyBlue'){
    this.setState({color: 'rgba(29, 115, 226, 0.65)'})
    }else if(JSON.parse(e.nativeEvent.data).color == 'green'){
    this.setState({color: 'rgba(50, 218, 27, 0.685)'})
    }else if(JSON.parse(e.nativeEvent.data).color == 'orange'){
    this.setState({color: 'rgba(240, 163, 47, 0.774)'})
    }else if(JSON.parse(e.nativeEvent.data).color == 'red'){
    this.setState({color: 'rgba(255, 81, 81, 0.75)'})
   }else if(JSON.parse(e.nativeEvent.data).color == 'gradient-border'){
    this.setState({color: 'rgba(102, 255, 255, 0.75)'})
}

   this.toggleModal()
}
onLoadWebview =() =>{
    const table = this.props.data.map(({name, qty, color, state, category, img})=> `${img},${name},${qty},${color},${state},${category}`).join(',')
        // console.log(JSON.stringify(this.props.data))
       // const runFirst = `${table};`;
    this.webref.postMessage(table)
    if(!table){
        console.log(";;")
    }else{
        this.setState({webLoaded : true})
        console.log("aa")
    }
}
listPage = () =>{
    const {navigation} = this.props
console.log('list page navigation function')
navigation.navigate('Safety')
}
reset(){
    this.setState({key: this.state.key + 1})
}
update(){
    this.props.frigeDataRequest()
   this.setState({key: this.state.key + 1})
}

_error(){
    const {navigation} = this.props
    if(this.props.error){
        Alert.alert(
            "error",
            '네트워크 에러',
            [
              { text: "OK", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
          );
        
    }
}
    render() {
        const {navigation} = this.props

        return (
            <View style={{flex:1, backgroundColor:'#0f1326'}}>

                                <AnimatedLoader
                        visible={this.props.isLoadingVisible}
                        overlayColor="rgba(0,0,0,0.5)"
                        source={require("../../../components/loading.json")}
                        animationStyle={styles.loadingStyle}
                        speed={1}
                    ><Text></Text>
                    </AnimatedLoader>

                <View style={styles.container}>
                <SubHeader mode={'back'} title={""} onPress={()=>navigation.goBack()}></SubHeader>
            <WebView
            key = {this.state.key}
            ref={(r)=>(this.webref = r)}
            style={this.state.webLoaded || { flex:1, opacity:0}}
            allowFileAccess={true}
            source={
                Platform.OS === "android"
                  ? {
                    uri: "file:///android_asset/freeze/index.html"
                    }
                  : {uri: 'http://dehyperlabs.com/freezehtml/index.html'}
              }
              onLoad={this.onLoadWebview}
              onError={console.error.bind(console, 'error')}
              javaScriptEnabled={true}
              onMessage={this.onWebViewMessage}

          />
          </View>
          {/* <TouchableOpacity
          onPress={this.reset}><Text style={{color:'#fff'}}>초기화</Text></TouchableOpacity>
          */}
          <View style={styles.btnBox}>
              <TouchableOpacity style={styles.refhBtn}
          onPress={this.update}><Text style={{color:'#fff'}}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.safety}
          onPress={() => this.listPage()}><Text style={{color:'#fff'}}>위험품목 리스트보기</Text></TouchableOpacity>
          </View>
                              <Modal
                        style={styles.modal}
                        isVisible={this.state.isModalVisible}
                        hideModalContentWhileAnimating={false}
                        onBackdropPress={() => this.toggleModal()}>
                        <View style={[styles.modalView,{borderWidth:5,borderColor:this.state.color}]}>
                            <View style={styles.modalHeader}>
                                <Image
                                    style={styles.foodImage}
                                    source={{
                                        uri: this.state.src,
                                      }}
                                    resizeMode='cover'
                                />

                                <Text style={styles.foodName}>{this.state.name}</Text>
                                <Text style={styles.foodQuantity}>개수 {this.state.quantity}</Text>
                                {/* <Text>{this.state.color}</Text>
                                <Text>{this.state.src}</Text> */}
                            </View>
                            <View style={styles.modalBot}>

                            </View>
                        </View>
                    </Modal>
                   
</View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: '90%',
        width:'100%',

    },
    modal: {
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        height: '40%',
        backgroundColor: 'rgba(255,255,255, 0.6)',
        borderRadius: 10,
        alignItems: 'center',
    },
    foodImage:{
        width:150,
        height: 150,
        marginTop: 20,
    },
    loadingStyle:{
        width:50,
        height:50,
    },
    modalHeader:{
        alignItems: 'center',
        justifyContent: 'center',

    },
    foodName:{
        fontSize: 15,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 20
    },
    foodQuantity:{
        
    },
    safety:{
        width:'90%',
        alignItems:'flex-end'
    },
    btnBox:{
        width:'100%',
        alignItems:'flex-end'
    },
    refhBtn:{
        width:'50%',
        height:90,
        justifyContent:'flex-end'
    }
});


const mapStateToProps = (state) => ({
    table: state.frigeStore.table,
    data: state.frigeStore.data,
    error: state.frigeStore.error,
    errorLog :state.frigeStore.errorLog,
    isLoadingVisible: state.frigeStore.isLoadingVisible,
    totalLength: state.frigeStore.totalLength,
});

const mapDispatchToProps = (dispatch) => ({
    frigeDataRequest: (values) => dispatch(frigeAction.frigeDataRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(FrigeScreen);

export default connected;
