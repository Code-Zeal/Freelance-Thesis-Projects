import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function NextFood({ comprobarPlan }) {
  const [plan, setPlan] = useState({});
  const horaActual = new Date();

  // Definir los horarios de las comidas
  const horariosComidas = {
    Desayuno: { hora: 8, minutos: 0 },
    Almuerzo: { hora: 12, minutos: 0 },
    Merienda: { hora: 16, minutos: 0 },
    Cena: { hora: 20, minutos: 0 },
  };

  // Encontrar la siguiente comida
  let siguienteComida = null;
  let tiempoRestante = null;

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
      siguienteComida = `: ${comida}`;
      const tiempoDiferencia = Math.floor((horaComida - horaActual) / 1000); // Diferencia en segundos
      const horasRestantes = Math.floor(tiempoDiferencia / 3600);
      const minutosRestantes = Math.floor((tiempoDiferencia % 3600) / 60);
      tiempoRestante = { horas: horasRestantes, minutos: minutosRestantes };
      break;
    }
  }

  let texto = "";
  if (siguienteComida) {
    texto = "En ";
    if (tiempoRestante.horas > 0) {
      texto += tiempoRestante.horas + " hora";
      if (tiempoRestante.horas > 1) {
        texto += "s";
      }
      texto += " y ";
    }
    texto += tiempoRestante.minutos + " minutos";
  } else {
    texto = "Mañana a las 8:00am";
  }
  useEffect(() => {
    const check = async () => {
      const plan = await comprobarPlan();
      setPlan(plan);
    };
    check();
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
    <View
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
              fontFamily: "Montserrat-Bold",
              textAlign: "center",
            }}
          >
            Próxima comida{siguienteComida}
          </Text>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
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
            {texto}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default NextFood;
