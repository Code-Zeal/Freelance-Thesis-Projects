import React, { useCallback, useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTips } from "../api/extraInfo";
const Tip = ({ navigation, route }) => {
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
  const { title, image, content } = route.params;

  return (
    <ScrollView
      style={{
        width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("100%"),
      }}
      onLayout={onLayout}
    >
      <Image
        style={{
          width: widthPercentageToDP("100%"),
          height: heightPercentageToDP("30%"),
        }}
        source={{ uri: image }}
      />
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 24,
          textAlign: "center",
          marginVertical: 10,
          width: widthPercentageToDP("100%"),
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat-Regular",
          fontSize: 20,
          textAlign: "left",
          marginVertical: 10,
          width: widthPercentageToDP("100%"),
          marginLeft: 5,
        }}
      >
        {content}
      </Text>
    </ScrollView>
  );
};

export default Tip;
