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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Toast from "react-native-toast-message";
import { LoginRequest } from "../api/auth";
import storage from "../storage/user";
import Manual from "../components/Manual";
function Login({ navigation, route }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [manual, setManual] = useState(false)
  let typeAccount = route.params.type;
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
    const { status, data,error } = await LoginRequest(email.value, password.value,typeAccount);
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
              params: { type: typeAccount, data },
            },
          ],
        })
      );
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
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
              params: { type: userData.typeAccount, data:userData },
            },
          ],
        })
      );
    }else{
      return
    }

  }, [userData])
  if (typeAccount === "Cliente")
    return (
      <View style={styles.container}>
      {manual && <Manual setManual={setManual}/>}
        <StatusBar
          animated={false}
          backgroundColor="#03B97A"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />
          
        <View style={styles.main}>
          
          <View style={styles.bottomSelectContainer}>
          <TouchableOpacity onPress={()=>setManual(true)}  style={{width:widthPercentageToDP(25),height:widthPercentageToDP(25),position:"absolute", right:widthPercentageToDP(5),top:heightPercentageToDP(10), backgroundColor:"#fff",justifyContent:"center",alignItems:"center", borderRadius:100,borderColor:"#003D27",borderWidth:4,}}>
        <MaterialCommunityIcons name="book-information-variant" size={30} color="black" />
        <Text style={{fontSize:widthPercentageToDP(4),fontWeight:"800"}}>Manual</Text>
        </TouchableOpacity>
            <View>
              <Text style={styles.SessionText}>Inicio De Sesión</Text>
              <Text
                style={{
                  width: widthPercentageToDP(60),
                  fontSize: 20,
                  color: "#ffffffcc",
                  fontWeight: "800",
                  letterSpacing: 2,
                  paddingTop: 25,
                  paddingLeft: widthPercentageToDP(10),
                }}
              >
                Cliente
              </Text>
            </View>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Welcome")}
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
                  backgroundColor: "#0c5b40",
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
                  backgroundColor: "#03B97A",
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
                navigation.navigate("Register", { type: typeAccount })
              }
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#017f47",
                  fontWeight: "700",
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
  if (typeAccount === "Emprendedor")
    return (
      <View style={styles.container}>
      {manual && <Manual setManual={setManual}/>}
        <StatusBar
          animated={false}
          backgroundColor="#03B97A"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />
        <View style={styles.main}>
          
          <View style={styles.bottomSelectContainer}>
          <TouchableOpacity onPress={()=>setManual(true)}  style={{width:widthPercentageToDP(25),height:widthPercentageToDP(25),position:"absolute", right:widthPercentageToDP(5),top:heightPercentageToDP(10), backgroundColor:"#fff",justifyContent:"center",alignItems:"center", borderRadius:100,borderColor:"#003D27",borderWidth:4,}}>
        <MaterialCommunityIcons name="book-information-variant" size={30} color="black" />
        <Text style={{fontSize:widthPercentageToDP(4),fontWeight:"800"}}>Manual</Text>
        </TouchableOpacity>
            <View>
              <Text style={styles.SessionText}>Inicio De Sesión</Text>
              <Text
                style={{
                  width: widthPercentageToDP(60),
                  fontSize: 18,
                  color: "#ffffffcc",
                  fontWeight: "800",
                  letterSpacing: 2,
                  paddingTop: 25,
                  paddingLeft: widthPercentageToDP(10),
                }}
              >
                Emprendedor
              </Text>
            </View>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Welcome")}
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
                  backgroundColor: "#0c5b40",
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
                  backgroundColor: "#03B97A",
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
                navigation.navigate("Register", { type: typeAccount })
              }
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#017f47",
                  fontWeight: "700",
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
    height: heightPercentageToDP(65),
    width: widthPercentageToDP(100),
    paddingHorizontal: widthPercentageToDP(10),
    marginTop: heightPercentageToDP(5),
    marginBottom: heightPercentageToDP(20),
  },
  backButtonContainer: {
    width: widthPercentageToDP(40),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {},
  bottomSelectContainer: {
    backgroundColor: "#03B97A",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(25),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  SessionText: {
    width: widthPercentageToDP(60),
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 2,
    paddingTop: 20,
    paddingLeft: widthPercentageToDP(10),
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
