import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { Switch } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { NewClass, UpdateClass } from '../../api/classrooms';
import Toast from 'react-native-toast-message';
import { getAllStudent } from '../../api/student';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function EditarClaseAlumnos({clase,hideModal,setTrigger}) {
  console.log(clase);
  
  const [alumnosOut, setAlumnosOut] = useState([])
  const [alumnosIn, setAlumnosIn] = useState([])
  const [allAlumnos, setAllAlumnos] = useState(undefined)
  const [yearAndSection, setYearAndSection] = useState({value:clase?.yearAndSection,errors:[]})
  const [loading, setLoading] = useState(false)
  const getAlumnos = async()=>{
    const {data,status} = await getAllStudent()
    if(status === 200){
      console.log(data);
      
      setAllAlumnos(data)
    }else{
      setAllAlumnos([])
    }
  } 
  useEffect(() => {
    getAlumnos()
    },[])
  
    useEffect(() => {
      if (clase && allAlumnos) {
        const enClase = [];
        const fueraClase = [];
    
        allAlumnos.forEach((alumno) => {
          const isInClass = clase.students.some((alumnoClase) => alumnoClase.id === alumno.id);
    
          if (isInClass) {
            enClase.push(alumno);
          } else {
            fueraClase.push(alumno);
          }
        });
    
        setAlumnosIn(enClase);
        setAlumnosOut(fueraClase);
      }
    }, [clase, allAlumnos]);
  
  useEffect(() => {
    
  console.log("alumnosIn",alumnosIn);
  console.log("alumnosOut",alumnosOut);
  
  }, [alumnosIn,alumnosOut])
  
  const onModify = async ()=>{
    setLoading(true)
    let students = alumnosIn.map((el)=>el.id)
    const {status,data,} = await UpdateClass(clase.id,null,null,null,students)
    if(status !== 200){
      Toast.show({type:"error",text1:"Error",text2:"Ha ocurrido un error al modificar la clase"})
      setLoading(false) 
      return
  }
  setTrigger((e)=>!e)
  Toast.show({type:"success",text1:"Correcto",text2:"Clase modificada correctamente"})
  setLoading(false) 
  hideModal()
  }

  return (
    <View
    style={{
      backgroundColor: "white",
      position: "absolute",
      width: widthPercentageToDP(100),
      height:heightPercentageToDP(90),
      top: heightPercentageToDP(0),
      paddingHorizontal:widthPercentageToDP(2),
      zIndex:9999999
      
    }}
  visible
  >
      <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 5,
              position: "absolute",
              top: heightPercentageToDP(3),
              right: 5,
            }}
            onPress={hideModal}
          >
            <MaterialCommunityIcons name="close-thick" size={32} />
          </TouchableOpacity>
      <Text style={{fontSize:widthPercentageToDP(6),marginLeft:"auto",marginRight:"auto",color:"black",fontWeight:'700',marginTop:heightPercentageToDP(2.5)}}>Clase: {clase.name}</Text>
        <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"800",marginLeft:"auto",marginRight:"auto",marginVertical:heightPercentageToDP(4),marginBottom:heightPercentageToDP(1)}}>Alumnos fuera de la clase</Text>
      <ScrollView contentContainerStyle={{width:widthPercentageToDP(80), alignItems:"center",padding:5}} style={{marginLeft:"auto", marginRight:"auto",height:heightPercentageToDP(20),borderBlockColor:"black",borderWidth:3,borderRadius:20,paddingHorizontal:5}}>
        {alumnosOut?.length>0 && alumnosOut.map((el)=>{
          return <View style={{backgroundColor:"#6903b9",width:widthPercentageToDP(70), height:heightPercentageToDP(7),borderRadius:20,paddingHorizontal:widthPercentageToDP(5),justifyContent:"space-between", flexDirection:"row",alignItems:"center",marginVertical:5}}>
            <Text style={{color:"#fff", width:"80%"}}>{el?.name.length > 20 ? `${el.name.slice(0,20)}...` : el.name}</Text>
            <TouchableOpacity onPress={()=>{
              setAlumnosIn((e)=>[...e,el])
              setAlumnosOut((e)=>e.filter((al)=>al.id !== el.id))
              }} style={{backgroundColor:"#239b20",borderRadius:1000, width:widthPercentageToDP(10),height:widthPercentageToDP(10),justifyContent:"center",alignItems:"center"}}><Text style={{color:"#fff",fontSize:widthPercentageToDP(4)}}><Feather name="plus" size={24} color="white" /></Text></TouchableOpacity>
          </View>
        })}
      </ScrollView>

        <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"800",marginLeft:"auto",marginRight:"auto",marginVertical:heightPercentageToDP(4),marginBottom:heightPercentageToDP(1)}}>Alumnos dentro de la clase</Text>
        <ScrollView contentContainerStyle={{width:widthPercentageToDP(80), alignItems:"center",padding:5}} style={{marginLeft:"auto", marginRight:"auto",height:heightPercentageToDP(20),borderBlockColor:"black",borderWidth:3,borderRadius:20,paddingHorizontal:5}}>
        
        {alumnosIn?.length>0 && alumnosIn.map((el)=>{
          return  <View style={{backgroundColor:"#6903b9",width:widthPercentageToDP(70), height:heightPercentageToDP(7),borderRadius:20,paddingHorizontal:widthPercentageToDP(5),justifyContent:"space-between", flexDirection:"row",alignItems:"center",marginVertical:5}}>
            <Text style={{color:"#fff", width:"80%"}}>{el?.name.length > 20 ? `${el.name.slice(0,20)}...` : el.name}</Text>
            <TouchableOpacity onPress={()=>{
              setAlumnosOut((e)=>[...e,el])
              setAlumnosIn((e)=>e.filter((al)=>al.id !== el.id))
              
              }} style={{backgroundColor:"#9b2020",borderRadius:1000, width:widthPercentageToDP(10),height:widthPercentageToDP(10),justifyContent:"center",alignItems:"center"}}><Text style={{color:"#fff",fontSize:widthPercentageToDP(4)}}><Feather name="minus" size={24} color="white" /></Text></TouchableOpacity>
          </View>
        })}
      </ScrollView>

      <Button  labelStyle={{fontSize:18}} loading={loading} icon="creation" style={{padding:5,marginVertical:heightPercentageToDP(3)}}  mode="contained" onPress={onModify}>
      Guardar cambios
    </Button>
      
    </View>
  );
}

export default EditarClaseAlumnos