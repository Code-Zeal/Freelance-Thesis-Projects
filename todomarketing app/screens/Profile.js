import React, { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { getUserInfo, updateUserInfo } from "../api/user";
import storage from "../storage/user";
import ProfileHead from "../components/Profile/ProfileHead";
import { GetMyEntrepreneurships } from "../api/entrepreneurship";
import NoEntrepreneurship from "./NoEntrepreneurship";
import ProfilePosts from "../components/Profile/ProfilePosts";
import DesignCamera from "../components/DesignCamera";
import SelectGallery from "../components/Gallery/SelectGallery";
import camera from "../components/Gallery/utils/camera";
import openGallery from "../components/Gallery/utils/phoneGallery";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
// import PostDetail from "../components/Profile/PostDetail";
import Tutorial from "../components/Profile/Tutorial";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Profile({ navigation, route }) {
  const [userInfo, setUserInfo] = useState(undefined);
  const [entrepreneurshipInfo, setEntrepreneurshipInfo] = useState(undefined)
  const [userData, setUserData] = useState(undefined);
  const [profileSection, setProfileSection] = useState("publicaciones")
  const [selectGallery, setSelectGallery] = useState({status:false,data:{}})
  const [imagePost, setImagePost] = useState(undefined)
  const [imageProfile, setImageProfile] = useState(undefined)
  const [imageCover, setImageCover] = useState(undefined)
  const fetchUserInfo = async () => {
    if (userData) {
      const { data, status, error } = await getUserInfo(userData.id);
      if (status === 200) {
        setUserInfo(data)
        return {
          data,
          status,
          error: undefined,
        };
      } else {
        return {
          data,
          status,
          error,
        };
      }
    }
  };
  useEffect(() => {
    
    if(route?.params?.image){
      if(route?.params?.to === "post"){
        setImagePost(route?.params?.image?.uri)
      }else if(route?.params?.to === "profile"){
        setImageProfile(route?.params?.image?.uri)
        
      }else if(route?.params?.to === "cover"){
        setImageCover(route?.params?.image?.uri)

      }
    }else if(route?.params?.none){
      setImagePost(undefined)
      setImageProfile(undefined)
      setImageCover(undefined)
    }
  }, [route])

  useEffect(() => {
    
  if(imagePost && entrepreneurshipInfo){
    navigation.navigate("NewPost",{
      image:{
      uri:imagePost},
      entrepreneurship:entrepreneurshipInfo[0]
      
    })
  }

  }, [imagePost,entrepreneurshipInfo])


  const updateImageProfileCover = async (key,value)=>{
    const {status,data,error} = await updateUserInfo(userData.id,key,value)
    if(status !== 200){
      Toast.show({
    type:"error",
    text1: "",
    text2: `Ha ocurrido un error al actualizar`,
    
    })
    return
  }
    Toast.show({
      type:"success",
      text1:"",
      text2: `Ha sido actualizado correctamente`,
      
    })
    await fetchUserInfo()
    return
}
  useEffect(() => {
    
    if(imageProfile){
      updateImageProfileCover("profileImage",imageProfile)
    }
    if (imageCover){
      updateImageProfileCover("coverImage",imageCover)
    }
  
    }, [imageProfile,imageCover])
  
  const updateUserData = async (key,value)=>{
    try {
      if(value.length < 1 || value === true){
        Toast.show({
          type:"info",
          text1: key === "name" ? "Nombre" : key === "description" ? "Descripción" : "Categoría",
          text2: `Necesitas ingresar al menos 2 caracteres`,
          
        })
        await fetchUserInfo()
        return
      }
      const {status,data,error} = await updateUserInfo(userData.id,key,value)
      if(status !== 200){
        Toast.show({
      type:"error",
      text1: key === "name" ? "Nombre" : key === "description" ? "Descripción" : "Categoría",
      text2: `Ha ocurrido un error al actualizar`,
      
    })
    return
   }else{
    await fetchUserInfo()
    Toast.show({
      type:"success",
      text1: key === "name" ? "Nombre" : key === "description" ? "Descripción" : "Categoría",
      text2: `Ha sido actualizado correctamente`,
      
    })
    return
  }
} catch (error) {
  console.log(error);
}
  }

  const selectMyGalleryImage = (type,to)=>{
    navigation.navigate("PickImageMyGallery",{navigation:"Perfil",content:{none:true,type,to}})
  }
  const selectCameraImage = async(type,to)=>{
    const res = await camera(type)
    if(res === null){
      setSelectGallery({status:false})
    }else{
      if(to === "post"){
        setImagePost(res)
      }else if (to === "profile"){
        setImageProfile(res)
      }else if (to === "cover"){
        setImageCover(res)
      }
    }
    return res
  }

  const selectPhoneGalleryImage = async(type,to)=>{
    const res = await openGallery(type)
    if(res === null){
      setSelectGallery({status:false})
    }else{
      if(to === "post"){
        setImagePost(res)
      }else if (to === "profile"){
        setImageProfile(res)
      }else if (to === "cover"){
        setImageCover(res)
      }
    }
    return res
  }

  useEffect(() => {
    if(selectGallery?.status === false && selectGallery?.data?.app === "videoPost"){
      selectMyGalleryImage("video","post")
      
    }else if(selectGallery?.status === false && selectGallery?.data?.mobile === "videoPost"){
      selectPhoneGalleryImage("video","post")
    }else if(selectGallery?.status === false && selectGallery?.data?.camera === "videoPost"){
      selectCameraImage("video","post")
      
    }else if(selectGallery?.status === false && selectGallery?.data?.app === "imagePost"){
      selectMyGalleryImage("imagen","post")
      
    }else if(selectGallery?.status === false && selectGallery?.data?.mobile === "imagePost"){
      selectPhoneGalleryImage("imagen","post")
    }else if(selectGallery?.status === false && selectGallery?.data?.camera === "imagePost"){
      selectCameraImage("imagen","post")
      
    }else if(selectGallery?.status === false && selectGallery?.data?.app === "profile"){
      
      selectMyGalleryImage("imagen","profile")
    }else if(selectGallery?.status === false && selectGallery?.data?.mobile === "profile"){
      selectPhoneGalleryImage("imagen","profile")
    }else if(selectGallery?.status === false && selectGallery?.data?.camera === "profile"){
      selectCameraImage("imagen","profile")
      
    }else if(selectGallery?.status === false && selectGallery?.data?.app === "cover"){
      selectMyGalleryImage("imagen","cover")
    }else if(selectGallery?.status === false && selectGallery?.data?.mobile === "cover"){
      selectPhoneGalleryImage("imagen","cover")
    }else if(selectGallery?.status === false && selectGallery?.data?.camera === "cover"){
      selectCameraImage("imagen","cover")
      
    }
  
  }, [selectGallery])
  

  
  const fetchEntrepreneurshipInfo = async () => {
    if (userData) {
      const { data, status, error } = await GetMyEntrepreneurships(userData.id);
      if (status === 200) {
        setEntrepreneurshipInfo(data)
        return {
          data,
          status,
          error: undefined,
        };
      } else {
        setEntrepreneurshipInfo(false)
        return {
          data,
          status,
          error,
        };
      }
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchUserInfo();
      fetchEntrepreneurshipInfo();
    }, [userData])
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
    const [postDetailStatus, setPostDetailStatus] = useState({data:{},status:false})
    const image = require("../assets/camera.png")

  return (
    <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(100),position:"relative"}}>
      {userInfo?.tutorialProfile === false &&<Tutorial fetchUserInfo={fetchUserInfo}  setSelectGallery={setSelectGallery} userInfo={userInfo}/>}
      <TouchableOpacity onPress={async()=>{
     await storage.remove({
        key: 'user',
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Welcome",
            },
          ],
        })
      );
      }} style={{position:"absolute", bottom:heightPercentageToDP(13),borderRadius:100 ,right:20,zIndex:1,backgroundColor:"#ffe652",padding:10}}>
      <MaterialCommunityIcons name='logout' color={"#000"} size={70} />
    </TouchableOpacity>
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
       {userData?.typeAccount === "entrepreneur" && profileSection === "videos" ? <TouchableOpacity
        onPress={()=>{
          
        return  setSelectGallery({status:true,value:"videoPost"})
        }}
        style={{
          position: "absolute",
          bottom: heightPercentageToDP(12),
          left: widthPercentageToDP(30),
          right: widthPercentageToDP(30),
          zIndex: 9999,
          width: widthPercentageToDP(40),
          height: widthPercentageToDP(32),
        }}
      >
      <Image
    source={image}
    style={{ marginLeft:"auto",marginRight:"auto",width: widthPercentageToDP(40), height: widthPercentageToDP(40), }}
    ></Image>
      </TouchableOpacity>: userData?.typeAccount === "entrepreneur" &&
      <TouchableOpacity
      onPress={()=>{
        
      return  setSelectGallery({status:true,value:"imagePost"})
      }}
      style={{
        position: "absolute",
        bottom: heightPercentageToDP(12),
        left: widthPercentageToDP(30),
        right: widthPercentageToDP(30),
        zIndex: 9999,
        width: widthPercentageToDP(40),
        height: widthPercentageToDP(32),
      }}
    >
    <Image
  source={image}
  style={{ marginLeft:"auto",marginRight:"auto",width: widthPercentageToDP(40), height: widthPercentageToDP(40), }}
  ></Image>
    </TouchableOpacity>
      }
      <SelectGallery state={selectGallery} setState={setSelectGallery}/>
    <ScrollView style={styles.container}>
      {userInfo && 
      <ProfileHead entrepreneurship={entrepreneurshipInfo} backgroundImage={userInfo.coverImage} profileImage={userInfo.profileImage} userInfo={userInfo} updateUserData={updateUserData} setSelectGallery={setSelectGallery} />
      }
      {entrepreneurshipInfo === false && <NoEntrepreneurship navigation={navigation} userInfo={userInfo}/>}
      {entrepreneurshipInfo && <ProfilePosts setPostDetailStatus={setPostDetailStatus} postDetailStatus={postDetailStatus} profileSection={profileSection} setProfileSection={setProfileSection} navigation={navigation} entrepreneurship={entrepreneurshipInfo}/>}
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
