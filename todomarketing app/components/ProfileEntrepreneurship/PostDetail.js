import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import AntDesign from '@expo/vector-icons/AntDesign';

function PostDetail({status,setStatus}) {
useEffect(() => {
  
}, [status])

  
  if(status.status) return (
    <View style={{
      position:"absolute",
      width: widthPercentageToDP(80),
      height: heightPercentageToDP(80),
      backgroundColor:"white",
      left:0,
      right:0,
      top:0,
      bottom:0,
      marginLeft:widthPercentageToDP(10),
      marginRight:widthPercentageToDP(10),
      marginTop:heightPercentageToDP(5),
    }}>
      <View style={{
        backgroundColor:"#03B97A",

      }}>

      <TouchableOpacity onPress={()=>setStatus({
        data:{},
        status:false
      })}
      style={{
        marginLeft:"auto",
        marginRight:10,
        paddingVertical:10
      }}
      >
      <AntDesign name="close" size={30} color="white" />
      </TouchableOpacity>
      </View>
      {status?.data ?<View>
        <View>
          <Text>status?.data.posts</Text>
        </View>
        <View>
          <Text>Info de la publicación</Text>
        </View>
        <View>
          <Text>stats de la publicación</Text>
        </View>
      </View>
        :
        <View></View>}
      
    </View>
  )
}

export default PostDetail