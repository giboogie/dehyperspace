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

import Modal from 'react-native-modal';
import SubHeader from '../../../components/headerComponent/SubHeader';
class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
           
        }
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
                    <SubHeader mode={'back'} title={""} onPress={()=>navigation.goBack()}></SubHeader>

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
   

});
export default AccountScreen;