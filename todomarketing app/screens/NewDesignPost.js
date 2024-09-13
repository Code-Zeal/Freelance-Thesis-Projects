import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { CreatePostApi } from "../api/post";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import storage from "../storage/user";
import { GetMyEntrepreneurships } from "../api/entrepreneurship";
function NewDesignPost({ navigation, route }) {

  const [description, setDescription] = useState({
    value:"",
    error:""
  })
  const [tags, setTags] = useState({value:"",error:""})
  const [imageSelected, setImageSelected] = useState(undefined)
  const [userData, setUserData] = useState(undefined)

  const [status, setStatus] = useState({});
  useEffect(() => {
    
  }, [userData])
  
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
  const openMedia = async () => {
    let permissionResult;
    let result;

      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Se requieren permisos para acceder a la galería.');
        return null;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.canceled) {
      setImageSelected(result.assets[0].uri)
      return result.assets[0].uri;
    } else {
      return null;
    }
  };
  const createNewPost = async () => {
    try {
      const res = await GetMyEntrepreneurships(userData.id)
      const title = "test";
      const media = "imagen"
      const url = imageSelected
      const entrepreneurshipId = res?.data[0]?.id
      
      const { status, data, error } = await CreatePostApi(
        title,
        description.value,
        media,
        url,
        entrepreneurshipId
      );
      if (status === 200) {
        Toast.show({
          type: "success",
          text1: "",
          text2: "Publicación creada correctamente",
        });
        navigation.navigate("Perfil",{none:true});
      } else {
        throw new Error(error);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "",
        text2: "Ha ocurrido un error al crear la publicación",
      });
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
      <View
        style={{
          height: heightPercentageToDP(10),
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#03B97A",
          width: widthPercentageToDP(100),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: widthPercentageToDP(20),
            borderWidth: 1,
            borderColor: "#00734A",
            borderRadius: 20,
            backgroundColor: "#00734A",
            marginLeft: 5,
            justifyContent:"center"
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left-thin"
            color={"#fff"}
            size={60}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "800",
            marginLeft: 5,
          }}
        >
          Nueva Publicación
        </Text>
      </View>
      <View
        style={{ height: heightPercentageToDP(30), backgroundColor: "#fff", justifyContent:"center",alignItems:"center" }}
      >
        
           {imageSelected ? <Image
              source={{
                uri: imageSelected,
              }}
              style={{
                width: widthPercentageToDP(45),
                height: widthPercentageToDP(45),
              }}
            /> :
            <TouchableOpacity style={{
              width: widthPercentageToDP(50),
              height: widthPercentageToDP(50),
              justifyContent:"center",
              alignItems:"center"
            }} 
            onPress={()=>openMedia()}>
            <MaterialCommunityIcons
            name="plus-circle"
            color={"#171717"}
            size={80}
          />
            </TouchableOpacity> }
      </View>
      <View
        style={{
          alignItems: "center",
          height: heightPercentageToDP(60),
          backgroundColor: "#03B97A",
        }}
      >
        <View
          style={{
            height: heightPercentageToDP(20),
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>
            Descripción:
          </Text>
          <TextInput
            placeholderTextColor={"#fff"}
            style={{
              textAlignVertical: "top",
              height: heightPercentageToDP(15),
              width: widthPercentageToDP(90),
              borderColor: "#fff",
              paddingHorizontal: 5,
              borderWidth: 3,
              borderRadius: 0,
              fontSize: 15,
              marginTop: 5,
              padding: 5,
              color:"#fff",
              fontSize:20,
            }}
            returnKeyType="next"
            value={description.value}
            onChangeText={(text) => setDescription({ value: text, error: "" })}
            error={!!description.error}
            errorText={description.error}
            autoCapitalize="none"
            keyboardType="default"
            numberOfLines={2}
            multiline={true}
            
          />
        </View>

        <View
          style={{
            height: heightPercentageToDP(15),
            marginTop: heightPercentageToDP(3),
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>
            Etiquetas:
          </Text>
          <TextInput
            placeholderTextColor={"#ffffffaa"}
            style={{
              textAlignVertical: "top",
              height: heightPercentageToDP(10),
              width: widthPercentageToDP(90),
              borderColor: "#fff",
              paddingHorizontal: 5,
              borderWidth: 3,
              borderRadius: 0,
              fontSize: 15,
              marginTop: 5,
              padding: 5,
              color:"#fff",
              fontSize:20,
              
            }}
            placeholder="separar por una coma ','"
            returnKeyType="next"
            value={tags.value}
            onChangeText={(text) => setTags({ value: text, error: "" })}
            error={!!tags.error}
            errorText={tags.error}
            autoCapitalize="none"
            keyboardType="default"
            numberOfLines={2}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={{
            width: widthPercentageToDP(80),
            borderWidth: 1,
            borderColor: "#00734A",
            borderRadius: 20,
            paddingVertical: 10,
            backgroundColor: "#D2E4A2",
            marginTop: heightPercentageToDP(2),
          }}
          onPress={async()=>{
              await createNewPost()
          }}
        >
          <Text
            style={{
              color: "#171717",
              fontSize: 24,
              fontWeight: "800",
              marginLeft: 5,
              textAlign: "center",
            }}
          >
            Publicar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    width: widthPercentageToDP(90),
    height:heightPercentageToDP(20),
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
  input: {
    width: widthPercentageToDP(90),
    
    fontSize: 18,
    marginTop: 5,
    color:"#fff"
  },
  
});
export default NewDesignPost;

