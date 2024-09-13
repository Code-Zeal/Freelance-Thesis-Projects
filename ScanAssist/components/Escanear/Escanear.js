import React, { useState, useEffect } from 'react';
import { Alert, Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { GetAllClassrooms, UpdateClass } from '../../api/classrooms';
import moment from 'moment-timezone';
import { AddAssistance } from '../../api/student';
import storage from '../../storage/user';
export default function Escanear({navigation,route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [clase, setClase] = useState(undefined)
  const [clases, setClases] = useState(undefined)
  const timeZone = 'America/Caracas';
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
  // Obtén la fecha actual en la zona horaria de Venezuela y el nombre del día
  const dayOfWeek = moment().tz(timeZone).format('dddd').toLowerCase()
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const getClases = async()=>{
    const {data,status} = await GetAllClassrooms(userData?.id)
    if(status === 200){
      console.log(data);
      setClases(data)
    }else{
      setClases([])
    }
  } 

  useEffect(() => {
   if(userData)getClases()
  
  }, [userData])
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let obj = JSON.parse(data)
    if(obj.id && obj.name && obj.yearAndSection && obj.parentEmail){
      const {status,error} = await AddAssistance(Number(obj?.id),clase?.id)
      if(status === 200){
        Alert.alert("Asistencia confirmada, clase: "+clase.name, `Alumno ${obj.name} de ${obj.yearAndSection}, Correo de representante:${obj.parentEmail}`);
      }else{
        Alert.alert("Ha ocurrido un error", error);
      }
    }else{
      Alert.alert("QR no válido")
    }
    };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara</Text>;
  }

  if (hasPermission === false) {
    return <Text>No se otorgaron permisos para la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar/>
      
     
        {clase ?
        <View>

        <BarCodeScanner

          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width:widthPercentageToDP(100),
            height:heightPercentageToDP(100),position:"relative"}}
            />
            {scanned && <TouchableOpacity style={{backgroundColor:"#333a86",position:"absolute", left:0,right:0,padding:10, height:heightPercentageToDP(7), marginLeft:"auto",marginRight:"auto",top:heightPercentageToDP(7)}} onPress={() => setScanned(false)}>
              <Text style={{color:"#fff",textAlign:"center",fontSize:widthPercentageToDP(5)}}>Escanear de nuevo</Text></TouchableOpacity>}
               <TouchableOpacity style={{backgroundColor:"#aa1e1e",position:"absolute", left:0,right:0,padding:10, marginLeft:"auto",marginRight:"auto",top:0,height:heightPercentageToDP(7),}} onPress={() => navigation.goBack()}>
              <Text style={{color:"#fff",textAlign:"center",fontSize:widthPercentageToDP(5)}}>Volver</Text></TouchableOpacity>
            </View>
        :
        <View>
           <Text style={{fontSize:widthPercentageToDP(6),marginLeft:"auto",marginRight:"auto",color:"black",fontWeight:'700',marginTop:heightPercentageToDP(2.5),textAlign:"center"}}>Selecciona una clase para pasar asistencia</Text>
      <ScrollView contentContainerStyle={{marginVertical:heightPercentageToDP(2.5),width:widthPercentageToDP(90),height:heightPercentageToDP(60),borderBlockColor:"black",borderWidth:3, alignItems:"center",borderRadius:20,padding:5}} style={{marginLeft:"auto", marginRight:"auto"}}>
        {clases && clases?.length > 0 ? clases.map((cla)=>{
          console.log(cla.schedule[dayOfWeek]);
          
          return (
            <TouchableOpacity onPress={()=>setClase(cla)} disabled={!cla.schedule[dayOfWeek]} style={cla.schedule[dayOfWeek]?{backgroundColor:"#8c52ff",width:"100%",borderRadius:5,padding:10,justifyContent:"space-evenly", flexDirection:"row",alignItems:"center",marginVertical:heightPercentageToDP(1)}:{backgroundColor:"#797979",width:"100%",borderRadius:5,padding:10,justifyContent:"space-evenly", flexDirection:"row",alignItems:"center",marginVertical:heightPercentageToDP(1)}}>
            <Text style={{color:"#fff"}}>{cla?.name}</Text>
          </TouchableOpacity>
          )
        }):clases && clases.length < 1 ? <Text style={{width:widthPercentageToDP(100),textAlign:"center",marginTop:heightPercentageToDP(20),fontSize:widthPercentageToDP(5),fontWeight:"700"}}>No hay clases creadas</Text>:<Text style={{width:widthPercentageToDP(100),textAlign:"center",marginTop:heightPercentageToDP(20),fontSize:widthPercentageToDP(5),fontWeight:"700"}}>Cargando...</Text> }
      </ScrollView>
      </View>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(100)
  },
});