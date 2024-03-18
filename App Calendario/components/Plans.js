import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { GetPlans } from "../api/getPlans";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function Plans() {
  const navigation = useNavigation();
  const [infoPlans, setInfoPlans] = useState();
  const getInfo = () => {
    const planes = GetPlans();
    setInfoPlans(planes);
  };
  useEffect(() => {
    getInfo();
  }, []);
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
    <View onLayout={onLayout}>
      <Text
        style={{
          fontSize: 29,
          marginLeft: 5,
          borderLeftWidth: 4,
          paddingLeft: 8,
          fontFamily: "Montserrat-Black",
        }}
      >
        Planes
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
            {infoPlans &&
              infoPlans?.map((item, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Plan", item);
                    }}
                    key={i + "infoPlans"}
                    style={{ width: 250, height: heightPercentageToDP("20%") }}
                  >
                    <Image
                      style={{
                        width: 250,
                        height: heightPercentageToDP("20%"),
                      }}
                      source={{ uri: item.imagen }}
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
                      {item.nombre}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Plans;
