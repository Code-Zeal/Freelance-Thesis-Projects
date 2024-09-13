import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Video, ResizeMode } from "expo-av";
import { CreatePostApi } from "../api/post";
import Toast from "react-native-toast-message";
function NewPost({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState({
    value: "",
    error: "",
  });
  const [tags, setTags] = useState({ value: "", error: "" });
  const video = useRef(null);

  const createNewPost = async () => {
    try {
      setLoading(true);
      const title = "test";
      const media = route?.params?.image?.uri.includes("mp4")
        ? "video"
        : "imagen";
      const url = route?.params?.image?.uri;
      const entrepreneurshipId = route?.params?.entrepreneurship?.id;
      if (media && url && description.value) {
        const { status, data, error } = await CreatePostApi(
          title,
          description.value,
          media,
          url,
          entrepreneurshipId
        );
        if (status === 200) {
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "",
            text2: "Publicación creada correctamente",
          });
          navigation.navigate("Perfil", { none: true });
        } else {
          throw new Error(error);
        }
      } else {
        setLoading(false);
        throw new Error("Se requiere descripción");
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "",
        text2: error?.toString()
          ? error.toString()
          : "Ha ocurrido un error al crear la publicación",
      });
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
          onPress={() => navigation.navigate("Perfil", { none: true })}
          style={{
            width: widthPercentageToDP(20),
            borderWidth: 1,
            borderColor: "#00734A",
            borderRadius: 20,
            padding: 2,
            backgroundColor: "#00734A",
            marginLeft: 5,
            justifyContent: "center",
            alignItems: "center",
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
        style={{
          height: heightPercentageToDP(30),
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {route?.params?.image?.uri.includes("mp4") ? (
          <Video
            ref={video}
            style={{
              width: widthPercentageToDP(45),
              height: widthPercentageToDP(45),
            }}
            source={{
              uri: route?.params?.image?.uri,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        ) : (
          <Image
            source={{
              uri: route?.params?.image?.uri,
            }}
            style={{
              width: widthPercentageToDP(45),
              height: widthPercentageToDP(45),
            }}
          />
        )}
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
              color: "#fff",
              fontSize: 20,
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
            placeholderTextColor={"#fff"}
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
              color: "#fff",
              fontSize: 20,
            }}
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
        {loading ? (
          <TouchableOpacity
            disabled={true}
            style={{
              width: widthPercentageToDP(80),
              borderWidth: 1,
              borderColor: "#00734A",
              borderRadius: 20,
              paddingVertical: 10,
              backgroundColor: "#557231",
              marginTop: heightPercentageToDP(2),
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
              Publicando...
            </Text>
          </TouchableOpacity>
        ) : (
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
            onPress={async () => {
              await createNewPost();
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
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(20),
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  input: {
    width: widthPercentageToDP(90),

    fontSize: 18,
    marginTop: 5,
    color: "#fff",
  },
});
export default NewPost;
