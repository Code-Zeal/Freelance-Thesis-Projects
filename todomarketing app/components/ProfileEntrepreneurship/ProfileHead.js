import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ProfileStats from "./ProfileStats.js";
import { startFollowing, stopFollowing } from "../../api/user.js";
import Toast from "react-native-toast-message";
import storage from "../../storage/user.js";

function ProfileHead({
  backgroundImage,
  profileImage,
  userInfo,
  entrepreneurship,
  following,
  setFollowing,
  setUserInfo
}) {
  const [entrepreneurshipInfo, setEntrepreneurshipInfo] = useState(undefined)
  const [userData, setUserData] = useState(undefined)
  storage
  .load({
    key: 'user',
    autoSync: true,
    syncInBackground: true,
  })
  .then(ret => {
    setUserData(ret)
  })
  .catch(err => {
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        break;
    }
  });
  

  useEffect(() => {
    
  if(entrepreneurship){
    setEntrepreneurshipInfo(entrepreneurship)
  }
  }, [entrepreneurship])
  
  const followProfile = async ()=>{
    setFollowing(true)
    const {status} = await startFollowing(userData.id,entrepreneurshipInfo.entrepreneurshipData.userOwner)
    if(status === 200){
      Toast.show({
        type: "success",
        text1: "",
        text2: "Acción realizada correctamente",
      });
      let newData = {...userInfo,accountsFollowing:[...userInfo?.accountsFollowing,{date:Date.now(),entrepreneurship:entrepreneurshipInfo.entrepreneurshipData.id}]}
      
      setUserInfo(newData)
      setEntrepreneurshipInfo({...entrepreneurshipInfo, userData:{...entrepreneurshipInfo.userData,followers:entrepreneurshipInfo.userData.followers+1}})
      setFollowing(true)
    }else{
      Toast.show({
        type: "error",
        text1: "",
        text2: "Ha ocurrido un error al realizar esta acción",
      });
    setFollowing(false)

    }
  }

  const unFollowProfile = async ()=>{
    setFollowing(false)

    const {status} = await stopFollowing(userData.id,entrepreneurshipInfo.entrepreneurshipData.userOwner)
    if(status === 200){
      Toast.show({
        type: "success",
        text1: "",
        text2: "Acción realizada correctamente",
      });
      let accountsFollowing = userInfo?.accountsFollowing.filter((el)=>el.entrepreneurshipId === userInfo.id)
      let newData = {...userInfo,accountsFollowing}
      setUserInfo(newData)
      setEntrepreneurshipInfo({...entrepreneurshipInfo, userData:{...entrepreneurshipInfo.userData,followers:entrepreneurshipInfo.userData.followers-1}})
    setFollowing(false)
    }else{
      Toast.show({
        type: "error",
        text1: "",
        text2: "Ha ocurrido un error al realizar esta acción",
      });
    setFollowing(true)

    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          backgroundImage
            ? {
                uri: `{backend-url}${backgroundImage}`,
              }
            : require("../../assets/default2.png")
        }
        style={styles.imageRectangle}
      />
      <View style={styles.profileContainer}>
        <Image
          source={
            profileImage
              ? {
                  uri: `{backend-url}${profileImage}`,
                }
              : require("../../assets/default.png")
          }
          style={styles.imageCircle}
        />
      </View>
      <View
        style={{
          marginRight: "auto",
          left: 140,
          top: 25,
          position: "absolute",
          width: widthPercentageToDP(58),
          height: heightPercentageToDP(15),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "left",
            fontWeight: "700",
          }}
        >
          {userInfo?.name?.length > 0 ? userInfo?.name : "Sin nombre"}
        </Text>
      </View>

      <View
        style={{
          marginRight: "auto",
          left: 140,
          top: 132,
          position: "absolute",
          width: widthPercentageToDP(42),
          height: heightPercentageToDP(10),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {userInfo?.category?.length > 0
            ? userInfo?.category
            : "Sin categoría"}
        </Text>
      </View>

      <View
        style={{
          marginRight: "auto",
          marginLeft: widthPercentageToDP(5),
          marginVertical: 5,
          width: widthPercentageToDP(95),
          height: "auto",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {userInfo?.description?.length > 0
            ? userInfo?.description
            : "Sin descripción"}
        </Text>
      </View>
      {following ? <TouchableOpacity onPress={()=>unFollowProfile()} style={{marginVertical:heightPercentageToDP(2.5),backgroundColor:"#0f4532",paddingHorizontal:widthPercentageToDP(3),paddingVertical:widthPercentageToDP(2),marginRight:"auto",marginLeft:widthPercentageToDP(5),borderRadius:10}}><Text style={{color:"#fff",fontSize:24}}>Siguiendo</Text></TouchableOpacity>
      :
      <TouchableOpacity onPress={()=>followProfile()} style={{marginVertical:heightPercentageToDP(2.5),backgroundColor:"#04B879",paddingHorizontal:widthPercentageToDP(3),paddingVertical:widthPercentageToDP(2),marginRight:"auto",marginLeft:widthPercentageToDP(5),borderRadius:10}}><Text style={{color:"#fff",fontSize:24}}>Seguir</Text></TouchableOpacity>}
      <ProfileStats
        followers={entrepreneurshipInfo?.userData?.followers}
        following={entrepreneurshipInfo?.userData?.following}
        posts={entrepreneurshipInfo ? entrepreneurshipInfo?.entrepreneurshipData?.posts?.length : 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D2E4A2",
  },
  imageRectangle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor:"white",
    borderWidth: 1,
    borderColor: "#000",
  },
  profileContainer: {
    backgroundColor:"gray",
    width: 120,
    height: 120,
    borderRadius: 100,
    position: "absolute",
    top: 70,
    left: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#000",
  },
  imageCircle: {
    borderRadius: 100,
    width: 120,
    height: 120,
  },
});

export default ProfileHead;
