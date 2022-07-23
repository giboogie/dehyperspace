import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native';
import {fonts} from '../styles';
// 공통 버튼 컴포넌트
// 일반적으로 사용되는 버튼 컴포넌트 입니다.
 /* props
    title (type : string)
    buttonColor (type : string)
    titleColor (type: string)
    nonClick (type: bool) // 버튼 클릭을 막고 싶을 때.
    onPress (type: function)
 */
export default class CustomButton extends Component{
  static defaultProps = {
    title: 'untitled',
    mode : 'nextFont',

    buttonColor: '',
    titleColor: '#000',
    nonClick: false,
    onPress: () => null,
  }

  constructor(props){
    super(props);
    this.state ={
      nonClick: this.props.nonClick,

    }
  }

  render(){
   const mode = this.props.mode
   let images;
   if (mode =='nextFont'){
    images = {
      'iconFont': require('../../assets/images/box/nextFont.png'),
    }
   }else if (mode =='changeFont'){
    images = {
      'iconFont': require('../../assets/images/box/changeFont.png'),
    }
   }else if (mode =='connectFont'){
    images = {
      'iconFont': require('../../assets/images/box/connectFont.png'),
    }
   }else if (mode =='completFont'){
    images = {
      'iconFont': require('../../assets/images/box/completFont.png'),
    }
    
   }else if (mode =='sendFont'){
    images = {
      'iconFont': require('../../assets/images/box/sendFont.png'),
    }
  }

    return (
      <TouchableOpacity style={(this.props.nonClick)? (
        [styles.nonClickButton,
        {}
        ]) : (
        [styles.button,
        {backgroundColor: this.props.buttonColor}
        ])}
      onPress={this.props.onPress}
      disabled={this.props.nonClick}>
        <ImageBackground
                                    style={styles.BtnImg}

                                    source={require("../../assets/images/box/btnBox2.png")}  //이미지경로
                                    resizeMode="stretch" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
                                ></ImageBackground>
        {/* <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text> */}
        {}
        <Image style={styles.btnIcon}
                                source={images.iconFont}></Image>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 15,
  },
  nonClickButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 26,
    letterSpacing: -0.333333
  },
  BtnImg:{
    width: '100%',
    height: '100%',
    position:'absolute',

  },
  btnIcon:{
    width: 75,
    height: 50
  },
});