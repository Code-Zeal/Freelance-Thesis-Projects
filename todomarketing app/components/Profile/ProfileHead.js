import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ProfileStats from "./ProfileStats.js";
import AddProfileImage from "./AddProfileImage.js";
import AddCoverImage from "./AddCoverImage.js";
import Feather from "@expo/vector-icons/Feather";

function ProfileHead({
  backgroundImage,
  profileImage,
  userInfo,
  entrepreneurship,
  updateUserData, 
  setSelectGallery
}) {
  const [nameEdit, setNameEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setNameEdit(false);
      setCategoryEdit(false);
      setDescriptionEdit(false);
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>

      <Image
        source={
          backgroundImage
          ? {
            uri: `{backend-url}${backgroundImage}`,
          }
          : require("../../assets/default2.png")
        }
        style={styles.imageRectangle}
        />
          <TouchableOpacity onPress={()=>setSelectGallery({status:true,value:"profile"})} style={styles.profileContainer}>
      <Image
        source={
          profileImage
          ? {
            uri: `{backend-url}${profileImage}`,
          }
          : require("../../assets/default.png")
        }
        style={styles.imageCircle}
        />
        </TouchableOpacity>

      {nameEdit === false ? (
        <View
          style={{
            marginRight: "auto",
            left: 120,
            top: 25,
            position: "absolute",
            width: widthPercentageToDP(58),
            height: heightPercentageToDP(15),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "left",
              fontWeight: "700",
              
            }}
          >
            {userInfo?.name?.length > 0 ? userInfo?.name : "Sin nombre"}
          </Text>
          <TouchableOpacity
            onPress={() => setNameEdit(true)}
            style={{ marginLeft: 8 }}
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : nameEdit === "loading" ? (
        <View
          style={{
            marginRight: "auto",
            left: 120,
            top: 25,
            position: "absolute",
            width: widthPercentageToDP(58),
            height: heightPercentageToDP(15),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Cargando...
          </Text>
        </View>
      ) : (
        <View
          style={{
            marginRight: "auto",
            left: 120,
            top: 60,
            position: "absolute",
            width: widthPercentageToDP(60),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              width: widthPercentageToDP(45),
              borderColor: "#000",
              borderWidth: 3,
              borderRadius: 20,
              padding: 10,
              fontSize: 18,
              marginTop: 5,
            }}
            value={nameEdit}
            onChangeText={(text) => setNameEdit(text)}
            placeholder="Nombre"
          />
          <TouchableOpacity
            onPress={async () => {
              setNameEdit("loading");
              await updateUserData("name", nameEdit);
            }}
            style={{ marginLeft: 8 }}
          >
            <Feather name="check-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setNameEdit(false)}
            style={{ marginLeft: 8 }}
          >
            <Feather name="x-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {userInfo?.typeAccount === "entrepreneur" && categoryEdit === false ? (
        <View
          style={{
            marginRight: "auto",
            left: 110,
            top: 120,
            position: "absolute",
            width: widthPercentageToDP(42),
            height: heightPercentageToDP(10),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {userInfo?.category?.length > 0
              ? userInfo?.category
              : "Sin categoría"}
          </Text>
          <TouchableOpacity
            onPress={() => setCategoryEdit(true)}
            style={{ marginLeft: 8 }}
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : userInfo?.typeAccount === "entrepreneur" && categoryEdit === "loading" ? (
        <View
          style={{
            marginRight: "auto",
            left: 140,
            top: 132,
            position: "absolute",
            width: widthPercentageToDP(42),
            height: heightPercentageToDP(10),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
            }}
          >
            Cargando...
          </Text>
        </View>
      ) : userInfo?.typeAccount === "entrepreneur" && (
        <View
          style={{
            marginRight: "auto",
            left: 140,
            top: 132,
            position: "absolute",
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(8),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TextInput
            style={{
              width: widthPercentageToDP(35),
              borderColor: "#000",
              borderWidth: 3,
              borderRadius: 20,
              padding: 10,
              fontSize: 18,
              marginTop: 5,
            }}
            value={categoryEdit}
            onChangeText={(text) => setCategoryEdit(text)}
            placeholder="Categoría"
          />
          <TouchableOpacity
            onPress={async () => {
              setCategoryEdit("loading");
              await updateUserData("category", categoryEdit);
            }}
            style={{ marginLeft: 8 }}
          >
            <Feather name="check-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCategoryEdit(false)}
            style={{ marginLeft: 8 }}
          >
            <Feather name="x-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {userInfo?.typeAccount === "entrepreneur" && descriptionEdit === false ? (
        <View
          style={{
            marginRight: "auto",
            marginLeft: widthPercentageToDP(5),
            marginVertical: 5,
            width: widthPercentageToDP(95),
            height: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {userInfo?.description?.length > 0
              ? userInfo?.description
              : "Sin descripción"}
          </Text>
          <TouchableOpacity
            onPress={() => setDescriptionEdit(true)}
            style={{ marginLeft: 8 }}
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : userInfo?.typeAccount === "entrepreneur" && descriptionEdit === "loading" ? (
        <View
          style={{
            marginRight: "auto",
            marginLeft: widthPercentageToDP(5),
            marginVertical: 5,
            width: widthPercentageToDP(95),
            height: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Cargando...
          </Text>
        </View>
      ) : userInfo?.typeAccount === "entrepreneur" && (
        <View
          style={{
            marginRight: "auto",
            marginLeft: widthPercentageToDP(5),
            width: widthPercentageToDP(95),
            height: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TextInput
            style={{
              width: widthPercentageToDP(60),
              borderColor: "#000",
              borderWidth: 3,
              borderRadius: 20,
              padding: 10,
              fontSize: 18,
              marginTop: 5,
            }}
            value={descriptionEdit}
            onChangeText={(text) => setDescriptionEdit(text)}
            placeholder="Descripción"
          />
          <TouchableOpacity
            onPress={async () => {
              setDescriptionEdit("loading");
              await updateUserData("description", descriptionEdit);
            }}
            style={{ marginLeft: 8 }}
          >
            <Feather name="check-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDescriptionEdit(false)}
            style={{ marginLeft: 8 }}
          >
            <Feather name="x-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      <AddCoverImage onPress={()=>setSelectGallery({status:true,value:"cover"})} />
      <ProfileStats
        followers={userInfo?.followers}
        following={userInfo?.following}
        posts={entrepreneurship ? entrepreneurship[0]?.posts?.length : 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D2E4A2",
  },
  imageRectangle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor:"white",
    borderWidth: 1,
    borderColor: "#000",
  },
  profileContainer: {
    backgroundColor:"gray",
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "absolute",
    top: 70,
    left: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#000",
  },
  imageCircle: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
});

export default ProfileHead;
