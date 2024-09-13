import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from '@expo/vector-icons/FontAwesome';


function SelectGallery({ state, setState }) {
  const selectOption = (option) => setState({...state,status:option?.status,data:{[option.key]:state.value}});
  if (state?.status === true) {
    return (
        <View
          style={{
            position: "absolute",
            bottom: 35,
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            zIndex: 99999999999,
            backgroundColor: "#03B97A",
            height: heightPercentageToDP(25),
            width: widthPercentageToDP(100),
            padding: 5,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,

            elevation: 21,
          }}
        >
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 135,
                right:15
              }}
              onPress={() => selectOption({status:false,data:{}})}
            >
              <FontAwesome name="close" size={20} color="white" />
            </TouchableOpacity>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 20,
              marginTop: 5,
              marginBottom: 10,
              color: "#fff",
            }}
          >
            Selecciona una opción
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#00925F",
                borderRadius: 20,
                padding: 3,
                backgroundColor: "#00734A",
              }}
              onPress={() => selectOption({status:false,key:"app"})}
            >
              <Entypo
                name="folder-images"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                size={30}
                color="white"
              />
              <Text
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: 14,
                  marginVertical: 5,
                  color: "#fff",
                  width: widthPercentageToDP(30),
                  textAlign: "center",
                }}
              >
                Galería de la aplicación
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#00925F",
                borderRadius: 20,
                padding: 3,
                backgroundColor: "#00734A",
              }}
              onPress={() => selectOption({status:false,key:"mobile"})}
            >
              <Entypo
                name="folder-images"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                size={30}
                color="white"
              />
              <Text
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: 14,
                  marginVertical: 5,
                  color: "#fff",
                  width: widthPercentageToDP(30),
                  textAlign: "center",
                }}
              >
                Galería del celular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#00925F",
                borderRadius: 20,
                padding: 3,
                backgroundColor: "#00734A",
              }}
              onPress={() => {
                selectOption({status:false,key:"camera"})
               }}
            >
              <Entypo
                name="camera"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                size={38}
                color="white"
              />
              <Text
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: 14,
                  marginVertical: 5,
                  color: "#fff",
                  width: widthPercentageToDP(30),
                  textAlign: "center",
                }}
              >
                Cámara
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

export default SelectGallery;
