import React, { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function NoNextFood() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      onLayout={onLayout}
      style={{
        width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("45%"),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#756BB7",
          width: 300,
          height: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#cecae4",
            width: 280,
            height: 280,
            borderRadius: 280,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              width: widthPercentageToDP("70%"),
              color: "#000",
              marginTop: 20,
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Montserrat-Bold",
            }}
          >
            Calendario vacío!
          </Text>
          <MaterialCommunityIcons
            name="calendar-blank"
            color={"#000"}
            size={60}
            style={{ marginTop: 10 }}
          />
          <Text
            style={{
              width: widthPercentageToDP("70%"),
              color: "#000",
              marginTop: 10,
              fontSize: 20,
              fontFamily: "Montserrat-Bold",
              textAlign: "center",
            }}
          >
            Explora y añade planes para completar tus metas
          </Text>
        </View>
      </View>
    </View>
  );
}

export default NoNextFood;
