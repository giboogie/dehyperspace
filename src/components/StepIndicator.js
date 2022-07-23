import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';


// 공통 헤드 컴포넌트
// sub page에서 사용되는 header section 컴포넌트입니다. (back, close형태의 modal)
 /* props
    title (type : string)
    mode (type : string { 'back' , 'close' , 'chat'  })
    onPress (type : function)
    reportOnPress (type: function)
 */
export default class StepIndicator extends Component{
  
    static defaultProps ={
        color: '#fff',
        size: 10,
        outColor: 'rgba(197, 220, 250, 0.5)',
        outSize : 20,
        step : 1,

    }
    constructor(props){
        super(props);
    }
    render(){

        let view = null;

        // if(this.props.step === 1){
        //     view = <TouchableOpacity style={styles.backIcon}
        //                 onPress={this.props.onPress}>
        //                 <FeatherIcon name='chevron-left' size={28} color='#fff' />
        //                 </TouchableOpacity>

        // }else if (this.props.mode === 'close'){

        //     view = <TouchableOpacity style={styles.closeIcon}
        //                     onPress={this.props.onPress}>
        //                     <FeatherIcon name='x' size={28} color='#646464' />
        //                     </TouchableOpacity>
        // }else if (this.props.mode === 'chat'){




        // }else {

        // }
//   {[...Array(this.props.step)].map((n, index) => {
//          return <View><View></View></View>
//     })}

    return (
        
        <View style={styles.container}>
            <View style={styles.line}></View>
            {[...Array(this.props.step)].map((n, index) => {
                return <View key={index} style={{backgroundColor:this.props.outColor, borderRadius:50, width:this.props.outSize, height:this.props.outSize,alignItems: 'center', justifyContent: 'center',}}><View style={{backgroundColor:this.props.color, borderRadius:50, borderColor:this.props.color, width:this.props.size, height:this.props.size}}></View></View>
            })}
            {[...Array(4-this.props.step)].map((n, index) => {
                return <View key={index} style={{backgroundColor:'#000', borderRadius:50, borderWidth:2, borderColor:this.props.color, width:this.props.size, height:this.props.size}}><View></View></View>
            })}
        </View>

        );
    }
}



const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 50,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    line : {
        position:'absolute',
        height: 1,
        width:'96%',
        marginLeft:'2%',
        marginRight: '2%',
        backgroundColor:'#fff'
    }

})
