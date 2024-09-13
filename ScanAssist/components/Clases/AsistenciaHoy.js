import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
const moment = require('moment-timezone');

function AsistenciaHoy({hideModal,clase}) {
  return (
    <ScrollView
    style={{
      backgroundColor: "white",
      position: "absolute",
      width: widthPercentageToDP(100),
      height:heightPercentageToDP(90),
      paddingHorizontal:widthPercentageToDP(3),
      paddingVertical:widthPercentageToDP(5),
      zIndex:9999999
      
    }}
  visible
  >
    <TouchableOpacity style={{backgroundColor:"#fff", padding:5, position:"absolute", top: heightPercentageToDP(0),right:5,zIndex:99999}} onPress={hideModal}>
      <MaterialCommunityIcons name='close-thick' size={32} />
    </TouchableOpacity>
    <Text style={{ fontSize:widthPercentageToDP(7),marginTop:heightPercentageToDP(7),marginBottom:heightPercentageToDP(3),fontWeight:"700"}}>Asistencia de hoy</Text>
    <Text style={{ fontSize:widthPercentageToDP(5),marginBottom:heightPercentageToDP(5),fontWeight:"700"}}>Alumnos de {clase?.name}, {clase?.yearAndSection}:</Text>
    {clase?.students?.length > 0 ? clase.students.map((alumno,i)=>{
      const fechaHoy = moment().tz('America/Caracas').format('DD-MM-YYYY')
      const asistenciaDeHoy = clase?.attendance?.length > 0 && clase?.attendance.find(el=>el.date === fechaHoy)
      const isPresent = asistenciaDeHoy?.students?.includes(alumno?.id);
      const attendanceText = isPresent ? "Asistió" : "No ha asistido";
      const textColor = isPresent ? "#28a745" : "#dc3545";
      
      
      
      return(  <Text 
        id={`alumnoAsistenciaHoy${i}`} 
        style={{ 
            fontSize: widthPercentageToDP(5), 
            marginBottom: heightPercentageToDP(2), 
            color: textColor 
        }}
    >
        *{alumno?.name} {attendanceText}
    </Text>)
    }):clase?.students?.length < 1 ?
    <Text>No hay alumnos en esta clase</Text>:
    <Text>Cargando...</Text>
    
  }
    </ScrollView>
  )
}

export default AsistenciaHoy