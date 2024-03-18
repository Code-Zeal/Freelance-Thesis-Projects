import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { getTips } from "../api/extraInfo";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

function Tips() {
  const [dataTips, setDataTips] = useState([]);
  useEffect(() => {
    setDataTips(getTips());
  }, []);
  const navigation = useNavigation();
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
    <View style={{ marginVertical: 20 }} onLayout={onLayout}>
      <Text
        style={{
          fontSize: 29,
          marginLeft: 5,
          fontFamily: "Montserrat-Black",
          borderLeftWidth: 4,
          paddingLeft: 8,
        }}
      >
        Tips
      </Text>
      <View
        style={{
          height: heightPercentageToDP("20%"),
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <ScrollView
          style={{
            marginLeft: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {dataTips.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Tip", item);
                }}
                key={i + "dataTips"}
                style={{ width: 250, height: heightPercentageToDP("20%") }}
              >
                <Image
                  style={{
                    width: 250,
                    height: heightPercentageToDP("20%"),
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    position: "absolute",
                    bottom: 5,
                    color: "#fff",
                    textShadowColor: "rgba(0, 0, 0, 0.90)",
                    textShadowOffset: { width: -3, height: 3 },
                    textShadowRadius: 20,
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    width: 250,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Tips;
