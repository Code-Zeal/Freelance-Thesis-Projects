import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { Switch } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function NuevoAlumno({hideModal,name,setName,yearAndSection,setYearAndSection,onCreate,email,setEmail,image,openCameraOrGallery}) {

  return (
    <View
    style={{
      backgroundColor: "white",
      position: "absolute",
      width: widthPercentageToDP(100),
      top: heightPercentageToDP(0),
      paddingHorizontal:widthPercentageToDP(2),
      zIndex:9999999
      
    }}
  visible
  >
       <TouchableOpacity style={{backgroundColor:"#fff", padding:5, position:"absolute", top: heightPercentageToDP(3),right:5,zIndex:99999}} onPress={hideModal}>
        <MaterialCommunityIcons name='close-thick' size={32} />
      </TouchableOpacity>
      <Text style={{fontSize:24,textAlign:"center",marginTop:heightPercentageToDP(2),fontWeight:"700"}}>Agregar nuevo alumno</Text>
     
      <Avatar.Image style={{marginLeft:"auto",marginRight:"auto",marginVertical:20}} size={100} source={{uri:image?.value?image?.value:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}} />
      <HelperText style={{marginLeft:"auto",marginRight:"auto",marginBottom:heightPercentageToDP(2)}} type="error" visible={image?.errors?.length > 0}>
        La imagen es obligatoria
      </HelperText>
      <Button  labelStyle={{fontSize:widthPercentageToDP(5)}}  icon="file" style={{marginLeft:"auto",marginRight:"auto",width:widthPercentageToDP(80)}}  mode="contained" onPress={openCameraOrGallery}>
      Seleccionar imagen
    </Button>

      <TextInput
        label="Nombre"
        value={name.value}
        onChangeText={(text) => {
          if (text.length === 0 ){
            console.log("1");
            setName({value:text,errors:["Se necesita un nombre para el alumno"]})
            return
          }else{
            setName({value:text,errors:[]})}
      }}
        style={{marginTop:heightPercentageToDP(4)}}
      />
      <HelperText type="error" visible={name?.errors?.length > 0}>
        El nombre es obligatorio
      </HelperText>

      <TextInput
        label="Año y sección"
        value={yearAndSection.value}
        onChangeText={(text) => {
          if (text.length === 0 ){
            setYearAndSection({value:text,errors:["Se necesita el año y sección"]})
          }else{
            setYearAndSection({value:text,errors:[]})}
      }}
      />
      <HelperText type="error" visible={yearAndSection.errors?.length > 0}>
        Año y sección es obligatorio
      </HelperText>
     
      <TextInput
        label="Correo del representante"
        value={email.value}
        onChangeText={(text) => {
          if (text.length === 0 ){
            setEmail({value:text,errors:["Se necesita un correo"]})
          }else{
            setEmail({value:text,errors:[]})}
      }}
      />
      <HelperText type="error" visible={yearAndSection.errors?.length > 0}>
        Año y sección es obligatorio
      </HelperText>

      <Button  labelStyle={{fontSize:18}}  icon="creation" style={{padding:5,}}  mode="contained" onPress={onCreate}>
    Agregar Alumno
    </Button>
    <HelperText style={{marginBottom:heightPercentageToDP(4),textAlign:"center"}} type="error" visible={yearAndSection.errors?.length > 0 || name?.errors?.length > 0}>
        Hay campos vacíos
      </HelperText>
      
    </View>
  );
}

export default NuevoAlumno