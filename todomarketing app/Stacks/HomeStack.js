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
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import Saved from "../screens/Saved";
import EntrepreneurshipProfile from "../screens/EntrepreneurshipProfile.js";
import Profile from "../screens/Profile.js";
import Advices from "../screens/Advices.js";
import Design from "../screens/Design.js";
import RequiredImageList from "../components/Design/RequiredImageList.js";
import IABackground from "../components/Design/IABackground.js";
import TemplatesList from "../components/Design/TemplatesList.js";
import MyGallery from "../screens/MyGallery";
import RemoveBg from "../screens/RemoveBg";
import ImageDetail from "../screens/ImageDetail";
import VideoDetail from "../screens/VideoDetail.js";
import NewDesignPost from "../screens/NewDesignPost.js";
import PickImageMyGallery from "../screens/PickImageMyGallery.js";
// import EditImage from "../screens/EditImage";
// import MyGalleryEditor from "../screens/MyGalleryEditor";
// import EditByAI from "../screens/EditByAI.js";
// import MyGalleryRemoveBg from "../screens/MyGalleryRemoveBg.js";
// import CreateImageIA from "../screens/CreateImageIA.js";
// import MyGalleryPickFrontImg from "../screens/MyGalleryPickFrontImg.js";
// import MyGalleryPickBackImg from "../screens/MyGalleryPickBackImg.js";
// import ChangeBackgroundPreview from "../screens/ChangeBackgroundPreview.js";
// import GenerateImageTemplate from "../screens/GenerateImageTemplate.js";
// import FormVideoGenerator from "../screens/FormVideoGenerator.js";
// import CreatePost from "../screens/CreatePost.js";
// import SelectGallery from "../screens/SelectGallery.js";
import NewPost from "../screens/NewPost.js";
import storage from "../storage/user.js";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


function MyTabs({ navigation, route }) {
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
    let typeAccount = userData?.typeAccount === "entrepreneur";
    return (
      <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ffffffbb",
        tabBarVisible: false,
        tabBarStyle: {
          backgroundColor: "#03B97A",
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
        {() => <Home navigation={navigation} route={route}></Home>}
      </Tab.Screen>
      <Tab.Screen
        name="Guardados"
        options={{
          headerShown: false,
          tabBarLabel: "Guardados",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={size} />
          ),
        }}
      >
        {() => <Saved route={route}></Saved>}
      </Tab.Screen>
      <Tab.Screen
        name="Consejos"

        options={{
          headerShown: false,
          tabBarLabel: "Consejos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => <Advices />}
      </Tab.Screen>
      {typeAccount && (
        <Tab.Screen
          name="Diseño"
          options={{
            headerShown: false,
            tabBarLabel: "Diseño",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="palette"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {() => <Design navigation={navigation} route={route}></Design>}
        </Tab.Screen>
      )}
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
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
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          // component={()=><></>}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="selectL/R"
          component={Login}
          options={{
            headerShown: false,
            freezeOnBlur: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen
          name="EntrepreneurshipProfile"
          component={EntrepreneurshipProfile}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="RequiredImageList"
          component={RequiredImageList}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="IABackgroundPicker"
          component={IABackground}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="TemplateContent"
          component={TemplatesList}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="Gallery"
          component={MyGallery}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="RemoveBg"
          component={RemoveBg}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="ImageDetail"
          component={ImageDetail}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="VideoDetail"
          component={VideoDetail}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="NewDesignPost"
          component={NewDesignPost}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="PickImageMyGallery"
          component={PickImageMyGallery}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="NewPost"
          component={NewPost}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        {/* 
        <Stack.Screen
          name="GalleryEditor"
          component={MyGalleryEditor}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="GalleryEditorRemoveBg"
          component={MyGalleryRemoveBg}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="GalleryPickFront"
          component={MyGalleryPickFrontImg}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="GalleryPickBack"
          component={MyGalleryPickBackImg}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="ChangeBackGroundPreview"
          component={ChangeBackgroundPreview}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="CreateImageIA"
          component={CreateImageIA}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="EditImage"
          component={EditImage}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="EditByAI"
          component={EditByAI}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="FormVideoGenerator"
          component={FormVideoGenerator}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="GenerateImageTemplate"
          component={GenerateImageTemplate}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="FormImageGenerator"
          component={GenerateImageTemplate}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen
          name="SelectGallery"
          component={SelectGallery}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
      
        
     
        
        
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
