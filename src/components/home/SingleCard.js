import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import { fonts } from '../../styles/index';

// export default class SingleCard extends Component{
//     constructor(props){
//         super(props);

//     }
//     render(){
//         const { item, index, sliderWidth, itemWidth, navigation} = this.props;
//         let priceTextBox;
//         let priceSale = item.salePrice;
//         if (priceSale) {
//             priceTextBox =
//                 <View style={styles.priceSaleView}>
//                     <Text>{priceSale}</Text>
//                     <Text style={styles.priceLine}>{item.price}</Text>å
//                 </View>
//         } else {
//             priceTextBox =
//                 <View style={styles.priceView}>
//                     <Text>{item.price}</Text>
//                 </View>
//         }
//         return(
//             <View style={styles.list}>
//             <TouchableOpacity style={styles.listItem}
//             onPress={() => navigation.navigate('classMain', {
//                 screen: "classdetail",
//                 params: {test:'123'},
//                 })}>
//                 <View style={styles.cont}>
//                     <View style={styles.contTop}>
//                         <View style={styles.imageView}>
//                             <Image
//                                 style={styles.favoriteIcon}
//                                 source={require('../../../assets/images/icons/favorite.png')}
//                             ></Image>
//                         </View>
//                         <View style={styles.contTopArea}>
//                         <Image
//                             style={styles.areaIcon}
//                             source={require('../../../assets/images/icons/area.png')}                        
//                         ></Image>
//                         <Text style={styles.contTopAreaText}>{item.area}</Text>
//                         </View>
//                     </View>
//                     <View style={styles.contBot}>
//                         <View style={styles.contBotTopView}>
//                             <Text style={styles.contBotTop}>{item.title}</Text>
//                             <Text style={styles.contBotTop}>{item.writer}</Text>
//                         </View>
//                         <View style={styles.contBotSubView}>
//                             <Text numberOfLines={1}>{item.subtitle}</Text>
//                         </View>
//                         {priceTextBox}
//                     </View>

//                 </View>
//             </TouchableOpacity>
//         </View>
//         );
//     }
// }

export default function SingleCard(props) {
    const { item, index, sliderWidth, itemWidth } = props;

    const title = item.title;
    const priceSale = item.salePrice
    const { navigation } = this.props
    let priceTextBox;
    if (priceSale) {
        priceTextBox =
            <View style={styles.priceSaleView}>
                <Text>{priceSale}</Text>
                <Text style={styles.priceLine}>{item.price}</Text>
            </View>
    } else {
        priceTextBox =
            <View style={styles.priceView}>
                <Text>{item.price}</Text>
            </View>
    }
    return (
        <View style={styles.list}>
            <TouchableOpacity style={styles.listItem}
                onPress={() => navigation.navigate('classMain', {
                    screen: "classdetail",
                    params: { test: '123' },
                })}>
                <View style={styles.cont}>
                    <ImageBackground source={item.image} style={styles.contTop}>
                        <View style={styles.imageView}>
                            <Image
                                style={styles.favoriteIcon}
                                source={require('../../../assets/images/icons/favorite.png')}
                            ></Image>
                        </View>
                        <View style={styles.contTopArea}>
                            <Image
                                style={styles.areaIcon}
                                source={require('../../../assets/images/icons/area.png')}
                            ></Image>
                            <Text style={styles.contTopAreaText}>{item.area}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.contBot}>
                        <View style={styles.contBotTopView}>
                            <Text style={styles.contBotTop}>{item.title}</Text>
                            <Text style={styles.contBotTop}>{item.writer}</Text>
                        </View>
                        <View style={styles.contBotSubView}>
                            <Text numberOfLines={1}>{item.subtitle}</Text>
                        </View>
                        {priceTextBox}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    list: {
        width: 210,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20,

    },
    listItem: {
        width: 180,
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.3,
                //   shadowRadius: 5,
                shadowOffset: {
                    height: 1,
                    width: 1
                }
            },
            android: {
                borderWidth: 1,
                borderColor: 'rgba(158, 150, 150, .5)'
            }
        })
    },
    contTop: {
        width: 180,
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: "cover",
        justifyContent: "center",
        overflow: 'hidden'
    },
    contTopArea: {
        flex: 1,
        //justifyContent:'flex-end',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    areaIcon: {
        width: 14,
        height: 14
    },
    contTopAreaText: {
        fontSize: 10
    },
    imageView: {
        width: '100%',
        padding: 8,
        alignItems: 'flex-end'
    },
    favoriteIcon: {
        width: 20,
        height: 20
    },
    contBot: {
        width: '100%',
        height: 72,
        padding: 8
    },
    contBotTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contBotSubView: {
        marginTop: 5
    },
    contBotTop: {
        fontSize: 10
    },
    priceLine: {
        fontSize: 10,
        marginLeft: 10,
        textDecorationLine: 'line-through'
    },
    priceSaleView: {
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row',
    },
    priceView: {
        marginTop: 5,
        flexDirection: 'row'
    }
})
