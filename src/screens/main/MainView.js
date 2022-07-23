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
import * as mainAction from '../../modules/main/mainStore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressBar from '../../components/progress/bar'
import AnimatedLoader from "react-native-animated-loader";
import CircleNav from '../../components/nav/circlenav';
import Svg, { Path, Circle, Defs, Pattern, Use } from "react-native-svg"
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
let name = null;
let device = null;
class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceConnect: false,
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem('name', (err, result) => {
            name = result
            console.log('name' + name)
        })

        AsyncStorage.getItem('device', (err, result) => {
            device = result
            console.log('device' + device)
            if (device === 'update') {
                this.setState({ deviceConnect: true })
            }
        })
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('focus', () => {
            this.props.mainDataRequest()
            if (this.props.pollution) {
                AsyncStorage.setItem('device', 'update', () => {
                    this.setState({ deviceConnect: true })
                })
            }
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }
    _dehyRequest = (values) => {
        this.props.mainDataRequest()
        console.log(this.props.dehy)
    }
    render() {
        console.log("로딩" + this.props.isLoadingVisible)
        const { navigation, pollution } = this.props
        let frigePollution;
        if (this.state.deviceConnect) {
            if (pollution == 0) {
                frigePollution =
                    <View style={styles.mainSliderBox}>
                        <View style={styles.sliderLeft}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/bluering.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉장고</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>GOOD</Text>
                            </View>
                        </View>
                        <View style={styles.sliderRight}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/bluering.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉동실</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>GOOD</Text>
                            </View>
                        </View>
                    </View>

            } else if (pollution == 1) {
                frigePollution =
                    <View style={styles.mainSliderBox}>
                        <View style={styles.sliderLeft}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/redring.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉장고</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>BAD</Text>
                            </View>
                        </View>
                        <View style={styles.sliderRight}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/redring.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉동실</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>BAD</Text>
                            </View>
                        </View>
                    </View>
            } else if (pollution == 2) {
                frigePollution =
                    <View style={styles.mainSliderBox}>
                        <View style={styles.sliderLeft}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/redring.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉장고</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>BAD</Text>
                            </View>
                        </View>
                        <View style={styles.sliderRight}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/bluering.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉동실</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>GOOD</Text>
                            </View>
                        </View>
                    </View>
            } else if (pollution == 3) {
                frigePollution =
                    <View style={styles.mainSliderBox}>
                        <View style={styles.sliderLeft}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/bluering.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉장고</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>GOOD</Text>
                            </View>
                        </View>
                        <View style={styles.sliderRight}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/redring.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>냉동실</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>BAD</Text>
                            </View>
                        </View>
                    </View>
            } else if (pollution == 4) {
                if (this.state.deviceConnect) {
                    frigePollution =
                        <View style={styles.mainSliderBox}>
                            <View style={styles.sliderLeft}>
                                <Image style={styles.frigeStateImg}
                                    source={require("../../../assets/images/icons/colorfulring.png")}
                                    resizeMode='contain'></Image>
                                <View style={styles.innerText}>
                                    <Image style={{ width: 35, height: 35 }}
                                        source={require("../../../assets/images/icons/unlink.png")}
                                        resizeMode='contain'></Image>
                                </View>
                            </View>
                            <View style={styles.sliderRight}>

                                <View style={styles.innerText}>
                                    <Text style={[styles.mainFont, styles.fontHeader]}>기기가 모두 작동되면</Text>
                                    <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>오염도가 표시됩니다.</Text>
                                </View>
                            </View>
                        </View>
                } else {
                    frigePollution =
                        <View style={styles.mainSliderBox}>
                            <View style={styles.sliderLeft}>
                                <Image style={styles.frigeStateImg}
                                    source={require("../../../assets/images/icons/colorfulring.png")}
                                    resizeMode='contain'></Image>
                                <View style={styles.innerText}>
                                    <Image style={{ width: 35, height: 35 }}
                                        source={require("../../../assets/images/icons/unlink.png")}
                                        resizeMode='contain'></Image>
                                </View>
                            </View>
                            <View style={styles.sliderRight}>

                                <View style={styles.innerText}>
                                    <Text style={[styles.mainFont, styles.fontHeader]}>기기를 설정해주세요</Text>
                                    <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>ERROR</Text>
                                </View>
                            </View>
                        </View>
                }
            } else {
                frigePollution =
                    <View style={styles.mainSliderBox}>
                        <View style={styles.sliderLeft}>
                            <Image style={styles.frigeStateImg}
                                source={require("../../../assets/images/icons/colorfulring.png")}
                                resizeMode='contain'></Image>
                            <View style={styles.innerText}>
                                <Image style={{ width: 35, height: 35 }}
                                    source={require("../../../assets/images/icons/unlink.png")}
                                    resizeMode='contain'></Image>
                            </View>
                        </View>
                        <View style={styles.sliderRight}>

                            <View style={styles.innerText}>
                                <Text style={[styles.mainFont, styles.fontHeader]}>네트워크 오류</Text>
                                <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>ERROR</Text>
                            </View>
                        </View>
                    </View>
            }
        } else {
            frigePollution =
                <View style={styles.mainSliderBox}>
                    <View style={styles.sliderLeft}>
                        <Image style={styles.frigeStateImg}
                            source={require("../../../assets/images/icons/colorfulring.png")}
                            resizeMode='contain'></Image>
                        <View style={styles.innerText}>
                            <Image style={{ width: 35, height: 35 }}
                                source={require("../../../assets/images/icons/unlink.png")}
                                resizeMode='contain'></Image>
                        </View>
                    </View>
                    <View style={styles.sliderRight}>

                        <View style={styles.innerText}>
                            <Text style={[styles.mainFont, styles.fontHeader]}>기기를 설정해주세요</Text>
                            <Text style={[styles.mainFont, styles.fontHeader, styles.fontBold]}>ERROR</Text>
                        </View>
                    </View>
                </View>
        }



        return (

            <View style={styles.container}>
                <ImageBackground
                    style={styles.imgContainer}  //View를 꽉채우도록
                    source={require("../../../assets/images/spacebackground.jpg")}  //이미지경로
                    resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                >
                    <AnimatedLoader
                        visible={false}
                        overlayColor="rgba(0,0,0,0.5)"
                        source={require("./loading.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                    ><Text></Text>
                    </AnimatedLoader>
                    <View style={styles.top}>
                        <View>
                            <Text style={styles.mainFont}> {name}님 환영합니다. </Text>
                        </View>
                        <View>

                        </View>
                    </View>

                    <View style={styles.mainSlider}>
                        {/* {frigePollution} */}
                        <View style={styles.frigePollutionContainer}>
                        <Text style={[styles.mainFont, styles.fontHeader]}>내부 통합지수</Text>
                        {frigePollution}
                            <View style={styles.progressConatiner}>
                                <View style={styles.pollutionProgress}>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={false} color={'#000'}></ProgressBar>
                                    </View>
                                    <View style={{ width: '20%', alignItems: 'center' }}>
                                        <Text style={styles.mainFont}>유기화합물</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={true} color={'#000'}></ProgressBar>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.progressConatiner}>
                                <View style={styles.pollutionProgress}>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={false} color={'#000'}></ProgressBar>
                                    </View>
                                    <View style={{ width: '20%', alignItems: 'center' }}>
                                        <Text style={styles.mainFont}>이산화질소</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={true} color={'#000'}></ProgressBar>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.progressConatiner}>
                                <View style={styles.pollutionProgress}>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={false} color={'#000'}></ProgressBar>
                                    </View>
                                    <View style={{ width: '20%', alignItems: 'center' }}>
                                        <Text style={styles.mainFont}>암모니아</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={true} color={'#000'}></ProgressBar>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.progressConatiner}>
                                <View style={styles.pollutionProgress}>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={false} color={'#000'}></ProgressBar>
                                    </View>
                                    <View style={{ width: '20%', alignItems: 'center' }}>
                                        <Text style={styles.mainFont}>일산화탄소</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <ProgressBar value={Math.floor(Math.random() * 100)} direction={true} color={'#000'}></ProgressBar>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
                    <CircleNav navigation={navigation}></CircleNav>
                    </View>
                    <View>

                    </View>
                </ImageBackground>
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
        backgroundColor: '#0F1326'
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    mainFont: {
        color: '#fff'
    },
    fontHeader: {
        fontSize: 18
    },
    fontBold: {
        fontWeight: '600'
    },
    fontRed: {
        color: 'rgba(239,123,122, 1.0)'
    },
    fontBlue: {
        color: 'rgba(146,172,218, 1.0)'
    },
    top: {
        width: '90%',
        height: 50,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainSlider: {
        width: '90%',
        height: 400,
        backgroundColor:'rgba(255, 255, 255, 0.05);',
        flexDirection: 'row',
        paddingTop:30,
        marginBottom:20,
        borderWidth:2,
        borderColor: 'rgba(255, 255, 255, 0.1);',
        borderRadius:8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    mainSliderBox: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30,
        marginTop:20
    },
    innerText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderLeft: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderRight: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    frigeStateImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 1,
    },
    btnNavigation: {
        width: '90%',
        height: 287,
        marginTop: 250
    },
    naviTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    frigePollutionContainer: {
        width: '100%',
        height:'100%',
        alignItems:'center'
        //  backgroundColor:'#fff'
    },
    progressConatiner: {
        width: '100%',
        marginBottom:16
    },
    pollutionProgress: {
        width: '100%',
        flexDirection: 'row'
    },
    frigeBtn: {
        width: '55%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(255,255,255, 0.15)',
        borderRadius: 10
    },
    frigeBtnImg: {
        width: '100%',
        height: 140,
        position: 'absolute',
    },
    deviceBtn: {
        width: '42%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.15)',
        borderRadius: 10,
        marginLeft: 7
    },
    naviBot: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7
    },
    eventBtn: {
        width: '29%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.15)',
        borderRadius: 10
    },
    walletBtn: {
        width: '37%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.15)',
        borderRadius: 10,
        marginLeft: 7
    },
    settingBtn: {
        width: '29%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.15)',
        borderRadius: 10,
        marginLeft: 7
    },
    fontImg: {
        width: 60,
        height: 40
    },
    btnIcon: {
        width: 75,
        height: 75
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
)(MainScreen);

export default connected;
