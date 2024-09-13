import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { DeleteFile, RemoveBG } from "../api/media";
import * as FileSystem from 'expo-file-system';
export default function ImageDetail({ navigation, route }) {
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(undefined)

  const {id,filePath} = route.params.image
  useEffect(() => {
    const downloadImage = async () => {
      const url = filePath
      const fileUri = FileSystem.cacheDirectory + 'imagen_Gallery.jpg';
      const options = { from: url, to: fileUri };
      await FileSystem.downloadAsync(url, fileUri, options);
     setImageUri(fileUri)
     const fileInfo = await FileSystem.getInfoAsync(fileUri);
     const res = await RemoveBG(fileInfo.uri)
     setBase64Image(res.base64img)
    
    };

    downloadImage();
  }, []);
  const showAlert = () =>
  Alert.alert(
    'Advertencia',
    'Estas seguro(a) de que quieres borrar la imagen?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Borrar',
        onPress: () => DeleteFile(id,navigation),
        style: 'delete',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );
  return (
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
      <Image  source={{
          uri: filePath,
        }} style={{width:widthPercentageToDP(100), height: heightPercentageToDP(50)}} />
        <View style={{marginVertical:10}}></View>
        <Button onPress={showAlert} title="Borrar" color={"red"} />
        <View style={{marginVertical:10}}></View>
        <Button onPress={()=>navigation.navigate("RequiredImageList",{product:base64Image})} title="Seleccionar plantilla" color={"indigo"}  />
        <View style={{marginVertical:10}}></View>
        <Button onPress={()=>navigation.navigate("IABackgroundPicker",{uri:imageUri})} title="Seleccionar fondo con IA" color={"orange"} />
        <View style={{marginVertical:10}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentContainer: {
    justifyContent:"center",
    alignItems:"center"
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
