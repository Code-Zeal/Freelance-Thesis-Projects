import React, { useCallback, useEffect } from "react";
import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { setCurrentPlan } from "../api/ASUserPreferences";
import { Calendar, getCalendar } from "../api/ASCalendar";
import {
  createNotification,
  checkScheduledNotifications,
  createNotificationsFromObject,
} from "../utils/createNotifications.js";
const Plan = ({ navigation, route }) => {
  const handleSetPlan = async (name) => {
    await setCurrentPlan(name);
    await Calendar();
    const notificationsData = await getCalendar();
    createNotificationsFromObject(notificationsData);

    await navigation.reset({
      index: 0,
      routes: [{ name: "Calendario" }],
    });
    await navigation.reset({
      index: 1,
      routes: [{ name: "Home" }],
    });
    navigation.navigate("Calendario");
  };
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
  const { imagen, nombre, objetivo, ingredientesSemanales, comidas } =
    route.params;
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  return (
    <ScrollView style={{ flex: 1 }} onLayout={onLayout}>
      <Image
        style={{ width: widthPercentageToDP("100%"), height: 400 }}
        source={{ uri: imagen }}
      />
      <Text
        style={{
          fontFamily: "Montserrat-Black",
          fontSize: 22,
          fontWeight: "600",
          width: widthPercentageToDP("100%"),
          paddingLeft: 10,
          textAlign: "left",
        }}
      >
        {nombre}
      </Text>
      <Text
        style={{
          marginTop: 10,
          fontSize: 18,
          width: widthPercentageToDP("100%"),
          paddingLeft: 10,
          textAlign: "left",
          fontFamily: "Montserrat-Medium",
        }}
      >
        🍏Este plan tiene el objetivo de {objetivo}
      </Text>
      <Text
        style={{
          marginVertical: 10,
          fontSize: 20,
          width: widthPercentageToDP("100%"),
          paddingLeft: 10,
          textAlign: "left",
          fontFamily: "Montserrat-Bold",
        }}
      >
        Ingredientes semanales:
      </Text>
      {ingredientesSemanales.map((ingrediente, i) => {
        return (
          <View
            style={{ width: widthPercentageToDP("100%"), paddingLeft: 10 }}
            key={i + "ingredientesSemanales"}
          >
            <Text
              style={{
                marginVertical: 3,
                fontSize: 16,
                width: widthPercentageToDP("100%"),
                paddingLeft: 10,
                textAlign: "left",
                fontFamily: "Montserrat-Medium",
              }}
            >
              -{ingrediente}
            </Text>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          handleSetPlan(nombre);
        }}
        style={{
          backgroundColor: "#756BB7",
          width: widthPercentageToDP("60%"),
          height: heightPercentageToDP("8%"),
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            fontFamily: "Montserrat-Medium",
          }}
        >
          Elegir como mi plan
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          marginVertical: 10,
          fontSize: 20,
          width: widthPercentageToDP("100%"),
          paddingLeft: 10,
          textAlign: "left",
          fontFamily: "Montserrat-Black",
        }}
      >
        Planificación:
      </Text>
      {days.map((day, i) => {
        return (
          <View
            key={i + "days"}
            style={{
              width: widthPercentageToDP("100%"),
              paddingLeft: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                marginTop: 5,
                marginBottom: 15,
                fontSize: 20,
                width: widthPercentageToDP("100%"),
                paddingLeft: 10,
                textAlign: "left",
                fontFamily: "Montserrat-Bold",
              }}
            >
              📅 {day}:
            </Text>
            {comidas.map((comida, i) => {
              return (
                <View
                  key={i + "comidas"}
                  style={{
                    width: widthPercentageToDP("100%"),
                    paddingLeft: 10,

                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                      fontSize: 18,
                      width: widthPercentageToDP("100%"),
                      paddingLeft: 10,
                      textAlign: "left",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    ⌚ {comida.nombre}:
                  </Text>

                  {comida.alimentos.map((alimento, i) => {
                    return (
                      <View
                        key={i + "alimentos"}
                        style={{
                          width: widthPercentageToDP("100%"),
                          paddingLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            marginVertical: 2,
                            fontSize: 16,
                            width: widthPercentageToDP("100%"),
                            paddingLeft: 10,
                            textAlign: "left",
                            fontFamily: "Montserrat-Medium",
                          }}
                        >
                          📌{alimento}
                        </Text>
                      </View>
                    );
                  })}
                  <Text
                    style={{
                      marginVertical: 10,

                      fontSize: 18,
                      width: widthPercentageToDP("100%"),
                      paddingLeft: 10,
                      textAlign: "left",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    🛒Ingredientes:
                  </Text>
                  {comida.ingredientes.map((ingrediente, i) => {
                    return (
                      <View
                        key={i + "ingredientes"}
                        style={{
                          width: widthPercentageToDP("100%"),
                          paddingLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            marginVertical: 2,
                            fontSize: 16,
                            width: widthPercentageToDP("100%"),
                            paddingLeft: 10,
                            textAlign: "left",
                            fontFamily: "Montserrat-Medium",
                          }}
                        >
                          💠{ingrediente}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          handleSetPlan(nombre);
        }}
        style={{
          backgroundColor: "#756BB7",
          width: widthPercentageToDP("60%"),
          height: heightPercentageToDP("8%"),
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            fontFamily: "Montserrat-Medium",
          }}
        >
          Elegir como mi plan
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Plan;
