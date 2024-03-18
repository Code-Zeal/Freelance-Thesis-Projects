import React, { useCallback, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const PlanDetail = ({ navigation, route }) => {
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
  const { nombre, alimentos, ingredientes } = route.params.extra;
  const { date } = route.params;

  //
  const horaActual = new Date();

  const horariosComidas = {
    Desayuno: { hora: 8, minutos: 0 },
    Almuerzo: { hora: 12, minutos: 0 },
    Merienda: { hora: 16, minutos: 0 },
    Cena: { hora: 20, minutos: 0 },
  };
  const horariosC = {
    Desayuno: "8:00AM",
    Almuerzo: "12:00PM",
    Merienda: "06:00PM",
    Cena: "08:00PM",
  };

  for (const comida in horariosComidas) {
    const horarioComida = horariosComidas[comida];
    const horaComida = new Date(
      horaActual.getFullYear(),
      horaActual.getMonth(),
      horaActual.getDate(),
      horarioComida.hora,
      horarioComida.minutos
    );

    if (horaActual < horaComida) {
      siguienteComida = comida;
      const tiempoDiferencia = Math.floor((horaComida - horaActual) / 1000); // Diferencia en segundos
      const horasRestantes = Math.floor(tiempoDiferencia / 3600);
      const minutosRestantes = Math.floor((tiempoDiferencia % 3600) / 60);
      tiempoRestante = { horas: horasRestantes, minutos: minutosRestantes };
      break;
    }
  }

  let texto = "";

  texto = "a las " + horariosC[nombre];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#bcb9ce" }}
      onLayout={onLayout}
    >
      <Text
        style={{
          fontFamily: "Montserrat-Black",
          fontSize: 22,
          fontWeight: "600",
          width: widthPercentageToDP("100%"),
          paddingLeft: 10,
          textAlign: "left",
          marginVertical: 10,
        }}
      >
        {nombre}:
      </Text>

      <View
        style={{
          width: widthPercentageToDP("100%"),
          paddingLeft: 10,

          marginBottom: 20,
        }}
      >
        {alimentos.map((alimento, i) => {
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
        {ingredientes.map((ingrediente, i) => {
          return (
            <View
              key={i + "ingrediente"}
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
      <View
        style={{
          width: widthPercentageToDP("80%"),
          height: widthPercentageToDP("80%"),
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            width: widthPercentageToDP("70%"),
            color: "#242422",
            marginTop: 20,
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Fecha de esta comida
        </Text>
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          color={"#242422"}
          size={60}
          style={{ marginTop: 10 }}
        />
        <Text
          style={{
            width: widthPercentageToDP("70%"),
            color: "#242422",
            marginTop: 10,
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {date + " " + texto}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PlanDetail;
