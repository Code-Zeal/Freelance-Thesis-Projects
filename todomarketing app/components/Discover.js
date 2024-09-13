import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import PostCard from './PostCard'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { getFavoritesPost, getLikedPost, getSavedPosts } from '../api/user'
import storage from '../storage/user'
import { GetAllPosts } from '../api/post'
import { useFocusEffect } from '@react-navigation/native'
import EvilIcons from '@expo/vector-icons/EvilIcons';



function Discover({trigger,setCommentStatus,navigation,route}) {
  const [dataSP, setDataSP] = useState(undefined)
  const [dataFP, setDataFP] = useState(undefined)
  const [dataLP, setDataLP] = useState(undefined)
  const [posts, setPosts] = useState(undefined)
  const [userData, setUserData] = useState(undefined)
  const [loading, setLoading] = useState(false)
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
  
  const fetchUserData = async (id)=>{
    try {
      const resSaved = await getSavedPosts(id)
      const resFavorites = await getFavoritesPost(id)
      const resLiked = await getLikedPost(id)
      if(resSaved.status === 200){
      setDataSP(resSaved.data)
    }
    if(resFavorites.status === 200){
      setDataFP(resFavorites.data)
    }
    if(resLiked.status === 200){
      setDataLP(resLiked.data)
    }
  } catch (error) {
    console.error("fetchUserData",error); 
  }
  }  
  const fetchAllPost = async ()=>{
    setLoading(true)
    const {status,data,error} =  await GetAllPosts()
    if(status === 200){
      console.log("fetch");
      setLoading(false)
      setPosts(data)
    }else{
      setLoading(false)

      console.error("fetchAllPost",error);

    }
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchAllPost()
      if(userData){
        fetchUserData(userData?.id)
      }
    }, [route,userData,trigger])
  );

  return (
    <View style={{width: widthPercentageToDP(100),height: "auto", alignItems:"center",marginTop:20}}>
      <View style={{borderLeftColor:"#000",borderLeftWidth:8,marginRight:"auto", marginLeft:widthPercentageToDP(5),}}>
        <Text style={{fontSize:25,paddingLeft:5,fontWeight:"700"}}>Descubre</Text>
      </View>
      {loading ? <View style={{marginTop:heightPercentageToDP(10)}}><EvilIcons name="spinner" size={80} color="black" /><Text>Cargando...</Text></View> : posts?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((post,i)=>{
        
        return(<PostCard  fetchAllPost={fetchAllPost} setCommentStatus={setCommentStatus}  navigation={navigation} userData={userData}  data={post} route={route} fetchUserData={fetchUserData} saved={{dataSP,dataFP,dataLP}} key={i}/>)
      })}
      
    </View>
  )
}

export default Discover