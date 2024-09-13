import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

function IntroductionEntrepreneurship({setScreen}) {
  return (
    <View style={{
      flex:1,
      justifyContent:"space-between",
      alignItems:"center"
      
    }}>
      <Image
        source={require("../../../assets/chat/entrepreneurship1.png")}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop:5,
          width: widthPercentageToDP(80),
          height: widthPercentageToDP(80),
        }}
      ></Image>
      <View style={{
        width:widthPercentageToDP(100),
        justifyContent:"space-evenly",
        alignItems:"center",
        height: heightPercentageToDP(40),
        backgroundColor:"gray",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingHorizontal:10

      }}>
      <Text style={{
        fontSize:28,
        fontWeight:"900",
        textAlign:"center",
        color:"white",
      }}>¿Sientes que necesitas más ideas para mejorar como emprendedor/a?</Text>
      <TouchableOpacity onPress={()=>setScreen(4)} style={{
        backgroundColor:"white",
        marginLeft: "auto",
        marginRight: "auto",
        paddingVertical:20,
        paddingHorizontal:60,
        borderRadius:50
      }}>
        <Text style={{color:"#171717", fontSize:25,fontWeight:"900"}}>Siguiente</Text>
      </TouchableOpacity>
        </View>
    </View>
  );
}

export default IntroductionEntrepreneurship;
