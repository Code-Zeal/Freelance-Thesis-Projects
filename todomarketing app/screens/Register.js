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
import { Picker } from "@react-native-picker/picker";
import GetLocation from "../components/GetLocation";
import { generalValidator } from "../helpers/generalValidator";
import uuid from 'react-native-uuid';
import storage from "../storage/user";

function Register({ navigation, route }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [cellPhone, setCellPhone] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [delivery, setDelivery] = useState({ value: "", error: "" });
  const [twitter, setTwitter] = useState({ value: "", error: "" });
  const [facebook, setFacebook] = useState({ value: "", error: "" });
  const [instagram, setInstagram] = useState({ value: "", error: "" });
  const [rif, setRif] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [selectedLocation, setSelectedLocation] = useState({ value: null, error: "" });
  let typeAccount = route.params.type;
  const onSignUpPressed = async () => {
    try {
      setLoading(true);
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
    const cellPhoneError = cellPhoneValidator(cellPhone.value);
    const deliveryError = generalValidator(delivery.value,"delivery")
    const twitterError = generalValidator(twitter.value,"twitter")
    const facebookError = generalValidator(facebook.value,"facebook")
    const instagramError = generalValidator(instagram.value,"instagram")
    const rifError = generalValidator(rif.value,"rif")
    const selectedLocationError = generalValidator(selectedLocation.value,"ubicación")
    const descriptionError = generalValidator(description.value,"descripción")

   
    if(typeAccount === "Cliente"){
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
        typeAccount,
        null,
        null,
        null
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
                params: { type: typeAccount, data },
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
    }else{
      if (emailError || passwordError || nameError || cellPhoneError || deliveryError || twitterError || facebookError || instagramError || rifError || selectedLocationError || descriptionError ) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setCellPhone({ ...cellPhone, error: cellPhoneError });
        setDelivery({ ...delivery, error: deliveryError });
        setTwitter({ ...twitter, error: twitterError });
        setFacebook({ ...facebook, error: facebookError });
        setInstagram({ ...instagram, error: instagramError });  
        setRif({ ...rif, error: rifError });
        setSelectedLocation({ ...selectedLocation, error: selectedLocationError });
        setDescription({ ...description, error: descriptionError });
        setLoading(false);
        return;
      }
    let branches = JSON.stringify([{
      id: uuid.v4(),
      rif:rif.value,
      name:name.value,
      location:{...selectedLocation.value,
        "latitudeDelta": 0.1,
        "longitudeDelta": 0.1},
        cellPhone:cellPhone.value,
        socialMedias:{
          twitter:twitter.value,
          facebook:facebook.value,
          telegram:cellPhone.value,
          whatsApp:cellPhone.value,
          instagram:instagram.value
        }
    }])
    
    const { status, data, error } = await RegisterRequest(
      name.value,
      email.value,
      password.value,
      cellPhone.value,
      typeAccount,
      delivery.value,
      branches,
      description.value
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
              params: { type: typeAccount, data },
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
    }} catch (error) {
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
       <ScrollView style={styles.container} contentContainerStyle={{}}>
        <StatusBar
          animated={false}
          backgroundColor="#03B97A"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />
        <View style={styles.main}>
          <View style={styles.bottomSelectContainer}>
            <View>
              <Text style={styles.SessionText}>Registro</Text>
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
                onPress={() =>
                  navigation.navigate("selectL/R", { type: typeAccount })
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
                onPress={onSignUpPressed}
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
          </View>
        </View>
      </ScrollView>
    );
  if (typeAccount === "Emprendedor")
    return (
      <ScrollView style={styles.container} contentContainerStyle={{}}>
        <StatusBar
          animated={false}
          backgroundColor="#03B97A"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />
        <View style={styles.main}>
          <View style={styles.bottomSelectContainer}>
            <View>
              <Text style={styles.SessionText}>Registro</Text>
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
                onPress={() =>
                  navigation.navigate("selectL/R", { type: typeAccount })
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
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Nombre del emprendimiento</Text>
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
               <Text style={{ fontSize: 20, fontWeight: "600" }}>Descripción</Text>
              <TextInput
                style={styles.input}
                label="description"
                returnKeyType="next"
                value={description.value}
                onChangeText={(text) => setDescription({ value: text, error: "" })}
                error={!!description.error}
                errorText={description.error}
              />
              {description.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {description.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {description.error}
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
            

            
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Delivery
              </Text>
              <Picker
                style={{...styles.input,marginVertical:heightPercentageToDP(3)}}
                label="Delivery"
                returnKeyType="done"
                selectedValue={delivery.value}
                onValueChange={(text) => setDelivery({ value: text, error: "" })}
                error={!!delivery.error}
                errorText={delivery.error}
                dropdownIconColor={"#171717"}
              >
                 <Picker.Item label="Nacional" value="national" />
                 <Picker.Item label="Local" value="city" />
                 <Picker.Item label="No realiza" value="none" />
              </Picker>
              {delivery.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {delivery.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {delivery.error}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                X / Twitter
              </Text>
              <TextInput
                style={styles.input}
                label="twitter"
                returnKeyType="done"
                value={twitter.value}
                onChangeText={(text) => setTwitter({ value: text, error: "" })}
                error={!!twitter.error}
                errorText={twitter.error}
                
              />
              {twitter.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {twitter.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {twitter.error}
                </Text>
              )}
            </View>


            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Facebook
              </Text>
              <TextInput
                style={styles.input}
                label="facebook"
                returnKeyType="done"
                value={facebook.value}
                onChangeText={(text) => setFacebook({ value: text, error: "" })}
                error={!!facebook.error}
                errorText={facebook.error}
                
              />
              {facebook.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {facebook.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {facebook.error}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Instagram
              </Text>
              <TextInput
                style={styles.input}
                label="instagram"
                returnKeyType="done"
                value={instagram.value}
                onChangeText={(text) => setInstagram({ value: text, error: "" })}
                error={!!instagram.error}
                errorText={instagram.error}
              />
              {instagram.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {instagram.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {instagram.error}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Rif
              </Text>
              <TextInput
                style={styles.input}
                label="rif"
                returnKeyType="done"
                value={rif.value}
                onChangeText={(text) => setRif({ value: text, error: "" })}
                error={!!rif.error}
                errorText={rif.error}
              />
              {rif.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {rif.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {rif.error}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Ubicación
              </Text>
              <GetLocation selectedLocation={selectedLocation.value} setSelectedLocation={setSelectedLocation}/>
              {selectedLocation.error ? (
                <Text style={{ color: "#cc332f", paddingVertical: 10 }}>
                  {selectedLocation.error}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#cc332f",
                    display:"none",
                    paddingVertical: 10,
                  }}
                >
                  {selectedLocation.error}
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
                onPress={onSignUpPressed}
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
