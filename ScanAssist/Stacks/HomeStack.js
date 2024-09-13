import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Text } from "react-native";
import Home from "../components/Inicio/Home";
import Alumnos from "../components/Alumnos/Alumnos";
import Perfil from "../components/Perfil/Perfil";
import Clases from "../components/Clases/Clases";
import Escanear from "../components/Escanear/Escanear";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Welcome from "../screens/Welcome";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const TestComponent = ({ route }) => {
  const initialRouteName = route.name;
  const STYLES = ["default", "dark-content", "light-content"];
  const TRANSITIONS = ["fade", "slide", "none"];
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#8c52ff"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
       
      <View style={styles.buttonsContainer}>
        <Text>{initialRouteName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a1a63",
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});
function MyTabs({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ffffffcc",
        tabBarVisible: false,
        tabBarStyle: {
          backgroundColor: "#2a1a63",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      >
        {() => <Home  route={route} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Alumnos"
        options={{
          headerShown: false,
          tabBarLabel: "Alumnos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      >
        {() => <Alumnos  route={route} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Clases"
        options={{
          headerShown: false,
          tabBarLabel: "Clases",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chair-school" color={color} size={size} />
          ),
        }}
      >
        {() => <Clases  route={route} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Perfil"
        options={{
          headerShown: false,
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      > 
      {() => <Perfil  route={route} navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
export default function AppGeneral() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="Escanear" component={Escanear} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
