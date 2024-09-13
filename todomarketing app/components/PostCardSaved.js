import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { DeleteFavoritePost, DeleteLikedPost, DeleteSavedPost, FavoritePost, LikedPost, SavePost } from '../api/post';
import Toast from "react-native-toast-message";
function PostCardSaved({fetchAllPost,setCommentStatus,fetchUserData,saved,navigation,userData,data}) {
  const {url,id} = data

  const [savedP, setSavedP] = useState(false)
  const [liked, setLiked] = useState(false)
  const [favorite, setFavorite] = useState(false)
  
  const save = async (type) => {
    const types = {
      post:SavePost,
      like:LikedPost,
      favorite:FavoritePost,
    }
    const varTypes = {
      post:setSavedP,
      like:setLiked,
      favorite:setFavorite,
    }
    const { status } = await types[type](userData.id, id)
    if (status === 200) {
      varTypes[type](true)
      Toast.show({
        type: "success",
        text1: "",
        text2: "Acción realizada correctamente",
      });
      fetchUserData(userData.id)
      fetchAllPost(userData.id)
    } else {
      varTypes[type](false)
      Toast.show({
        type: "error",
        text1: "",
        text2: "Ha ocurrido un error al realizar la acción",
      });
    }
  };
  const remove = async (type) => {
    const types = {
      post:DeleteSavedPost,
      like:DeleteLikedPost,
      favorite:DeleteFavoritePost,
    }
    const varTypes = {
      post:setSavedP,
      like:setLiked,
      favorite:setFavorite,
    }
    const { status } = await types[type](userData.id, id)
    if (status === 200) {
      varTypes[type](false)
      Toast.show({
        type: "success",
        text1: "",
        text2: "Publicación eliminada correctamente",
      });
      fetchAllPost(userData.id)
    } else {
      varTypes[type](true)
      Toast.show({
        type: "error",
        text1: "",
        text2: "Ha ocurrido un error al eliminar la publicación",
      });
    }
  };
  useEffect(() => {
  if(saved && saved.dataSP){
    setSavedP(saved?.dataSP?.some(item => item.id === data.id))
  }
  if(saved && saved.dataFP){
    setFavorite(saved?.dataFP?.some(item => item.id === data.id))
  }
  if(saved && saved.dataLP){
    setLiked(saved?.dataLP?.some(item => item.id === data.id))
  }
  }, [saved])
  return (
    <View
      style={{
        marginVertical: 20,
        borderWidth: 6,
        borderColor: "#000",
        position: "relative",
        paddingTop: widthPercentageToDP(25),
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (savedP) {
            setSavedP(false);
            remove("post");
          } else {
            setSavedP(true);
            save("post");
          }
          return;
        }}
        style={{
          position: "absolute",
          width: widthPercentageToDP(15),
          height: widthPercentageToDP(20),
          top: widthPercentageToDP(2.5),
          right: widthPercentageToDP(0),
          zIndex: 999999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {savedP ? (
          <MaterialCommunityIcons name="bookmark" size={45} color={"#000"} />
        ) : (
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={45}
            color={"#000"}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>{ 
          if(data.userData.id !== userData.id){
            navigation.navigate("EntrepreneurshipProfile", { data,userData })
          }else{
            navigation.navigate("Perfil")
          }
          }}
        style={{
          width: "auto",
          height: widthPercentageToDP(20),
          position: "absolute",
          top: widthPercentageToDP(2.5),
          left: widthPercentageToDP(2.5),
          zIndex: 999999,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={
            data?.userData?.profileImage
              ? {
                  uri: `{backend-url}${data?.userData?.profileImage}`,
                }
              : require("../assets/default.png")
          }
          style={{
            width: widthPercentageToDP(20),
            height: widthPercentageToDP(20),
            borderRadius: 1000,
            backgroundColor: "gray",
          }}
        />
        <Text style={{ width: "auto", marginLeft: widthPercentageToDP(2) }}>
          {data?.userData?.name}
        </Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: url,
        }}
        style={{
          width: widthPercentageToDP(90),
          height: heightPercentageToDP(30),
        }}
      />
      <View
        style={{
          borderTopWidth: 6,
          borderColor: "#000",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 5,
          borderBottomColor: "#171717",
          borderBottomWidth: 2,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="map-marker-radius" size={30} />
          <Text>Ubicación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="truck-delivery" size={30} />
          <Text>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="contacts" size={30} />
          <Text>Contacto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="more" size={30} />
          <Text>Más</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}  onPress={() => {
          if (liked) {
            setLiked(false);
            remove("like");
          } else {
            setLiked(true);
            save("like");
          }
          return;
        }}>
          {liked ? (
            <MaterialCommunityIcons
              name="cards-heart"
              color={"red"}
              size={30}
            />
          ) : (
            <MaterialCommunityIcons name="cards-heart-outline" size={30} />
          )}

          <Text>Me gusta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }} onPress={()=>{
          setCommentStatus({comments:data?.comments,userData,postId:id,fetchUserData,})}}>
         
          <MaterialCommunityIcons name="comment" color={"black"} size={30} />
          <Text>Comentarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {
          if (favorite) {
            setFavorite(false);
            remove("favorite");
          } else {
            setFavorite(true);
            save("favorite");
          }
          return;
        }}>
        {favorite ? (
            <MaterialCommunityIcons name="star" color={"#e1e140"} size={30} />
          ) : (
            <MaterialCommunityIcons name='star-outline'  size={30}  />
          )}
          
          <Text>Favorito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostCardSaved