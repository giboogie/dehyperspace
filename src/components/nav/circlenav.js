import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    View
} from 'react-native';

// circle Btn Component

/* props
   onPress (type: function)
*/
export default class CircleNav extends Component {
    static defaultProps = {
        title: 'untitled',
        mode: 'nextFont',

        buttonColor: '',
        titleColor: '#000',
        nonClick: false,
        onPress: () => null,
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {navigation} = this.props
        console.log(this.props.navigation)
        return (
            <View style={styles.mainContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Safety')}>
                        <Image
                            style={styles.BtnImg0}
                            source={require("../../../assets/images/navbutton/warning_btn.png")}  //이미지경로
                            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Device')}>
                        <Image
                            style={styles.BtnImg1}
                            source={require("../../../assets/images/navbutton/link_btn.png")}  //이미지경로
                            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                        <Image
                            style={styles.BtnImg3}
                            source={require("../../../assets/images/navbutton/wallet_btn.png")}  //이미지경로
                            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                        <Image
                            style={styles.BtnImg4}
                            source={require("../../../assets/images/navbutton/setting_btn.png")}  //이미지경로
                            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Frige')}>
                        <Image
                            style={styles.BtnImg2}
                            source={require("../../../assets/images/navbutton/refre_btn.png")}  //이미지경로
                            resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: 250,
        // backgroundColor:'#fff',
        height: 250,
        //    alignItems:'center'
    },
    BtnImg0: {
        position: 'absolute',
        width: 120,
        height: 120,
    },
    BtnImg1: {
        position: 'absolute',
        marginLeft: 125,
        width: 120,
        height: 120,
    },
    BtnImg3: {
        position: 'absolute',
        marginTop: 125,
        width: 120,
        height: 120,
    },
    BtnImg4: {
        position: 'absolute',
        marginTop: 125,
        marginLeft: 125,
        width: 120,
        height: 120,
    },
    BtnImg2: {
        position: 'absolute',
        marginTop: 70,
        marginLeft: 70,
        width: 105,
        height: 105,
    },
});