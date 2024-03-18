import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import Chat from "../screens/Chat";
import Progress from "../screens/Progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Question from "../screens/Question";
import { useEffect, useState } from "react";
import { verPreferencias } from "../api/ASUserPreferences";
import Loading from "../components/Loading";
import Plan from "../screens/Plan";
import PlanDetail from "../screens/PlanDetail";
import { View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Tip from "../screens/Tip";
import Article from "../screens/Article";
import AdviceForm from "../screens/AdviceForm";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ffffffaa",
        tabBarVisible: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#756AB6",
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarLabel: "Calendario",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Progreso"
        component={Progress}
        options={{
          headerShown: false,
          tabBarLabel: "Progreso",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function AppGeneral() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({ Objetivo: null });
  const comprobarInfo = async () => {
    let infos = await verPreferencias();
    infos !== "No hay preferencias almacenadas." && setInfo(infos);
    // console.log(infos.Objetivo);
    setLoading(false);
  };
  useEffect(() => {
    comprobarInfo();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        backBehavior="Cargando"
        screenOptions={{
          header: () => (
            <View style={{ height: heightPercentageToDP("5%") }}></View>
          ),
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Cargando"
          component={Loading}
          options={{
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Edad"
          component={Question}
          initialParams={{
            question: "¿Cual es tu edad?",
            next: "Sexo",
            backgroundColor: "#756BB7",
            answer1: "Menos de 18 años",
            answer2: "18-24 años",
            answer3: "25-40 años",
            answer4: "41 años o más",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="Sexo"
          component={Question}
          initialParams={{
            question: "¿Cual es tu género?",
            next: "Estatura",
            backgroundColor: "#756BB7",
            answer1: "Mujer",
            answer2: "Hombre",
            answer3: "No binario",
            answer4: "Otro",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Estatura"
          component={Question}
          initialParams={{
            question: "¿Cual es tu estatura?",
            next: "Peso",
            backgroundColor: "#756BB7",
            text: true,
            placeholder: "Ingresa tu altura (cm) Ej: 182",
            QuestionColor: "#fff",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Peso"
          component={Question}
          initialParams={{
            question: "¿Cual es tu peso?",
            next: "Fuma",
            backgroundColor: "#756BB7",
            text: true,
            placeholder: "Ingresa tu peso (kg) Ej: 80,8",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Fuma"
          component={Question}
          initialParams={{
            question: "Usted Fuma?",
            next: "SaludFísica",
            backgroundColor: "#756BB7",
            answer1: "Nunca he fumado",
            answer2: "Fui fumador en el pasado",
            answer3: "Sí, pero estoy dejando el hábito",
            answer4: "Sí",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SaludFísica"
          component={Question}
          initialParams={{
            question: "¿Cómo describiría su salud física?",
            next: "SaludMental",
            backgroundColor: "#756BB7",
            answer1: "Excelente",
            answer2: "Buena",
            answer3: "Regular",
            answer4: "Mala",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SaludMental"
          component={Question}
          initialParams={{
            question: "¿Cómo describiría su salud mental?",
            next: "Ejercicio",
            backgroundColor: "#756BB7",
            answer1: "Excelente",
            answer2: "Buena",
            answer3: "Regular",
            answer4: "Mala",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ejercicio"
          component={Question}
          initialParams={{
            question: "¿Con que frecuencia hace ejercicio?",
            next: "AutoestimaPeso",
            backgroundColor: "#756BB7",
            answer1: "Todos los días",
            answer2: "Tres o cuatro veces por semana",
            answer3: "una o dos veces por semana",
            answer4: "Raramente",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AutoestimaPeso"
          component={Question}
          initialParams={{
            question:
              "¿Con que frecuencia tu autoestima es afectada por tu peso?",
            next: "AutoestimaForma",
            backgroundColor: "#756BB7",
            answer1: "Rara vez",
            answer2: "A veces",
            answer3: "Frecuentemente",
            answer4: "Siempre",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AutoestimaForma"
          component={Question}
          initialParams={{
            question:
              "¿Con qué frecuencia tu autoestima es afectada por la forma de tu cuerpo?",
            next: "AnimoPeso",
            backgroundColor: "#756BB7",
            answer1: "Rara vez",
            answer2: "A veces",
            answer3: "Frecuentemente",
            answer4: "Siempre",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AnimoPeso"
          component={Question}
          initialParams={{
            question: "¿Tu peso afecta tu estado de animo?",
            next: "Mentir",
            backgroundColor: "#756BB7",
            answer1: "No",
            answer2: "Rara vez",
            answer3: "En ocasiones",
            answer4: "Definitivamente",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mentir"
          component={Question}
          initialParams={{
            question:
              "¿Con qué frecuencia mientes acerca de tus hábitos alimenticios?",
            next: "NoComer",
            backgroundColor: "#756BB7",
            answer1: "Nunca",
            answer2: "Rara vez",
            answer3: "A veces",
            answer4: "Con frecuencia",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NoComer"
          component={Question}
          initialParams={{
            question:
              "¿Con qué frecuencia te restringes de lo que comes con la idea de bajar de peso?",
            next: "NoEngordar",
            backgroundColor: "#756BB7",
            answer1: "Nunca",
            answer2: "Ocasionalmente",
            answer3: "Regularmente",
            answer4: "Muy frecuentemente",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NoEngordar"
          component={Question}
          initialParams={{
            question:
              "¿Con qué frecuencia necesitas hacer ejercicio para no engordar o adelgazar?",
            next: "Avergonzado",
            backgroundColor: "#756BB7",
            answer1: "Una o dos veces por semana",
            answer2: "De dos a cuatro veces por semana",
            answer3: "Todos los días",
            answer4: "Nunca",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Avergonzado"
          component={Question}
          initialParams={{
            question:
              "¿Con qué frecuencia te sientes avergonzado/a por tu peso?",
            next: "Objetivo",
            backgroundColor: "#756BB7",
            answer1: "Nunca",
            answer2: "Raramente",
            answer3: "A veces",
            answer4: "Frecuentemente",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Objetivo"
          component={Question}
          initialParams={{
            question: "¿Cual es tu objetivo?",
            next: "Home",
            backgroundColor: "#756BB7",
            answer1: "Quiero subir de peso",
            answer2: "Quiero bajar de peso",
            answer3: "Quiero mantener mi peso actual",
            secondColor: "#ffffff",
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="Plan" component={Plan} />
        <Stack.Screen name="PlanDetail" component={PlanDetail} />
        <Stack.Screen name="Tip" component={Tip} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="AdviceForm" component={AdviceForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
