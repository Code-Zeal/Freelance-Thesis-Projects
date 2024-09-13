import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import storage from "../storage/user";
import ProfileHead from "../components/ProfileEntrepreneurship/ProfileHead";
import ProfilePosts from "../components/ProfileEntrepreneurship/ProfilePosts";
import { useFocusEffect } from "@react-navigation/native";
import { getUserInfo } from "../api/user";
// import PostDetail from "../components/ProfileEntrepreneurship/PostDetail";

export default function EntrepreneurshipProfile({ navigation, route }) {
  const [userInfo, setUserInfo] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [entrepreneurshipInfo, setEntrepreneurshipInfo] = useState(undefined)
  const [profileSection, setProfileSection] = useState("publicaciones")
  const [postDetailStatus, setPostDetailStatus] = useState({data:{},status:false})
  const [following, setFollowing] = useState(undefined)


  const setDataEntrep = async ()=>{
    const {status,data,error} = await getUserInfo(userData.id)
    if(data){
      
      
      setUserInfo(route.params.data.userData)
      setEntrepreneurshipInfo(route.params.data)
      
      if(data?.accountsFollowing?.some((value)=>value.entrepreneurshipId == route.params.data.entrepreneurshipData.userOwner)){
        setFollowing(true)
      }else{
        setFollowing(false)
      }
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      if(route?.params?.data && userData){
        setDataEntrep()
        
      }
    }, [route,userData])
  );
  

  storage
    .load({
      key: "user",
      autoSync: true,
      syncInBackground: true,
    })
    .then((ret) => {
      setUserData(ret);
    })
    .catch((err) => {
      console.warn(err.message);
      switch (err.name) {
        case "NotFoundError":
          break;
      }
    });

  return (
    <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(100),position:"relative"}}>
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
    <ScrollView style={styles.container}>
      {userInfo && 
      <ProfileHead setUserInfo={setUserInfo}  following={following} setFollowing={setFollowing} entrepreneurship={entrepreneurshipInfo} backgroundImage={userInfo.coverImage} profileImage={userInfo.profileImage} userInfo={userInfo} />
      }
      {entrepreneurshipInfo && <ProfilePosts setPostDetailStatus={setPostDetailStatus} postDetailStatus={postDetailStatus} profileSection={profileSection} setProfileSection={setProfileSection} navigation={navigation} entrepreneurship={entrepreneurshipInfo.entrepreneurshipData}/>}
    </ScrollView>
    {/* <PostDetail status={postDetailStatus} setStatus={setPostDetailStatus}  /> */}

  </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: heightPercentageToDP(100),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(100)
  },
});
