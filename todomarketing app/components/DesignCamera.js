import React from 'react'
import { Image } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RemoveBG } from '../api/media';

function DesignCamera({navigation}) {
  const image = require("../assets/camera.png")
  const openMedia = async (type) => {
    let permissionResult;
    let result;

    if (type === 'gallery') {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Se requieren permisos para acceder a la galería.');
        return null;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    } else if (type === 'camera') {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Se requieren permisos para acceder a la cámara.');
        return null;
      }

      result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });
    }

    if (!result.canceled) {
      return result.uri;
    } else {
      return null;
    }
  };

  const handleSelectImage = () => {
    Alert.alert(
      "Seleccionar Imagen",
      "Elige una opción",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cámara",
          
          onPress: async () => {
            const uri = await openMedia('camera');
            if(uri){
              const fileInfo = await FileSystem.getInfoAsync(uri);
              const res = await RemoveBG(fileInfo.uri)
              navigation.navigate("RequiredImageList",{product:res.base64img})
            }
          },
          
        },
        {
          text: "Galería",
          onPress: async () => {
            const uri = await openMedia('gallery');
            if(uri){
              const fileInfo = await FileSystem.getInfoAsync(uri);
              const res = await RemoveBG(fileInfo.uri)
              navigation.navigate("RequiredImageList",{product:res.base64img})
            }
          }
        },
        
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity style={{ marginLeft:"auto",marginRight:"auto",width: widthPercentageToDP(40), height: widthPercentageToDP(40), }} onPress={handleSelectImage}>
    <Image
    source={image}
    style={{ marginLeft:"auto",marginRight:"auto",width: widthPercentageToDP(40), height: widthPercentageToDP(40), }}
    ></Image>
    </TouchableOpacity>
  )
}

export default DesignCamera