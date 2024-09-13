import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import storage from "../storage/user";
import { getFavoritesPost, getLikedPost, getSavedPosts } from "../api/user";
import { useFocusEffect } from "@react-navigation/native";
import { GetAllPosts } from "../api/post";
import Comments from "../components/Comments";
import PostCardSaved from "../components/PostCardSaved";

export default function Saved({ navigation, route, params }) {
  const STYLES = ["default", "dark-content", "light-content"];
  const [dataSP, setDataSP] = useState(undefined)
  const [dataFP, setDataFP] = useState(undefined)
  const [dataLP, setDataLP] = useState(undefined)
  const [userData, setUserData] = useState(undefined);
  const [toggle, setToggle] = useState(undefined);
  const [posts, setPosts] = useState(undefined)
  const [postSaved, setPostSaved] = useState(undefined)
  const [postFavorites, setPostFavorites] = useState(undefined)
  const [commentStatus, setCommentStatus] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [locationSave, setLocationSave] = useState("guardados")
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
  let typeAccount = route.params.type;
  const fetchUserData = async (id)=>{
    try {
      const resSaved = await getSavedPosts(id)
      const resFavorites = await getFavoritesPost(id)
      const resLiked = await getLikedPost(id)

      if(resSaved.status === 200){
      setDataSP(resSaved.data)
      const saved = posts?.filter((post)=> resSaved.data.some((SP)=>SP.id === post.id))
      setPostSaved(saved)
    }
    if(resFavorites.status === 200){
      setDataFP(resFavorites.data)
      const saved = posts?.filter((post)=> resFavorites.data.some((SP)=>SP.id === post.id))
      setPostFavorites(saved)
    }
    if(resLiked.status === 200){
      setDataLP(resLiked.data)
    }
   
  } catch (error) {
    console.error("fetchUserData",error); 
  }
  }  
  const fetchAllPost = async ()=>{
    const {status,data,error} =  await GetAllPosts()
    if(status === 200){
      setPosts(data)
     
    }else{
      console.error("fetchAllPost",error);

    }
  }
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.id && posts) {
        fetchUserData(userData.id);
      }
    }, [userData,toggle,posts])
  );
  useFocusEffect(
    React.useCallback(() => {
      fetchAllPost()
    }, [userData,toggle])
  );
  return (
    <View style={{flex:1}}>
{commentStatus !== false && <Comments setTrigger={setTrigger} setCommentStatus={setCommentStatus} comments={commentStatus.comments} userData={commentStatus.userData} postId={commentStatus.postId} fetchUserData={commentStatus.fetchUserData} />}
<View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(10),flexDirection:"row"}}>
  <TouchableOpacity onPress={()=>setLocationSave("guardados")} style={{width:widthPercentageToDP(48),backgroundColor:locationSave === "guardados"?"#171717":"gray",justifyContent:"center",marginVertical: 10,marginHorizontal:widthPercentageToDP(1)}}><Text style={{textAlign:"center",textAlignVertical:"center",color:"white",fontSize:24,fontWeight:"800"}}>Guardados</Text></TouchableOpacity>
  <TouchableOpacity onPress={()=>setLocationSave("favoritos")} style={{width:widthPercentageToDP(48),backgroundColor:locationSave === "favoritos"?"#171717":"gray",justifyContent:"center",marginVertical: 10,marginHorizontal:widthPercentageToDP(1)}}><Text style={{textAlign:"center",textAlignVertical:"center",color:"white",fontSize:24,fontWeight:"800"}}>Favoritos</Text></TouchableOpacity>
</View>
    <ScrollView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={STYLES[2]}
        showHideTransition={"none"}
        hidden={false}
      />
      <View
        style={{
          width: widthPercentageToDP(100),
          height: "auto",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {locationSave === "guardados" && postSaved?.map((post, i) => {
         return(<PostCardSaved  fetchAllPost={fetchUserData} setCommentStatus={setCommentStatus}  navigation={navigation} userData={userData}  data={post} route={route} fetchUserData={fetchUserData} saved={{dataSP,dataFP,dataLP}} key={i}/>)
        })}
        {locationSave === "favoritos" && postFavorites?.map((post, i) => {
         return(<PostCardSaved   fetchAllPost={fetchUserData} setCommentStatus={setCommentStatus}  navigation={navigation} userData={userData}  data={post} route={route} fetchUserData={fetchUserData} saved={{dataSP,dataFP,dataLP}} key={i}/>)
        })}
      </View>
    </ScrollView>
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
  },
});
