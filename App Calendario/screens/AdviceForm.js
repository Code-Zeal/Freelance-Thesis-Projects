import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import getFeeling from "../api/getFeeling";
import { guardarInformacion } from "../api/ASFeeling";
import { useNavigation } from "@react-navigation/native";
import {
  obtenerPesosOrdenados,
  verPreferencias,
} from "../api/ASUserPreferences";
import { createWaterNotification } from "../utils/createNotifications";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
const AdviceForm = () => {
  const navigation = useNavigation();
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleNotifications = async () => {
    createWaterNotification();
    showToast("Recordatorio activado!");
  };
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState([]);
  const [agua, setAgua] = useState("");
  const getData = async () => {
    const pesos = await obtenerPesosOrdenados();
    const fechasValores = Object.entries(pesos).map(([fecha, valor]) => [
      fecha,
      valor.valor,
    ]);
    fechasValores.sort((a, b) => a[0].localeCompare(b[0]));
    const arrayNum = fechasValores.map(([_, valor]) => valor);
    PesoActual = arrayNum[arrayNum.length - 1];
    const aguaAlDia = 35;
    setAgua((PesoActual * aguaAlDia) / 1000);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleStatusCheckbox = (value) => {
    if (selectedStatus.includes(value)) {
      setSelectedStatus(selectedStatus.filter((item) => item !== value));
    } else {
      setSelectedStatus([...selectedStatus, value]);
    }
  };

  const handleSymptomsCheckbox = (value) => {
    if (selectedSymptoms.includes(value)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== value));
    } else {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  const handleTrainingCheckbox = (value) => {
    if (selectedTraining.includes(value)) {
      setSelectedTraining(selectedTraining.filter((item) => item !== value));
    } else {
      setSelectedTraining([...selectedTraining, value]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const checkboxData = {
        selectedStatus,
        selectedSymptoms,
        selectedTraining,
      };
      if (
        selectedStatus.length === 0 &&
        selectedSymptoms.length === 0 &&
        selectedTraining.length === 0
      ) {
        showToast("Seleccionar al menos uno");
        return;
      }
      showToast("Guardado correctamente!");
      await guardarInformacion(checkboxData);

      await navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      await navigation.navigate("Home");
    } catch (error) {
      console.error("Error al guardar la información en AsyncStorage", error);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#756BB7" }}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Black",
            fontSize: 20,
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            color: "#fff",
          }}
        >
          ¿Cual es tu estado de ánimo?
        </Text>

        {getFeeling("status").map((stat, i) => {
          return (
            <BouncyCheckbox
              style={{ marginVertical: 4 }}
              key={i + "status_check"}
              size={35}
              fillColor="#FBC288"
              unfillColor="#FFFCFE"
              text={stat}
              textStyle={{ color: "#fff", marginLeft: -10, fontSize: 18 }}
              isChecked={selectedStatus.includes(stat)}
              onPress={() => handleStatusCheckbox(stat)}
            />
          );
        })}
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Montserrat-Black",
            fontSize: 20,
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            color: "#fff",
          }}
        >
          ¿Sientes alguno de estos síntomas?
        </Text>
        {getFeeling("symptoms").map((symptom, i) => {
          return (
            <BouncyCheckbox
              key={i + "symptoms_check"}
              style={{ marginVertical: 4 }}
              size={35}
              fillColor="#A9499B"
              unfillColor="#FEFEFD"
              text={symptom}
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ color: "#fff", marginLeft: -10, fontSize: 18 }}
              isChecked={selectedSymptoms.includes(symptom)}
              onPress={() => handleSymptomsCheckbox(symptom)}
            />
          );
        })}
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Montserrat-Black",
            fontSize: 20,
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            color: "#fff",
          }}
        >
          ¿Has realizado actividad física?
        </Text>
        {getFeeling("training").map((train, i) => {
          return (
            <BouncyCheckbox
              style={{ marginVertical: 4 }}
              key={i + "training_check"}
              size={35}
              fillColor="#15A052"
              unfillColor="#E7FEEC"
              text={train}
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ color: "#fff", marginLeft: -10, fontSize: 18 }}
              isChecked={selectedTraining.includes(train)}
              onPress={() => handleTrainingCheckbox(train)}
            />
          );
        })}
      </View>
      <View style={{ borderBottomWidth: 2, borderColor: "#fff" }}>
        <Text
          style={{
            fontFamily: "Montserrat-Black",
            fontSize: 14,
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            color: "#fff",
          }}
        >
          Recomendación toma {agua} L de 🥤agua al dia
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
            width: widthPercentageToDP("40%"),
            height: heightPercentageToDP("5%"),
            marginLeft: 10,
            marginRight: "auto",
            paddingHorizontal: 5,
            marginBottom: 20,
            marginTop: 5,
          }}
          onPress={handleNotifications}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Black",
              fontSize: 12,
              textAlign: "center",

              color: "#756BB7",
            }}
          >
            Activar recordatorio
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
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
          marginVertical: 20,
        }}
        onPress={handleSaveChanges}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Black",
            fontSize: 14,
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            color: "#756BB7",
          }}
        >
          Guardar cambios
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdviceForm;
