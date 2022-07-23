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
    PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import * as mainAction from '../../../modules/main/mainStore';
import TabHeader from '../../../components/headerComponent/TabHeader';
import Slick from 'react-native-slick';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
let name = null;
let device = null;
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GridViewItems: [
                {
                    subTitle: '식품',
                    title: '수질 부적합된 생수',
                    img: '',
                },
                {
                    subTitle: '업체',
                    title: '분당 XX김밥 식중독 사건',
                    img: '',
                },
                {
                    subTitle: '식품',
                    title: '수질 부적합된 생수',
                    img: '',
                },
            ]


        }
    }
    componentDidMount = () => {

    }
    componentWillUnmount() {

    }
    issueCard(item) {
        return (

            <TouchableOpacity style={styles.issueCardContainer}>
                
                <Text>{item.subTitle}</Text>
                <Text>{item.title}</Text>
            </TouchableOpacity>

        )
    }
    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <TabHeader title={'FOODME'} backgroundColor={'#256653'} fontColor={'#fff'}></TabHeader>
                <View style={{flex:1,paddingHorizontal:'5%',alignItems:'center'}}>
                <FlatList style={styles.scrollContainer}
                    ListHeaderComponent={
                        <>
                            <View style={styles.mainSliderContainer}>
                                <Slick style={styles.slickWrapper}
                                    dot={
                                        <View
                                            style={{

                                                width: 8,
                                                height: 8,
                                                borderRadius: 7,
                                                borderColor: '#fff',
                                                borderWidth: 1,
                                                marginLeft: 7,
                                                marginRight: 7
                                            }}
                                        />
                                    }
                                    activeDot={
                                        <View
                                            style={{
                                                backgroundColor: '#fff',
                                                width: 8,
                                                height: 8,
                                                borderRadius: 7,
                                                marginLeft: 7,
                                                marginRight: 7
                                            }}
                                        />
                                    }
                                    paginationStyle={{
                                        bottom: 70
                                    }}
                                    loop={false}

                                >
                                    <View style={styles.scrollTab}><Text>ss</Text></View>
                                    <View style={styles.scrollTab}><Text>ss</Text></View>
                                </Slick>
                            </View>
                            <View style={styles.iconNavContainer}>
                                <TouchableOpacity style={styles.iconNavBtnBox}
                                onPress={()=>navigation.navigate('nonconfFood')}>
                                    <View style={styles.icon}></View>
                                    <View><Text style={styles.iconFont}>부적합 식품</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconNavBtnBox}>
                                    <View style={styles.icon}></View>
                                    <View><Text style={styles.iconFont}>이슈 업체</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconNavBtnBox}>
                                    <View style={styles.icon}></View>
                                    <View><Text style={styles.iconFont}>식품정보</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconNavBtnBox}>
                                    <View style={styles.icon}></View>
                                    <View><Text style={styles.iconFont}>회수판매중지</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divHeaderConatiner}>
                                <Text style={styles.fontHeader}>최근 이슈</Text>
                            </View>
                        </>
                    }
                    data={this.state.GridViewItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => this.issueCard(item)}

                >


                </FlatList>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex:1,

        backgroundColor:'#fff'
        // alignItems: 'center',

    },
    iconFont: {
        fontSize: 12,
    },
    fontHeader:{
        fontSize:16,
        fontWeight:'500'
    },
    scrollContainer: {
        width:'100%',

    },

    mainSliderContainer: {
        width: '100%',
        height: 248,
        marginTop: 24,
        // paddingHorizontal: '5%'
    },
    scrollTab: {
        width: '100%',
        height: 200,
        backgroundColor: '#c4c4c4',
        borderRadius: 16

    },
    iconNavContainer: {
        width: '100%',
        // paddingHorizontal: '5%',
        height: 86,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 48
    },
    iconNavBtnBox: {
        width: 64,
        height: 86,
        alignItems: 'center'
    },
    icon: {
        width: 64,
        height: 64,
        borderWidth: 1,
        borderColor: 'rgba(226, 226, 226, 1);',
        borderRadius: 50,
        marginBottom: 8,
    },
    divHeaderConatiner: {
        width: '100%',
        // paddingHorizontal: '5%',
        justifyContent: 'center',
        marginBottom:22
    },
    issueCardContainer: {
        width:'100%',
        height:109,
        backgroundColor:'#fff',
        marginBottom:16,
        borderRadius:16
    },



});

const mapStateToProps = (state) => ({
    pollution: state.mainStore.pollution,
    error: state.mainStore.error,
    errorLog: state.mainStore.errorLog,
    isLoadingVisible: state.mainStore.isLoadingVisible
});

const mapDispatchToProps = (dispatch) => ({
    mainDataRequest: (values) => dispatch(mainAction.mainDataRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

export default connected;
