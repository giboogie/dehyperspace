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
import Moment from 'react-moment';
import AsyncStorage from '@react-native-community/async-storage';
import * as config from '../../../config';
import * as safetyAction from '../../../modules/main/safety/safetyStore';
import Modal from 'react-native-modal';
import SubHeader from '../../../components/headerComponent/SubHeader';
class SafetyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,

        }
    }
    componentDidMount = () => {
        this.props.safetyDataRequest();
        console.log(this.props.data.data)
    }
    toDetail =({item})=>{
        this.props.navigation.navigate('SafetyDetail', 
        {
            kor_name: item.kor_name, 
            info: item.info, 
            img: item.img, 
            level: item.level,
            recall : item.recall,
            createDate: item.createDate,
            updateDate: item.updateDate
        }
      )
    }
    render() {
        const { navigation, route } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <SubHeader mode={'back'} title={"위해식품"} onPress={() => navigation.goBack()}></SubHeader>
                   
                   <View  style={styles.flatContainer}>
                       <View style={styles.updateTime}><Text style={styles.font}>업데이트 시간 </Text><Moment unix element={Text} format="YYYY/MM/DD:HH:MM:SS" style={styles.font}>{this.props.data.timeStamp / 1000}</Moment></View>
                    <FlatList
                        ListHeaderComponent={
                            <>

                            </>
                        }
                       
                        data={this.props.data.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>

                            <TouchableOpacity style={styles.foodSafetyContainer}
                            onPress={()=>this.toDetail({item})}>
                                <View  style={styles.foodSafetyBox}>
                                <View style={styles.foodSafeLeft}>
                                <Image
        style={{width:100, height:100}}
        source={{
          uri: config.DOMAIN+item.img,
        }}
      />

                                </View>
                                <View style={styles.foodSafeRight}>
                                    <Moment unix element={Text} format="YYYY/MM/DD:HH:MM:SS" style={styles.font}>{item.updateDate / 1000}</Moment>
                                    <Text style={styles.font}>{item.kor_name}</Text>
                                    <Text style={styles.font}>회수등급 : {item.level}</Text>
                                </View>
                                </View>
                            </TouchableOpacity>
                        }
                        ListFooterComponen={
                            <>
                            </>
                        }
                    />
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#030711',


    },
    subContainer: {
        width: '100%',
        height: '100%',
    },
    font: {
        color: '#fff'
    },
    flatContainer:{
        width:'100%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    foodSafetyContainer:{
        width:'100%',
        paddingHorizontal:'5%',

    },
    foodSafetyBox:{
        width:'100%',
        marginBottom:10,
        backgroundColor: 'rgba(255, 255, 255, 0.2);',
        flexDirection:'row'
    },
    foodSafeLeft:{
        width:'40%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    foodSafeRight:{
        width:'60%',
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    updateTime:{
        width:'90%',
        justifyContent: 'flex-end',

        alignItems:'flex-end',
        flexDirection:'row'
    }


});
const mapStateToProps = (state) => ({
    data: state.safetyStore.data,
});

const mapDispatchToProps = (dispatch) => ({
    safetyDataRequest: (values) => dispatch(safetyAction.safetyDataRequest(values))

});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(SafetyScreen);

export default connected;
