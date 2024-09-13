import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
function DesignMainButtons({navigation}) {
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
        allowsEditing: true,
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
      return result.assets[0].uri;
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
              navigation.navigate("IABackgroundPicker",{uri})
            }
          },
          
        },
        {
          text: "Galería",
          onPress: async () => {
            const uri = await openMedia('gallery');
            
            if(uri){
              navigation.navigate("IABackgroundPicker",{uri})
            }
          }
        },
        
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={{flexDirection:"row", width:widthPercentageToDP(100), justifyContent:"space-evenly"}}>
    <TouchableOpacity style={{backgroundColor:"#DBDBDB" ,paddingVertical:15,paddingHorizontal:10,marginTop:15,borderRadius:8}} onPress={()=>navigation.navigate("Gallery")}>
        <Text style={{color:"#171717", fontSize:24,fontWeight:'700'}}>Mi Galería</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#DBDBDB" ,paddingVertical:15,paddingHorizontal:10,marginTop:15,borderRadius:8}} onPress={handleSelectImage}>
        <Text style={{color:"#171717", fontSize:24,fontWeight:'700'}}>Fondos IA</Text>
      </TouchableOpacity>
      
    </View>
  )
}
//delete EditByAI
export default DesignMainButtons