import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
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
export default class CustomButtonHalf extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#F5A4C7',
    titleColor: '#fff',
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
    return (
      <TouchableOpacity style={(this.props.nonClick)? (
        [styles.nonClickButton,
        {backgroundColor: '#e8e8e8'}
        ]) : (
        [styles.button,
        {backgroundColor: this.props.buttonColor}
        ])}
      onPress={this.props.onPress}
      disabled={this.props.nonClick}>
        
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding:10,
    height:48,
    width:80,
    backgroundColor:"#F5A4C7"

  },
  nonClickButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding:10,
    height:48,
    width:80,
  },
  title: {
    fontSize: 12,
    fontWeight:"500",
  },
});