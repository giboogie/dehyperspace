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

import AsyncStorage from '@react-native-community/async-storage';

import * as loginAction from '../../../modules/auth/login/Authstore';
import Modal from 'react-native-modal';
import SubHeader from '../../../components/headerComponent/SubHeader';
class EventScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
           
        }
    }
    render() {
        const { navigation, route } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
               <SubHeader mode={'back'} title={"이벤트"} onPress={()=>navigation.goBack()}></SubHeader>
               </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#030711',
        justifyContent: 'center'

    },
    subContainer:{
        width:'100%',
        height:'100%',
    },
    font: {
        color: '#fff'
    },


});
  const mapStateToProps = (state) => ({

  });
  
  const mapDispatchToProps = (dispatch) => ({
  });
  
  const connected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventScreen);
  
  export default connected;
  