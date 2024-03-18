import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { obtenerConsejos } from "../api/ASFeeling";

function Advices() {
  const [dataAdvices, setDataAdvices] = useState([]);
  const getDataAdv = async () => {
    const dataA = await obtenerConsejos();
    setDataAdvices(dataA);
  };
  useEffect(() => {
    getDataAdv();
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
        Consejos para ti
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AdviceForm");
              }}
              style={{
                width: 160,
                height: heightPercentageToDP("20%"),
                backgroundColor: "#756BB7",
                borderWidth: 1,
                borderColor: "#000",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 160,
                  height: heightPercentageToDP("10%"),
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textShadowColor: "rgba(0, 0, 0, 0.90)",
                    textShadowOffset: { width: -3, height: 3 },
                    textShadowRadius: 20,
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    width: 160,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  ¿Como te sientes?
                </Text>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 5,
                  }}
                  source={require("../assets/status/add.png")}
                  width={256}
                  height={256}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: 160,
                  height: heightPercentageToDP("9%"),
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/status/happy.png")}
                  width={256}
                  height={256}
                />
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/status/serious.png")}
                  width={256}
                  height={256}
                />
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/status/sad.png")}
                  width={256}
                  height={256}
                />
              </View>
            </TouchableOpacity>
            {dataAdvices?.map((item, i) => (
              <View
                key={i + "dataAdvices"}
                style={{
                  width: 200,
                  height: heightPercentageToDP("20%"),
                  backgroundColor: "#000000dd",
                }}
              >
                <Image
                  style={{
                    width: 200,
                    height: heightPercentageToDP("20%"),
                    opacity: 0.6,
                    borderWidth: 1,
                    borderColor: "#000",
                  }}
                  source={{ uri: item.imagen }}
                />
                <Text
                  style={{
                    position: "absolute",
                    color: "#fff",
                    textShadowColor: "rgba(0, 0, 0, 1)",
                    textShadowOffset: { width: -4, height: 4 },
                    textShadowRadius: 20,
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    width: 200,
                    margin: 5,
                  }}
                >
                  {item.consejo}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Advices;
