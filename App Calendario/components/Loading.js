import React, { useCallback } from "react";
import { Image, Text, View } from "react-native";
import { verPreferencias } from "../api/ASUserPreferences";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
function Loading({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        let infos = await verPreferencias();
        if (infos === null || !infos.Objetivo) {
          return navigation.navigate("Edad");
        } else {
          return navigation.navigate("Home");
        }
      }

      fetchData();
    }, [])
  );
  return (
    <View
      style={{
        width: widthPercentageToDP("100%"),
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../assets/splash.png")}
        width={1024}
        height={1024}
        style={{
          width: widthPercentageToDP("80%"),
          height: widthPercentageToDP("80%"),
        }}
      />

      <Text
        style={{
          width: "full",
          fontSize: 42,
          color: "#000",
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Cargando...
      </Text>
    </View>
  );
}

export default Loading;
