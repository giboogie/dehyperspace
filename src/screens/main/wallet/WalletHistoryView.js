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
import AsyncStorage from '@react-native-community/async-storage';
import CustomButton from '../../../components/CustomButton';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import SubHeader from '../../../components/headerComponent/SubHeader';
import { times } from 'lodash';

class WalletHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            name: null,
            txid: "0x9D551f41feD6FC27B719777c224DfeCcE170004d",
            data: [
                {
                    day: '2020.01.21',
                    time: '16:36:20',
                    division: '받기',
                    sendInfo: '디하이퍼랩스',
                    tranHash: '0x9asd8f4a9sdf8asdf6a5445sfasdf15',
                    contents : '기기 첫 등록 선물',
                    quantity : 9000,
                    key: '1412'
                },
                {
                    day: '2020.01.21',
                    time: '16:36:20',
                    division: '받기',
                    sendInfo: '디하이퍼랩스',
                    tranHash: '0x9asd8f4a9sdf8asdf6a5445sfasdf15',
                    contents : '이벤트',
                    quantity : 3000,
                    key: '14412'
                },
                {
                    day: '2020.01.21',
                    time: '16:36:20',
                    division: '받기',
                    sendInfo: '디하이퍼랩스',
                    tranHash: '0x9asd8f4a9sdf8asdf6a5445sfasdf15',
                    contents : '21년 코로나 극복 지원',
                    quantity : 200000,
                    key: '15312'
                },
                {
                    day: '2020.01.21',
                    time: '16:36:20',
                    division: '보내기',
                    sendInfo: '디하이퍼랩스',
                    tranHash: '0x9asd8f4a9sdf8asdf6a5445sfasdf15',
                    contents : '결식아동 후원',
                    quantity : 20000,
                    key: '112'
                },
                {
                    day: '2020.01.21',
                    time: '16:36:20',
                    division: '받기',
                    sendInfo: '디하이퍼랩스',
                    tranHash: '0x9asd8f4a9sdf8asdf6a5445sfasdf15',
                    contents : '식중독 예방 연구기금',
                    quantity : 300,
                    key: '141552'
                },

            ]
        }
    }

    componentDidMount = () => {
        AsyncStorage.getItem('name',(err,result) =>{
            this.setState({name : result})
         
        })
    }
    toggleModal = () => {

        console.log('modal call')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    copyToClipboard = () => {
        // Clipboard.setString(this.state.txid)
        alert("복사완료"+ this.state.txid)
    }
    toDetail =(_day, _time, _division, _sendInfo, _tranHash, _quantity)=>{
        this.props.navigation.navigate('WalletDetail', 
        {
            day: _day, 
            time: _time, 
            division: _division, 
            sendInfo: _sendInfo,
            tranHash : _tranHash,
            quantity: _quantity 
        }
      )
    }
    render() {
        const { navigation } = this.props
        console.log(navigation.navigate)
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{ width: "100%", height: "100%" }}  //View를 꽉채우도록
                    source={require("../../../../assets/images/spacebackground.jpg")}  //이미지경로
                    resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                >
                    <SubHeader mode={'back'} title={""} onPress={()=>navigation.goBack()}></SubHeader>
                    <View style={styles.topHeaderContainer}>
<View style={styles.topMargin}>
    <Text style={[styles.font,{fontSize:20}]}>{this.state.name}</Text>
</View>
<View style={styles.topMargin}>
<Text style={[styles.font,{fontSize:20}]}>1000<Text style={[styles.font,{fontSize:15}]}> hyper</Text></Text>
</View>
<View style={styles.customBtn}>
<CustomButton
                    title =''
                    mode = 'sendFont'
                    onPress={() => this.toggleModal()}>
    </CustomButton>
</View>
</View>
<View style={styles.detailBot}>

    <View style={styles.history}>
        <View style={styles.historyTitle}>
    <Text style={styles.font}>거래내역</Text>
        <Text style={styles.font}>전체보기</Text>
        </View>
        <FlatList
        ListHeaderComponrnt={
        <>

        </>}
        data = {this.state.data}
        renderItem={({item}) =>
    <TouchableOpacity style={styles.historyDetailBox}
    onPress={()=> this.toDetail(item.day, item.time, item.division, item.sendInfo, item.tranHash, item.quantity)}>
        <View style={styles.historyDetailTop}>
        <Text style={styles.font}>{item.day}</Text>
        <TouchableOpacity><Text style={styles.font}>  </Text></TouchableOpacity>
        </View>
        <View style={styles.historyDetailBot}>
        <Text style={styles.font}>{item.contents}</Text>
        <Text style={styles.font}>{item.quantity}</Text>
        </View>
    </TouchableOpacity>
    }
        numColumns={1}
        ListFooterComponent={
            <View>

            </View>
        }>
        </FlatList>
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
    history:{
        width: '90%',
        paddingHorizontal:'5%',
        paddingBottom: '5%',
        height: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.2);',
        borderRadius: 10,

    },
    detailBot:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyTitle:{
        width: '100%',
        height:50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    historyDetailBox : {
        width: '100%',
        height: 50,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#fff'

    },
    historyDetailTop:{
        width: '100%',
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyDetailBot:{
        width: '100%',
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    topHeaderContainer:{
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customBtn:{
        width: '30%',
        height: 30,
        marginBottom: 19
    },
    topMargin:{
        marginBottom: 20
    }

});
export default WalletHistoryScreen;