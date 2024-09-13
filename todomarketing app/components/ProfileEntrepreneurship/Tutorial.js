import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';
import { updateUserInfo } from "../../api/user";
import Toast from "react-native-toast-message";

function Tutorial({fetchUserInfo, setSelectGallery, userInfo }) {
  
  const updateInfo =async ()=>{
   const {status,data,error} = await updateUserInfo(userInfo.id,"tutorialProfile",true)
    if(status !== 200){
      return
    } else {
      fetchUserInfo()
      return
  }}

  return (
    <View
      style={{
        flex: 1,
        width: widthPercentageToDP(100),
        position: "absolute",
        zIndex: 99999,
      }}
    >
      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(50),
          backgroundColor: "#171717",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userInfo?.profileImage === null || userInfo?.profileImage === undefined || userInfo?.profileImage === ""  ? (
          <View
            style={{
              width: heightPercentageToDP(35),
              height: heightPercentageToDP(35),
              backgroundColor: "#fff",
              borderRadius: 1000,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
            }}
          >
            <Text
              style={{ fontWeight: "700", fontSize: 16, textAlign: "center" }}
            >
              Se sugiere colocar el logo de su emprendimiento o algo que lo
              caracterice
            </Text>
            <TouchableOpacity
              onPress={() =>
                setSelectGallery({ status: true, value: "profile" })
              }
            >
              <Ionicons
                name="add-circle"
                size={50}
                style={{ marginTop: 10 }}
                color="black"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <AntDesign name="checkcircle" size={150} color="#83C687" />
          </View>
        )}
        <Image
          source={require("../../assets/default.png")}
          style={{
            position: "absolute",
            top: heightPercentageToDP(38),
            marginLeft: "auto",
            marginR38ht: "auto",
            width: widthPercentageToDP(30),
            height: widthPercentageToDP(30),
          }}
        ></Image>
      </View>
      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(50),
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userInfo?.coverImage === null || userInfo?.coverImage === undefined || userInfo?.coverImage === "" ? (
          <View
            style={{
              width: heightPercentageToDP(35),
              height: heightPercentageToDP(35),
              backgroundColor: "#fff",
              borderRadius: 1000,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              marginBottom: heightPercentageToDP(10),
            }}
          >
            <Text
              style={{ fontWeight: "700", fontSize: 16, textAlign: "center" }}
            >
              Se sugiere colocar la fachada de su emprendimiento o algo que lo
              caracterice
            </Text>
            <TouchableOpacity
              onPress={() => setSelectGallery({ status: true, value: "cover" })}
            >
              <Ionicons
                name="add-circle"
                size={50}
                style={{ marginTop: 10 }}
                color="black"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <AntDesign name="checkcircle" size={150} color="#83C687" />
          </View>
        )}
        <TouchableOpacity
        onPress={()=>updateInfo()}
          style={{
            position: "absolute",
            bottom: heightPercentageToDP(11),
            right: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Finalizar consejos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Tutorial;
