import * as React from "react"
import Svg, { Path } from "react-native-svg"

function leftSvgComponent(props) {
  return (
    <Svg
      width={107}
      height={107}
      viewBox="0 0 107 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 107A107 107 0 01107 0v107H0z" fill="#222744" />
    </Svg>
  )
}

export default leftSvgComponent