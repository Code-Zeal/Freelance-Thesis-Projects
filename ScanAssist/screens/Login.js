import React, { useEffect, useState } from "react";
import {
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
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Toast from "react-native-toast-message";
import { LoginRequest } from "../api/auth";
import storage from "../storage/user";
function Login({ navigation, route }) {
  const [email, setEmail] = useState({ value: "codigomarce@gmail.com", error: "" });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({ value: "123456", error: "" });
  const onLoginPressed = async () => {
    setLoading(true)
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoading(false)
      return;
    }
    const { status, data } = await LoginRequest(email.value, password.value);
    if (status === 200) {
      Toast.show({
        type: "success",
        text1: "Correcto",
        text2: "Inicio de sesión exitoso",
      });
      setLoading(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Home",
              params: {  data },
            },
          ],
        })
      );
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email o contraseña inválidos",
      });
      setLoading(false)
      return;
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
      <View style={styles.container}>
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
              <Text style={styles.SessionText}>Inicio De Sesión</Text>
             
            </View>
           
          </View>
          <View style={styles.formContainer}>
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
                onPress={onLoginPressed}
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Register")
              }
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#8c52ff",
                  fontWeight: "800",
                  letterSpacing: 2,
                }}
              >
                ¿Aún no tienes una cuenta? Regístrate!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    marginTop: 5,
  },
  formContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: heightPercentageToDP(82),
    width: widthPercentageToDP(100),
    paddingHorizontal: widthPercentageToDP(10),
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
    justifyContent: "space-between",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  SessionText: {
    width: widthPercentageToDP(100),
    fontSize: widthPercentageToDP(8),
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: heightPercentageToDP(5),
    marginLeft: widthPercentageToDP(0),
    textAlign:"center"
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  main: {
    height: heightPercentageToDP(100),
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
export default Login;
