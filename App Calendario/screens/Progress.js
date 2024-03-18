import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  actualizarPeso,
  obtenerPesosOrdenados,
  verPreferencias,
} from "../api/ASUserPreferences";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
function Progress() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoPeso, setNuevoPeso] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (text) => {
    setNuevoPeso(text);
  };
  const navigation = useNavigation();
  const handleButtonPress = async () => {
    if (nuevoPeso) {
      await actualizarPeso(nuevoPeso);
      await navigation.reset({
        index: 0,
        routes: [{ name: "Progreso" }],
      });
      handleCloseModal();
    }
  };
  const [dataChart, setDataChart] = useState([0]);
  const [pesoActual, setPesoActual] = useState("");
  const getData = async () => {
    const pesos = await obtenerPesosOrdenados();
    const { Estatura } = await verPreferencias();
    const EstaturaMt = Estatura / 100;
    const fechasValores = Object.entries(pesos).map(([fecha, valor]) => [
      fecha,
      valor.valor,
    ]);
    fechasValores.sort((a, b) => a[0].localeCompare(b[0]));

    // Crear el array de números en orden de fecha
    const arrayNumeros = fechasValores.map(([_, valor]) => parseFloat(valor.replace(',', '.')));
    setPesoActual(arrayNumeros[arrayNumeros.length - 1]);
    const ArrayIMC = arrayNumeros.map((num) => num / (EstaturaMt * EstaturaMt));

    setDataChart(ArrayIMC);
  };
  useEffect(() => {
    getData();
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
    <ScrollView style={{ flex: 1 }} onLayout={onLayout}>
      <Text
        style={{
          fontFamily: "Montserrat-Black",
          fontSize: 20,
          textAlign: "center",
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        Gráfica de tu progreso (IMC)
      </Text>
      <LineChart
        data={{
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          datasets: [
            {
              data: dataChart,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#756BB7",
          backgroundGradientFrom: "#6154b5",
          backgroundGradientTo: "#756BB7",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 20,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Tu peso actual es de{" "}
        <Text style={{ fontFamily: "Montserrat-Black" }}> {pesoActual} kg</Text>
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleOpenModal}
          style={{
            backgroundColor: "#756BB7",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
            width: widthPercentageToDP("80%"),
            height: heightPercentageToDP("8%"),
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Bold",
              fontSize: 18,
              textAlign: "center",
              marginVertical: 5,
              marginLeft: 5,
              color: "#fff",
            }}
          >
            Actualizar mi peso actual
          </Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¿Cual es tu nuevo peso?</Text>

            <TextInput
              placeholder="Ingresa tu peso (kg) Ej: 80,8"
              placeholderTextColor={"#ffffffaa"}
              keyboardType="numeric"
              style={styles.input}
              value={nuevoPeso}
              onChangeText={(text) => {
                  handleInputChange(text);
              }}
            />

            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 18,
          textAlign: "left",
          marginVertical: 5,
          marginLeft: 5,
        }}
      >
        Bajo peso: IMC por debajo de 18.5
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 18,
          textAlign: "left",
          marginVertical: 5,
          marginLeft: 5,
        }}
      >
        Peso saludable: IMC entre 18.5 y 24.9
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 18,
          textAlign: "left",
          marginVertical: 5,
          marginLeft: 5,
        }}
      >
        Sobrepeso: IMC entre 25 y 29.9
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 18,
          textAlign: "left",
          marginVertical: 5,
          marginLeft: 5,
        }}
      >
        Obesidad: IMC de 30 o superior
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat-Regular",
          fontSize: 15,
          textAlign: "left",
          marginLeft: 5,
          marginVertical: 10,
        }}
      >
        ⚠️Es importante tener en cuenta que el{" "}
        <Text style={{ fontFamily: "Montserrat-Bold" }}>IMC</Text> es una medida
        aproximada y no tiene en cuenta otros factores importantes, como la
        composición corporal y la distribución de grasa. Además, el{" "}
        <Text style={{ fontFamily: "Montserrat-Bold" }}>IMC</Text> puede no ser
        aplicable a ciertos grupos de personas, como los atletas con mucha masa
        muscular.{" "}
        <Text style={{ fontFamily: "Montserrat-Bold" }}>
          Siempre es recomendable consultar a un profesional de la salud para
          obtener una evaluación más completa de la salud y el peso.⚠️
        </Text>
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#756BB7",
    padding: 20,
  },
  modalText: {
    width: widthPercentageToDP("100%"),

    fontSize: 26,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat-Black",
  },
  input: {
    width: widthPercentageToDP("90%"),
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    marginVertical: 20,
    paddingLeft: 5,
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
  },

  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP("80%"),
    height: heightPercentageToDP("8%"),
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
  },
  buttonText: {
    color: "#756BB7",
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
  },
});
export default Progress;
