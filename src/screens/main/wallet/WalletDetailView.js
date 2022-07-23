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
// import Clipboard from '@react-native-clipboard/clipboard';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import SubHeader from '../../../components/headerComponent/SubHeader';

class WalletDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,

        }
    }
    toggleModal = () => {

        console.log('modal call')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    copyToClipboard = () => {
        // Clipboard.setString(this.state.txid)
        alert("복사완료" + this.state.txid)
    }
    render() {
        const { navigation, route } = this.props
        console.log(route)
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
                    source={require("../../../../assets/images/spacebackground.jpg")}  //이미지경로
                    resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                >
                    <SubHeader mode={'back'} title={"상세내역"} onPress={() => navigation.goBack()}></SubHeader>
                    <View>
                        {/* <Text style={styles.font}>name</Text> */}
                    </View>
                    <View>
                        <Text style={styles.font}></Text>
                    </View>

                    <View style={styles.detailBot}>

                        <View style={styles.history}>
                            <View style={styles.historyTitle}>
                                <Text style={styles.font}>구분</Text>
                                <Text style={styles.font}>{route.params.division}</Text>
                            </View>
                            <View style={styles.historyTitle}>
                                <Text style={styles.font}>보낸사람</Text>
                                <Text style={styles.font}>{route.params.sendInfo}</Text>
                            </View>
                            <View style={styles.historyTitle}>
                                <Text style={styles.font}>수량</Text>
                                <Text style={styles.font}>{route.params.quantity}</Text>
                            </View>
                            <View style={styles.historyTitle}>
                                <Text style={styles.font}>전송시각</Text>
                                <Text style={styles.font}>{route.params.day} {route.params.time}</Text>
                            </View>
                            <View style={styles.historyTitleLast}>
                                <Text style={styles.font}>트랜잭션 해시</Text>
                                <Text style={styles.font}>{route.params.tranHash}</Text>
                            </View>

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
        backgroundColor: '#fff',
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
        height: 450,
        backgroundColor: 'rgba(255,255,255, 0.6)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    history: {
        width: '90%',
        paddingHorizontal: '5%',
        paddingBottom: '5%',
        height: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.2);',
        borderRadius: 10,

    },
    detailBot: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyTitle: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    historyTitleLast: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    historyDetailBox: {
        width: '100%',
        height: 50,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#fff'

    },
    historyDetailTop: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyDetailBot: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

});
export default WalletDetailScreen;