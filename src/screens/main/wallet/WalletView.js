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
} from 'react-native';
import { connect } from 'react-redux';
import * as walletAction from '../../../modules/main/wallet/walletStore';
// import Clipboard from '@react-native-clipboard/clipboard';
import Modal from 'react-native-modal';
import AnimatedLoader from "react-native-animated-loader";
import QRCode from 'react-native-qrcode-svg';
import Entypo from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather'
import SubHeader from '../../../components/headerComponent/SubHeader';
import AsyncStorage from '@react-native-community/async-storage';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class WalletScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            addr: '',
            name:'',
        }
    }
    componentDidMount = () =>{
        AsyncStorage.getItem('addr',(err,result) =>{
            this.setState({addr:result})
        })
        this.props.walletDataRequest()
        AsyncStorage.getItem('name',(err,result) =>{
            this.setState({name:result})
        })
    }
    toggleModal = () => {
        console.log('modal call')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    copyToClipboard = () => {
        // Clipboard.setString(this.state.txid)
        Alert.alert("주소가 복사되었습니다.")
    }
    render() {
        const { navigation } = this.props
        console.log(this.props)
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
                    source={require("../../../../assets/images/spacebackground.jpg")}  //이미지경로
                    resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                >
                    <SubHeader mode={'back'} title={""} onPress={()=>navigation.goBack()}></SubHeader>
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text style={styles.font}>{this.state.name}님의 지갑</Text>
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={styles.subTitle}>
                            <Text style={styles.font}>나의 주소</Text>
                        </View>
                        <TouchableOpacity style={styles.addrNameContainer}
                            onPress={this.toggleModal}>
                            <Text style={styles.font}>내 주소 보기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subTitle}
                        onPress={() => navigation.navigate('WalletHistory')}>
                            <Text style={styles.font}>나의 포인트 <Entypo size={15} name={'chevron-right'}></Entypo></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addrValContainer}
                        onPress={() => navigation.navigate('WalletHistory')}>
                            <Text style={styles.font}>{this.props.quantity}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <Modal
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}
                    hideModalContentWhileAnimating={false}
                    onBackdropPress={() => this.toggleModal()}>
                    <View style={styles.modalView}>
                        <QRCode
                            value={this.state.addr}
                            size={150}
                        />
                        <View style={styles.modalBot}>
                        <Text style={{fontSize:17, fontWeight:'600'}}>내 주소 <TouchableOpacity style={styles.copyContainer} onPress={this.copyToClipboard}><FeatherIcon name={'copy'} size={20}></FeatherIcon></TouchableOpacity></Text>
                            <Text numberOfLines={1} ellipsizeMode='middle'>{this.state.addr}</Text>
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#fff',
        justifyContent: 'center'

    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 26
    },
    headerText: {
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    font: {
        color: '#fff'
    },
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subTitle: {
        width: '90%',
        marginBottom: 5
    },
    addrNameContainer: {
        width: '90%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2);',
        marginBottom: 32
    },
    addrValContainer: {
        width: '90%',
        height: 48,
        padding: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2);'
    },
    modal: {
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        height: 300,
        backgroundColor: 'rgba(255,255,255, 0.6)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBot:{
        width:'90%',
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    copyContainer:{

    }

});

const mapStateToProps = (state)=>({
    data : state.walletStore.data,
        addr: state.walletStore.addr,
        quantity : state.walletStore.quantity,
        isLoadingVisible: state.walletStore.isLoadingVisible
});
const mapDispatchToProps = (dispatch) => ({
    walletDataRequest: (values) => dispatch(walletAction.walletDataRequest(values)),
});
const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(WalletScreen);
export default connected;