import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { CommonActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { cellPhoneValidator } from "../helpers/cellPhoneValidator";
import Toast from "react-native-toast-message";
import { RegisterRequest } from "../api/auth";
import storage from "../storage/user";

function Register({ navigation, route }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [cellPhone, setCellPhone] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const onSignUpPressed = async () => {
    try {
      setLoading(true);
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
    const cellPhoneError = cellPhoneValidator(cellPhone.value);
   
      if (emailError || passwordError || nameError || cellPhoneError ) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setCellPhone({ ...cellPhone, error: cellPhoneError });
        setLoading(false);
        return;
      }
      const { status, data, error } = await RegisterRequest(
        name.value,
        email.value,
        password.value,
        cellPhone.value,
      );
      if (status === 200) {
        Toast.show({
          type: "success",
          text1: "Correcto",
          text2: "Registro exitoso",
        });
        setLoading(false)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "Home",
                params: { data },
              },
            ],
          })
        );
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `Error en el servidor:${error}`,
        });
        setLoading(false);
  
        return;
    
    }
  
  } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `Error en el servidor:${error}`,
      });
      setLoading(false);
    }
  };
  const [userData, setUserData] = useState(undefined)
  storage
  .load({
    key: 'user',
    autoSync: true,
    syncInBackground: true,
  })
  .then(ret => {
    setUserData(ret)
  })
  .catch(err => {
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        break;
    }
  });
  useEffect(() => {
    
    if(userData && userData.email && userData.name){
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Home",
            },
          ],
        })
      );
    }else{
      return
    }

  }, [userData])

    return (
       <ScrollView style={styles.container} contentContainerStyle={{}}>
        <StatusBar
          animated={false}
          backgroundColor="#8c52ff"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />
        <View style={styles.main}>
          <View style={styles.bottomSelectContainer}>
            <View>
              <Text style={styles.SessionText}>Registro</Text>
            </View>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Login")
                }
                style={styles.backButton}
              >
                <MaterialCommunityIcons
                  name="arrow-left-thin"
                  color={"#fff"}
                  size={60}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Nombre</Text>
              <TextInput
                style={styles.input}
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
              />
              {name.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {name.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {name.error}
                </Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Número de teléfono
              </Text>
              <TextInput
                style={styles.input}
                label="cellPhone"
                returnKeyType="next"
                value={cellPhone.value}
                onChangeText={(text) =>
                  setCellPhone({ value: text, error: "" })
                }
                error={!!cellPhone.error}
                errorText={cellPhone.error}
              />
              {cellPhone.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {cellPhone.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {cellPhone.error}
                </Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Correo electrónico
              </Text>
              <TextInput
                style={styles.input}
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              {email.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {email.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {email.error}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Contraseña
              </Text>
              <TextInput
                style={styles.input}
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
              />
              {password.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {password.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {password.error}
                </Text>
              )}
            </View>
            {loading ? (
              <TouchableOpacity
                disabled
                style={{
                  backgroundColor: "#0a0653",
                  padding: 20,
                  borderRadius: 20,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "#fff",
                    fontWeight: "700",
                    letterSpacing: 2,
                  }}
                >
                  Cargando...
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onSignUpPressed}
                style={{
                  backgroundColor: "#8c52ff",
                  padding: 20,
                  borderRadius: 20,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "#fff",
                    fontWeight: "700",
                    letterSpacing: 2,
                  }}
                >
                  Siguiente
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  inputContainer: {},
  input: {
    width: widthPercentageToDP(80),
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
  },
  formContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "auto",
    width: widthPercentageToDP(100),
    paddingHorizontal: widthPercentageToDP(10),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(10),
  },
  backButtonContainer: {
    width: widthPercentageToDP(40),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {},
  bottomSelectContainer: {
    backgroundColor: "#8c52ff",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(18),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems:"center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  SessionText: {
    width: widthPercentageToDP(60),
    fontSize: widthPercentageToDP(8),
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: heightPercentageToDP(0),
    marginLeft: widthPercentageToDP(0),
    textAlign:"center"
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
      },
  main: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  buttonStackContainer: {
    width: widthPercentageToDP(100),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
});
export default Register;
