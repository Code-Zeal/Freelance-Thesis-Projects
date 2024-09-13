import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Avatar } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import storage from '../../storage/user';
import { CommonActions } from '@react-navigation/native';
function Home({navigation,route}) {
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
    
    if(userData !== undefined && !userData?.email && !userData.name){
      Toast.show({type:"info",text1:"Inicia sesión para continuar"})
      setLoading(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Login",
            },
          ],
        })
      );
    }else{
      return
    }

  }, [userData])
  
  return (
    <View style={{flexDirection:"row",flexWrap:"wrap",}}>
      <TouchableOpacity

        style={{width:widthPercentageToDP(45),height:heightPercentageToDP(45), marginHorizontal:widthPercentageToDP(2.5), justifyContent:"center",alignItems:"center",marginVertical:widthPercentageToDP(0)}}
        mode="contained"
        onPress={() => navigation.navigate("Escanear")}
      >
        <Avatar.Icon style={{backgroundColor:"#2a1a63"}} size={widthPercentageToDP(45)} icon="barcode-scan" />
        <Text style={{fontSize:widthPercentageToDP(8), fontWeight:"800"}}>Escanear</Text>
      </TouchableOpacity>
      <TouchableOpacity
      
      style={{width:widthPercentageToDP(45),height:heightPercentageToDP(45), marginHorizontal:widthPercentageToDP(2.5), justifyContent:"center",alignItems:"center",marginVertical:widthPercentageToDP(0)}}
      mode="contained"
      onPress={() => navigation.navigate("Alumnos")}
    >
      <Avatar.Icon style={{backgroundColor:"#2a1a63"}} size={widthPercentageToDP(45)} icon="account-group" />
      <Text style={{fontSize:widthPercentageToDP(8), fontWeight:"800"}}>Alumnos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      
      style={{width:widthPercentageToDP(45),height:heightPercentageToDP(45), marginHorizontal:widthPercentageToDP(2.5), justifyContent:"center",alignItems:"center",marginVertical:widthPercentageToDP(0)}}
      mode="contained"
      onPress={() => navigation.navigate("Clases")}
    >
      <Avatar.Icon style={{backgroundColor:"#2a1a63"}} size={widthPercentageToDP(45)} icon="chair-school" />
      <Text style={{fontSize:widthPercentageToDP(8), fontWeight:"800"}}>Clases</Text>
    </TouchableOpacity>
    <TouchableOpacity
      
      style={{width:widthPercentageToDP(45),height:heightPercentageToDP(45), marginHorizontal:widthPercentageToDP(2.5), justifyContent:"center",alignItems:"center",marginVertical:widthPercentageToDP(0)}}
      mode="contained"
      onPress={() => navigation.navigate("Perfil")}
    >
      <Avatar.Icon style={{backgroundColor:"#2a1a63"}} size={widthPercentageToDP(45)} icon="account" />
      <Text style={{fontSize:widthPercentageToDP(8), fontWeight:"800"}}>Perfil</Text>
    </TouchableOpacity>
    </View>
  );
}

export default Home