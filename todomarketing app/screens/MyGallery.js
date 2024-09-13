import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import storage from "../storage/user";
import { GetMyGallery } from "../api/media";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
export default function MyGallery({ navigation, route }) {
  const [images, setImages] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  
 
  async function uploadFile() {
    // Pedir al usuario que seleccione una imagen o un video
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
  
    if (result.cancelled) {
      return;
    }
    const imageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'tiff', 'jfif', 'heif', 'indd', 'ai', 'eps', 'pdf', 'svg'];
    let ext = result.assets[0]?.uri?.split('.')?.pop()
    
    if(imageExtensions.includes(ext)){
     return navigation.navigate("RemoveBg",{image:{
        uri: result.assets[0].uri,
        name: `photo.${result.assets[0].uri.split('.').pop()}`,
        type: `image/${result.assets[0].uri.split('.').pop()}`,
      },userId:userData.id})
    }else{
      let formData = new FormData();
      formData.append('file', {
        uri: result.assets[0].uri,
        name: `photo.${result.assets[0].uri.split('.').pop()}`,
        type: `image/${result.assets[0].uri.split('.').pop()}`,
      });
      formData.append('userId', userData?.id); // reemplaza 'your-user-id' con el ID de usuario correspondiente
    
      // Enviar el archivo al servidor
      await fetch('{backend-url}/media/saveFile', { 
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => navigation.navigate("Gallery"))
      .catch((error) => {
        console.error(error);
      }); 
    }
  
   
  }
  
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

  const fetchAllImages = async (userId) => {
    const { status, data, error } = await GetMyGallery(userId);
    if (status === 200) {
      setImages(data);
    } else {
      console.error("fetchAllImages", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.id) {
        fetchAllImages(userData.id);
      }
    }, [userData])
  );

  return (
    <View
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <StatusBar
          animated={false}
          backgroundColor="#03B97A"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />
        {images?.map((image) => {
          if (image.filePath.includes("mp4")) {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("VideoDetail", { video:image })}
              >
                <Image
                  source={require("./videoDefault.png")}
                  style={{
                    width: widthPercentageToDP(45),
                    height: widthPercentageToDP(45),
                    marginRight: widthPercentageToDP(2.5),
                    marginLeft: widthPercentageToDP(2.5),
                  }}
                />
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ImageDetail", { image })}
              >
                <Image
                  source={{
                    uri: image.filePath,
                  }}
                  style={{
                    width: widthPercentageToDP(45),
                    height: widthPercentageToDP(45),
                    marginRight: widthPercentageToDP(2.5),
                    marginLeft: widthPercentageToDP(2.5),
                    marginVertical: heightPercentageToDP(2),
                  }}
                />
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={uploadFile}
        style={{ position: "absolute", right: 20, bottom: 20 }}
        // onPress={() => navigation.navigate("ImageDetail", { image })}
      >
        <MaterialCommunityIcons name="plus-circle" color={"black"} style={{backgroundColor:"white",borderRadius:1000}} size={80} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
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
