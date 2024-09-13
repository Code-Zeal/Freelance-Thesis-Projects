import React from 'react'
import { TextInput, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

function SearchInput({content,setContent}) {
  return (
    <View style={{height:heightPercentageToDP(10),width: widthPercentageToDP(100),justifyContent:"center", alignItems:"center"}}>
      <TextInput style={{width:widthPercentageToDP(80),borderWidth:1,padding:2,borderRadius:5}} value={content} onChangeText={(text)=>setContent(text)}/>
    </View>
  )
}

export default SearchInput