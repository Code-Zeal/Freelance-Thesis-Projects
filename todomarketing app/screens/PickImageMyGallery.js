import React, {  useRef, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import storage from '../storage/user';
import { GetMyGallery } from '../api/media';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video,ResizeMode } from 'expo-av'
export default function PickImageMyGallery({navigation,route}) {
  const [status, setStatus] = useState({})
  const video = useRef(null);
  const [images, setImages] = useState(undefined)
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
  
  
  const fetchAllImages = async (userId)=>{
    const {status,data,error} =  await GetMyGallery(userId)
    if(status === 200){
      setImages(data)
    }else{
      console.error("fetchAllImages",error);

    }
  }
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.id) {
        fetchAllImages(userData.id);
      }
    }, [userData])
  );
  
  return (
  <View style={{flex:1}}>
    <View style={{height:heightPercentageToDP(10),justifyContent:"flex-start",alignItems:"center",flexDirection:"row",backgroundColor: "#00734A",width:widthPercentageToDP(100)}}>
    <TouchableOpacity
                onPress={() => navigation.navigate(route?.params?.navigation,route?.params?.content)}
                style={{
                  width:widthPercentageToDP(20),
                  borderWidth: 1,
                  borderColor: "#00925F",
                  borderRadius: 20,
                  padding: 2,
                  backgroundColor: "#03B97A",
                  marginLeft:5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left-thin"
                  color={"#fff"}
                  size={60}
                />
              </TouchableOpacity>
    </View>
  <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
    <StatusBar
      animated={false}
      backgroundColor="#03B97A"
      barStyle={"light-content"}
      showHideTransition={"none"}
      hidden={false}
    />
    {images?.map((image)=>{
      if(image.filePath.includes("mp4") && route?.params?.content?.type === "video" && images?.filter((image)=>image.type === "video/mp4")?.length > 0){
        <TouchableOpacity onPress={()=>navigation.navigate("Perfil",{
          to:route?.params?.content?.to,
          image:{
          uri: image?.filePath,
          name: `photo.${image.filePath.split('.').pop()}`,
          type: `video/${image.filePath.split('.').pop()}`,
        },userId:userData.id
        })}>
          <Video
          ref={video}
          style={styles.video}
          source={{
              uri: `{backend-url}${image?.filePath}`,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            </TouchableOpacity>
      }else if(route?.params?.content?.type === "imagen" && images?.filter((image)=>image.type === "image/jpeg")?.length > 0) {
        return (
          <TouchableOpacity onPress={()=>navigation.navigate("Perfil",{
            to:route?.params?.content?.to,
            image:{
            uri: image?.filePath,
            name: `photo.${image.filePath.split('.').pop()}`,
            type: `image/${image.filePath.split('.').pop()}`,
          },userId:userData.id})}>

          <Image
            source={{
              uri: image.filePath,
            }}
            style={{
              width: widthPercentageToDP(40),
              height: widthPercentageToDP(40),
              marginRight: widthPercentageToDP(2.5),
              marginLeft: widthPercentageToDP(2.5),
            }}
            />
            </TouchableOpacity>
        );
      }else{
        return
      }
    })

  
    }
    {(route?.params?.content?.type === "video" && images?.filter((image)=>image.type === "video/mp4")?.length > 0 ) || ( route?.params?.content?.type === "imagen" && images?.filter((image)=>image.type === "image/jpeg")?.length > 0) ?false: <View><Text>No se encontraron archivos en tu galería</Text></View>}
  </ScrollView>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:heightPercentageToDP(90),
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentContainer: {
    height:heightPercentageToDP(90),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent:"space-around"
  },
  video: {
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "#171717",
    width: widthPercentageToDP(45),
    height: widthPercentageToDP(45),
    marginRight: widthPercentageToDP(2.5),
    marginLeft: widthPercentageToDP(2.5),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
