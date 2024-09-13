import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

function DesignIcon({icon,navigation}) {
  const {title,screen,logo,params} = icon
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("TemplateContent",params)} style={{width:widthPercentageToDP(45),height: widthPercentageToDP(45),marginHorizontal:widthPercentageToDP(2.5),marginTop:widthPercentageToDP(10),}}>
      <Image
          source={{ uri: logo }}
          style={{ width: widthPercentageToDP(45), height: widthPercentageToDP(45),borderRadius:1000 }}
        ></Image>
    <Text textBreakStrategy='balanced' style={{width: widthPercentageToDP(25), textAlign:"center",}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default DesignIcon