import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
/* 

props 
value:int
direction:bool 진행방향 true > right, false > left  
progressColor:string 
*/
const ProgressBar = (props) => {
  let animation = useRef(new Animated.Value(1));
  const [progress, setProgress] = useState(0);
  const [fillColor, setFillColor] = useState(0);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: props.value,
      duration: 500,
      delay:Math.floor(Math.random() * 900),
      useNativeDriver: false
    }).start();
    if(props.value<=20){
      setFillColor('rgba(255, 255, 255, 0.25);')
    }else if(props.value <=80){
      setFillColor('rgba(255, 255, 255, 0.7);')
    }else if(props.value = 100){
      setFillColor('rgba(255, 255, 255, 1);')
    }
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
    // extrapolateRight:"extend"
  })

  return (
    <View style={props.direction ? styles.container : styles.leftContainer}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.fillBox], {backgroundColor:fillColor,    borderBottomRightRadius: 20,
    borderTopRightRadius: 20, width }}/>
      </View>

    </View>
  );
}
ProgressBar.defaultProps = {
  value:0,
  direction:true,

}
export default ProgressBar;

const styles = StyleSheet.create({
    fillBox:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'#e2e2e2',
    },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 30,
    padding: 8,
   // transform: [{ rotate: '180deg'}]
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 30,
    padding: 8,
    transform: [{ rotate: '180deg'}]
  },
  progressBar: {
    flexDirection: 'row',
    height: 15,
    width: '100%',
    // borderColor: '#000',
    // backgroundColor:'#fff',
    // borderWidth: 2,

  }
});