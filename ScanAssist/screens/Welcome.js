import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import storage from "../storage/user";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";
function Welcome({ navigation, route }) {
  const STYLES = ["default", "dark-content", "light-content"];
  const TRANSITIONS = ["fade", "slide", "none"];
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
        animated={true}
        backgroundColor="#8c52ff"
        barStyle={STYLES[2]}
        showHideTransition={TRANSITIONS[0]}
        hidden={false}
      />
      <View style={styles.main}>
        <Text style={styles.textTitle}>Bienvenida/o a ScanAssist</Text>
          <Image style={{width:widthPercentageToDP(80),height:heightPercentageToDP(25),marginLeft:widthPercentageToDP(10),marginTop:"auto",marginBottom:"auto"}} source={require('../assets/logo/logo.jpeg')}/>
        <View style={styles.bottomSelectContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={() => {
              navigation.navigate("Login")
              
              
            }}>
            <Text style={styles.nextText}>Ingresar</Text>
            <View style={styles.arrow}>

            <MaterialCommunityIcons
              name="arrow-right"
              color={"#8c52ff"}
              size={30}
              />
              </View>
          </TouchableOpacity> 
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main:{
    height:heightPercentageToDP(104),
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"stretch"
  },
  textTitle:{
    marginTop:heightPercentageToDP(10),
    lineHeight:50,
    fontSize:widthPercentageToDP(11),
    fontWeight:"900",
    textAlign: "center",
    padding:20,
    paddingRight:30,
    width:widthPercentageToDP(100)
  },
  bottomSelectContainer:{
    marginTop:"auto",
    backgroundColor: "#8c52ff",
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(20),
    flexDirection:"column",
    alignItems:"baseline",
    justifyContent:"space-between"
    
  },
  selectText:{
    fontSize:30,
    fontWeight:"800",
    letterSpacing:1,
    marginTop:5,
    marginLeft:widthPercentageToDP(10)
  },
  buttonStackContainer:{
    width:widthPercentageToDP(100),
    justifyContent:"center",
    alignItems:"center",
  },
  button:{
    width:widthPercentageToDP(60),
    padding:20,
    borderRadius:20,
    marginVertical:10,
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 9,
},
shadowOpacity: 0.48,
shadowRadius: 11.95,

elevation: 18,
  },
  buttonText:{
    paddingHorizontal:2,
    fontSize:20,
    textAlign:"left",
    fontWeight:"900"
  },
  nextButton:{
    padding:5,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:widthPercentageToDP(30),
    textAlign:"center",
    width:widthPercentageToDP(40),
    marginTop:heightPercentageToDP(2),
    marginBottom:"auto"

  },
  nextText:{
    color:"#fff",
    fontSize:widthPercentageToDP(8),
    fontWeight:"700"
  },
  arrow:{
    backgroundColor:"#fff",
    padding:5,
    marginLeft:10,
    borderRadius:15,
    width:50,
    justifyContent:"center",
    alignItems:"center",
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 9,
},
shadowOpacity: 0.48,
shadowRadius: 11.95,

elevation: 18,
  }
});
export default Welcome;
