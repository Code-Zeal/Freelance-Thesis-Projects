import React from 'react'
import { Text, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

function ProfileStats({posts,followers,following}) {
  return (
    <View style={{width: widthPercentageToDP(100),flexDirection:"row", justifyContent:"space-evenly",alignItems:"center",marginVertical:10}}>
      <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"#000",fontSize:22}}>{posts}</Text>
        <Text style={{color:"#04B879",fontSize:14}}>Publicaciones</Text>
      </View>
      <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"#000",fontSize:22}}>{followers}</Text>
        <Text style={{color:"#04B879",fontSize:14}}>Seguidores</Text>
      </View>
      <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"#000",fontSize:22}}>{following}</Text>
        <Text style={{color:"#04B879",fontSize:14}}>Seguidos</Text>
      </View>

    </View>
  )
}

export default ProfileStats