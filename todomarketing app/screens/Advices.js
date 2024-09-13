import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Welcome from "../components/Chat/Welcome/Welcome";
import IntroductionClient from "../components/Chat/Welcome/IntroductionClient";
import IntroductionEntrepreneurship from "../components/Chat/Welcome/IntroductionEntrepreneurship";
import IntroductionFInal from "../components/Chat/Welcome/IntroductionFInal";
import storage from "../storage/user";
import { Home } from "../components/Chat/Home/Home";
import { updateUserInfo } from "../api/user";

export default function Advices({ route }) {
  const [screen, setScreen] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  storage
    .load({
      key: "user",
      autoSync: true,
      syncInBackground: true,
    })
    .then((ret) => {
      setUserData(ret);
    })
    .catch((err) => {
      console.warn(err.message);
      switch (err.name) {
        case "NotFoundError":
          break;
      }
    });
  const updateInfo =async ()=>{
   const {status,data,error} = await updateUserInfo(userData.id,"tutorialChat",true)
    if(status !== 200){
      return
    } else {
      return
  }}
  useEffect(() => {
    if (userData) {
      
      if (userData?.typeAccount === "entrepreneur") {
        if(userData?.tutorialChat === false){
          setScreen(2);
        }else{
          setScreen(6);
        }
      } else if(userData?.typeAccount === "client") {
        if(userData?.tutorialChat === false){
          setScreen(1);
        }else{
          setScreen(6);
        }
      }
    }
  }, [userData]);
  const FAQEntrepreneur = [
    {
      text: "¿Cómo mejorar mi emprendimiento?",
      send: "¿Me puedes decir cómo mejorar mi emprendimiento?",
      image: require("../assets/chat/FQ1.jpeg"),
    },
    {
      text: "Los mejores tips para emprendedores",
      send: "¿Me puedes dar los mejores tips para emprendedores?",
      image: require("../assets/chat/FQ2.jpeg"),
    },
    {
      text: "¿Mejores servicios para mis clientes?",
      send: "¿Me puedes decir cuales son los mejores servicios para mis clientes?",
      image: require("../assets/chat/FQ3.jpeg"),
    },
    {
      text: "¿Cómo mejorar mis ingresos?",
      send: "¿Me puedes aconsejar como puedo mejorar los ingresos de mi emprendimiento?",
      image: require("../assets/chat/FQ4.jpeg"),
    },
    {
      text: "Las mejores ideas para mi emprendimiento",
      send: "¿Puedes darme las mejores ideas para mi emprendimiento?",
      image: require("../assets/chat/FQ5.jpeg"),
    },
    {
      text: "Frases motivacionales para emprendedores",
      send: "¿Puedes darme frases motivacionales para emprendedores?",
      image: require("../assets/chat/FQ6.jpeg"),
    },
  ];

  const FAQClient = [
    {
      text: "¿Cómo empezar mi emprendimiento?",
      send: "¿Me puedes decir cómo empezar mi emprendimiento?",
      image: require("../assets/chat/FQ7.png"),
    },
    {
      text: "Los mejores tips para emprendedores principiantes",
      send: "¿Me puedes dar los mejores tips para emprendedores principiantes?",
      image: require("../assets/chat/FQ8.png"),
    },
    {
      text: "¿Cómo ofrecer buenos servicios a mis futuros clientes?",
      send: "¿Me puedes decir cuáles son los mejores servicios que podría ofrecer a mis futuros clientes?",
      image: require("../assets/chat/FQ9.png"),
    },
    {
      text: "¿Cómo puedo empezar a generar ingresos?",
      send: "¿Me puedes aconsejar cómo puedo empezar a generar ingresos con mi nuevo emprendimiento?",
      image: require("../assets/chat/FQ10.jpeg"),
    },
    {
      text: "Ideas para empezar mi emprendimiento",
      send: "¿Puedes darme algunas ideas para empezar mi emprendimiento?",
      image: require("../assets/chat/FQ11.png"),
    },
    {
      text: "Frases motivacionales para futuros emprendedores",
      send: "¿Puedes darme frases motivacionales para futuros emprendedores?",
      image: require("../assets/chat/FQ12.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
      {screen === 1 ? (
        <IntroductionClient setScreen={setScreen} />
      ) : screen === 2 ? (
        <IntroductionEntrepreneurship setScreen={setScreen} />
      ) : screen === 3 ? (
        <IntroductionFInal
          setScreen={setScreen}
          data={{
            image: require("./../assets/chat/entrepreneurship2.png"),
            text: "Nuestro chatbot puede brindarte toda la orientación que necesites para ayudarte a convertirte en emprendedor/a",
            route: 5,
          }}
        />
      ) : screen === 4 ? (
        <IntroductionFInal
          setScreen={setScreen}
          data={{
            image: require("./../assets/chat/entrepreneurship2.png"),
            text: "Nuestro chatbot puede brindarte toda la orientación que necesites para ayudarte a ser un mejor emprendedor/a",
            route: 5,
          }}
        />
      ) : screen === 5 ? (
        <Welcome updateInfo={updateInfo} setScreen={setScreen} />
      ) : screen === 6 ? (
        <Home
          FAQ={
            userData?.typeAccount === "client"
              ? FAQEntrepreneur
              : FAQClient
          }
        />
      ) : (
        <View>
          <Text>Cargando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: heightPercentageToDP(100),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
});
