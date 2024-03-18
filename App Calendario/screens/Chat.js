import { useFonts } from "expo-font";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as SplashScreen from "expo-splash-screen";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español de moment
const Chat = () => {
  moment.locale("es");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const initialMessages = [
      {
        _id: 1,
        text: "¡Hola! ¿En qué puedo ayudarte?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      },
    ];

    setMessages(initialMessages);
  }, []);

  const handleSend = (newMessages) => {
    const userMessage = newMessages[0];
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Procesar la pregunta del usuario y generar una respuesta
    const response = generateResponse(userMessage.text);
    if (response) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);

        const botMessage = {
          _id: Math.round(Math.random() * 1000000),
          text: response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Bot",
          },
        };
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, [botMessage])
        );
      }, 1500);
    }
  };

  const generateResponse = (question) => {
    // Aquí puedes implementar la lógica para generar la respuesta según la pregunta
    switch (question) {
      case "¿Qué es la anorexia nerviosa?":
        return "La anorexia nerviosa es un trastorno alimenticio caracterizado por una preocupación obsesiva por perder peso y mantenerse extremadamente delgado/a. Si te identificas con estos síntomas o crees que podrías estar experimentando un trastorno alimenticio, es importante que busques ayuda profesional. Te recomiendo que consultes a un médico o a un especialista en salud mental para obtener un diagnóstico adecuado y un plan de tratamiento.";
      case "¿Cuáles son los signos y síntomas de la bulimia?":
        return "Algunos signos y síntomas de la bulimia incluyen episodios recurrentes de comer grandes cantidades de comida seguidos de comportamientos compensatorios, como provocarse el vómito o hacer ejercicio excesivo. Si te sientes identificado/a con estos síntomas, te insto a que busques ayuda profesional. Un médico o un especialista en trastornos alimenticios puede evaluar tu situación y proporcionarte el apoyo y tratamiento adecuados.";
      case "¿Qué es la ortorexia?":
        return "La ortorexia es un trastorno alimenticio caracterizado por una obsesión excesiva por comer alimentos considerados 'puros' y 'limpios'. Si sospechas que puedes estar experimentando síntomas de ortorexia, es importante que consultes a un profesional de la salud. Un médico, un nutricionista o un terapeuta especializado en trastornos alimenticios pueden brindarte el apoyo y la orientación necesarios.";
      case "¿Cuál es el papel de la terapia en el tratamiento de los trastornos alimenticios?":
        return "La terapia desempeña un papel fundamental en el tratamiento de los trastornos alimenticios. Sin embargo, cada persona es única y requiere un enfoque individualizado. Si crees que podrías beneficiarte de la terapia para abordar tus problemas con la alimentación, te recomiendo que busques un terapeuta especializado en trastornos alimenticios. No te autodiagnostiques ni intentes tratar el trastorno por ti mismo/a.";
      case "¿Cuáles son los riesgos para la salud asociados con los trastornos alimenticios?":
        return "Los trastornos alimenticios pueden tener graves consecuencias para la salud. Es importante no subestimar los riesgos y buscar ayuda profesional. Si te preocupa tu salud y crees que podrías estar experimentando un trastorno alimenticio, te insto a que consultes a un médico o a un especialista en trastornos alimenticios. Ellos podrán evaluar tu situación y brindarte el tratamiento y el apoyo adecuados.";
      default:
        return "Lo siento, no puedo responder a esa pregunta en este momento.";
    }
  };

  const handleOptionSelected = (option) => {
    const message = {
      _id: Math.round(Math.random() * 1000000),
      text: option,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    handleSend([message]);
  };

  const renderInputToolbar = () => {
    return (
      <View style={{ display: "none" }} /> // Espacio mínimo para ocupar
    );
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
  return (
    <View
      style={{ flex: 1, height: heightPercentageToDP("100%") }}
      onLayout={onLayout}
    >
      <View style={{ height: heightPercentageToDP("60%") }}>
        <GiftedChat
          isTyping={typing}
          messages={messages}
          onSend={handleSend}
          user={{
            _id: 1,
          }}
          renderInputToolbar={renderInputToolbar}
        />
      </View>
      <ScrollView
        style={{
          height: heightPercentageToDP("40%"),
          width: widthPercentageToDP("100%"),
          borderColor: "#000",
          borderWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => handleOptionSelected("¿Qué es la anorexia nerviosa?")}
          style={{
            borderWidth: 2,
            borderColor: "#000",
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
            marginVertical: 5,
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
            ¿Qué es la anorexia nerviosa?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleOptionSelected(
              "¿Cuáles son los signos y síntomas de la bulimia?"
            )
          }
          style={{
            borderWidth: 2,
            borderColor: "#000",
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
            marginVertical: 5,
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
            ¿Cuáles son los signos y síntomas de la bulimia?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionSelected("¿Qué es la ortorexia?")}
          style={{
            borderWidth: 2,
            borderColor: "#000",
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
            marginVertical: 5,
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
            ¿Qué es la ortorexia?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleOptionSelected(
              "¿Cuál es el papel de la terapia en el tratamiento de los trastornos alimenticios?"
            )
          }
          style={{
            borderWidth: 2,
            borderColor: "#000",
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
            marginVertical: 5,
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
            ¿Cuál es el papel de la terapia en el tratamiento de los trastornos
            alimenticios?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleOptionSelected(
              "¿Cuáles son los riesgos para la salud asociados con los trastornos alimenticios?"
            )
          }
          style={{
            backgroundColor: "#756BB7",
            borderWidth: 2,
            borderColor: "#000",
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
            marginVertical: 5,
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
            ¿Cuáles son los riesgos para la salud asociados con los trastornos
            alimenticios?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Chat;
