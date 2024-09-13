import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

function Horario({hideModal,clase}) {
  console.log("horario",clase);
  
  return (
    <View
    style={{
      backgroundColor: "white",
      position: "absolute",
      width: widthPercentageToDP(90),
      height:heightPercentageToDP(60),
      top: heightPercentageToDP(20),
      left:widthPercentageToDP(5),
      borderRadius:widthPercentageToDP(3),
      paddingHorizontal:widthPercentageToDP(3),
      paddingVertical:widthPercentageToDP(5),
      zIndex:9999999
      
    }}
  visible
  >
    <TouchableOpacity style={{backgroundColor:"#fff", padding:5, position:"absolute", top: heightPercentageToDP(2), right:widthPercentageToDP(2),zIndex:99999}} onPress={hideModal}>
      <MaterialCommunityIcons name='close-thick' size={32} />
    </TouchableOpacity>
    <Text style={{ fontSize:widthPercentageToDP(5),marginTop:heightPercentageToDP(5),marginBottom:heightPercentageToDP(2),fontWeight:"700"}}>Horario de la clase: {clase?.name}</Text>
    <Text style={{fontSize:widthPercentageToDP(4.5),marginBottom:heightPercentageToDP(2)}}>*Lunes: {clase?.schedule.monday ? "Hay clase":"No hay clase"}</Text>
    <Text style={{fontSize:widthPercentageToDP(4.5),marginBottom:heightPercentageToDP(2)}}>*Martes: {clase?.schedule.tuesday ? "Hay clase":"No hay clase"}</Text>
    <Text style={{fontSize:widthPercentageToDP(4.5),marginBottom:heightPercentageToDP(2)}}>*Miércoles: {clase?.schedule.wednesday ? "Hay clase":"No hay clase"}</Text>
    <Text style={{fontSize:widthPercentageToDP(4.5),marginBottom:heightPercentageToDP(2)}}>*Jueves: {clase?.schedule.thursday ? "Hay clase":"No hay clase"}</Text>
    <Text style={{fontSize:widthPercentageToDP(4.5),marginBottom:heightPercentageToDP(2)}}>*Viernes: {clase?.schedule.friday ? "Hay clase":"No hay clase"}</Text>
    </View>
  )
}

export default Horario