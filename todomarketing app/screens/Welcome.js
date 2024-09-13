import React, { useEffect, useState } from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import storage from "../storage/user";
import { CommonActions } from "@react-navigation/native";
import Manual from "../components/Manual";
function Welcome({ navigation, route }) {
  const STYLES = ["default", "dark-content", "light-content"];
  const TRANSITIONS = ["fade", "slide", "none"];
  const [typeAccount, setTypeAccount] = useState("")
  const [manual, setManual] = useState(false)
  const toggleType = (type)=>{
    setTypeAccount(type)
  }
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
  return (
    <View style={styles.container}>
      {manual && <Manual setManual={setManual}/>}

      <StatusBar
        animated={true}
        backgroundColor="#03B97A"
        barStyle={STYLES[2]}
        showHideTransition={TRANSITIONS[0]}
        hidden={false}
      />
      <View style={styles.main}>
        <Text style={styles.textTitle}>Bienvenido a Todo Marketing</Text>
        <TouchableOpacity onPress={()=>setManual(true)} style={{width:widthPercentageToDP(25),height:widthPercentageToDP(25),position:"absolute", right:2,top:2, backgroundColor:"#03B97A",justifyContent:"center",alignItems:"center", borderRadius:100,borderColor:"#003D27",borderWidth:4,}}>
        <MaterialCommunityIcons name="book-information-variant" size={30} color="black" />
        <Text style={{fontSize:widthPercentageToDP(4),fontWeight:"800"}}>Manual</Text>
        </TouchableOpacity>
        <View style={styles.bottomSelectContainer}>
          <Text style={styles.selectText}>Seleccione:</Text>
          <View style={styles.buttonStackContainer}>
            <TouchableOpacity onPress={()=>toggleType("Cliente")} style={{...styles.button,backgroundColor:typeAccount === "Cliente"?"#003D27":"#fff"}}>
              <Text style={{...styles.buttonText,color:typeAccount === "Cliente"? "#fff":"#000"}}>Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>toggleType("Emprendedor")} style={{...styles.button,backgroundColor:typeAccount === "Emprendedor"? "#003D27":"#fff"}}>
              <Text style={{...styles.buttonText,color:typeAccount === "Emprendedor"? "#fff":"#000"}}>Emprendedor</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => {
              if(typeAccount){

                navigation.navigate("selectL/R",{
                  type:typeAccount
                })
              }else{
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Por favor seleccione un tipo de cuenta'
                });
              }
              
            }}>
            <Text style={styles.nextText}>Siguiente</Text>
            <View style={styles.arrow}>

            <MaterialCommunityIcons
              name="arrow-right"
              color={"#03B97A"}
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
    backgroundColor: "#ecf0f1",
  },
  main:{
    height:heightPercentageToDP(100),
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"stretch"
  },
  textTitle:{
    marginTop:40,
    lineHeight:50,
    fontSize:40,
    fontWeight:"900",
    textAlign: "left",
    padding:20,
    paddingRight:30,
    width:widthPercentageToDP(100)
  },
  bottomSelectContainer:{
    marginTop:"auto",
    backgroundColor: "#03B97A",
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(55),
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
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
    marginLeft:"auto",
    marginBottom:40,
    marginRight:widthPercentageToDP(20)
  },
  nextText:{
    color:"#000",
    fontSize:24,
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
