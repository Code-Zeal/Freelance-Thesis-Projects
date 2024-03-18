import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  actualizarPeso,
  actualizarPreferencias,
  verPreferencias,
} from "../api/ASUserPreferences";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
function Question({ navigation, route }) {
  const [answer, setAnswer] = useState("");
  const {
    question,
    next,
    backgroundColor,
    answer1,
    answer2,
    answer3,
    answer4,
    text = false,
    placeholder,
    secondColor,
  } = route.params;
  const stackName = route.name;
  const handleTouch = async (answerP) => {  
    if(answerP){
      if (question === "¿Cual es tu peso?") {
        await actualizarPeso(answerP);
        navigation.navigate(next);
      } else if (answer || answerP) {
      await actualizarPreferencias(stackName, answerP);
      navigation.navigate(next);
    }
  }
  };
  const comprobarInfo = async () => {
    let info = await verPreferencias();
  };

  useEffect(() => {
    comprobarInfo();
  }, []);
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
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
      onLayout={onLayout}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <View
        style={{
          width: wp("90%"),
          height: heightPercentageToDP("20%"),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: "full",
            fontSize: 26,
            color: secondColor,
            marginBottom: 20,
            textAlign: "center",
            fontFamily: "Montserrat-Black",
          }}
        >
          {question}
        </Text>
      </View>

      {!text ? (
        <View
          style={{
            width: wp("60%"),
            height: heightPercentageToDP("40%"),
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              backgroundColor: secondColor,
              borderRadius: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 10,
            }}
            onPress={() => handleTouch(answer1)}
          >
            <Text
              style={{
                color: backgroundColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}
            >
              {answer1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: secondColor,
              borderRadius: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 10,
            }}
            onPress={() => handleTouch(answer2)}
          >
            <Text
              style={{
                color: backgroundColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}
            >
              {answer2}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: secondColor,
              borderRadius: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 10,
            }}
            onPress={() => handleTouch(answer3)}
          >
            <Text
              style={{
                color: backgroundColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}
            >
              {answer3}
            </Text>
          </TouchableOpacity>

          {answer4 ? (
            <TouchableOpacity
              style={{
                backgroundColor: secondColor,
                borderRadius: 10,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 10,
              }}
              onPress={() => handleTouch(answer4)}
            >
              <Text
                style={{
                  color: backgroundColor,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  textAlign: "center",
                  fontSize: 18,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                {answer4}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <>
          <TextInput
            style={{
              width: wp("80%"),
              height: 40,
              borderColor: secondColor,
              borderWidth: 2,
              marginVertical: 20,
              paddingLeft: 5,
              color: "white",
              fontSize: 18,
              fontFamily: "Montserrat-Bold",
            }}
            onChangeText={(text) => {
              if (question === "¿Cual es tu estatura?" && (text.includes(',') || text.includes('.'))) {
              } else {
                setAnswer(text);
              }
            }}
            value={answer}
            placeholder={placeholder}
            keyboardType="numeric"
            placeholderTextColor={`${secondColor}aa`}
          />
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              backgroundColor: secondColor,
              borderRadius: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 10,
            }}
            onPress={() => handleTouch(answer)}
          >
            <Text
              style={{
                color: backgroundColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Question;
