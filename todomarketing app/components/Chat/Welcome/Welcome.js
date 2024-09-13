import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

function Welcome({setScreen,updateInfo}) {
  return (
    <View style={{
      flex:1,
      justifyContent:"space-evenly",
      alignItems:"center"
      
    }}>
      <Image
        source={require("../../../assets/default.png")}
        style={{
          backgroundColor:"#03B97A",
          borderRadius:1000,
          marginLeft: "auto",
          marginRight: "auto",
          width: widthPercentageToDP(50),
          height: widthPercentageToDP(50),
        }}
      ></Image>
      <Text style={{
        fontSize:28,
        fontWeight:"900",
        textAlign:"center"
      }}>Bienvenido a chat marketing</Text>
      <Image
        source={require("../../../assets/chat/bienvenidos.png")}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: widthPercentageToDP(50),
          height: widthPercentageToDP(50),
        }}
      ></Image>
      <TouchableOpacity 
       onPress={async()=>{
        await updateInfo() 
        setScreen(6)
      }
      } 
      style={{
        backgroundColor:"gray",
        marginLeft: "auto",
        marginRight: "auto",
        paddingVertical:20,
        paddingHorizontal:60,
        borderRadius:50
      }}>
        <Text style={{color:"#fff", fontSize:25}}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Welcome;
