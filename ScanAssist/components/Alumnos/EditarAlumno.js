import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { Switch } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { NewClass } from '../../api/classrooms';
import Toast from 'react-native-toast-message';
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { UpdateInfoStudent } from '../../api/student';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function EditarAlumno({alumno,hideModal,setTrigger}) {
  const [name, setName] = useState({value:"",errors:[]})
  const [yearAndSection, setYearAndSection] = useState({value:"",errors:[]})
  const [email, setEmail] = useState({value:"",errors:[]})
  const [image, setImage] = useState({value:"",errors:[]})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    
    if(alumno){
      console.log("alumnasfsao",alumno);
      
      setYearAndSection({value:alumno.yearAndSection,errors:[]})
      setName({value:alumno.name,errors:[]})
      setEmail({value:alumno.parentEmail,errors:[]})
      setImage({value:alumno.profileImage,errors:[]})
    }
  }, [alumno])
  const hideModalEdit= ()=>{
    setName({value:"",errors:[]})
    setYearAndSection({value:"",errors:[]})
    setEmail({value:"",errors:[]})
    setImage({value:"",errors:[]})
    hideModal()
  }
  const openCameraOrGallery = async () => {
    // Mostrar un cuadro de diálogo para que el usuario elija entre cámara y galería
    Alert.alert(
      'Seleccionar fuente',
      'Elige una fuente para la imagen',
      [
        {
          text: 'Cámara',
          onPress: async () => {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
            if (permissionResult.granted === false) {
              alert('Se requiere permiso para acceder a la cámara.');
              return;
            }
  
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });
  
            if (!result.canceled) {
              setImage({value:result.assets[0].uri,errors:[]})
            } else {
              console.log('User cancelled image picker');
            }
          },
        },
        {
          text: 'Galería',
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
            if (permissionResult.granted === false) {
              alert('Se requiere permiso para acceder a la galería.');
              return;
            }
  
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });
  
            if (!result.canceled) {
              setImage({value:result.assets[0].uri,errors:[]})
            } else {
              console.log('User cancelled image picker');
            }
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  const onModify = async ()=>{
    setLoading(true)
    if (name?.value?.length === 0 ){
      setName({...name,errors:["Se necesita un nombre para la clase"]})
      setLoading(false) 
      return
    }else{
      setName({...name,errors:[]})
      setLoading(false) 
    }

    if (yearAndSection?.value?.length === 0 ){
      setLoading(false) 
      setYearAndSection({...yearAndSection,errors:["Se necesita colocar el año y la sección para la clase"]})
      return
    }else{
      setLoading(false) 
      setYearAndSection({...yearAndSection,errors:[]})
    }

    if (email?.value?.length === 0 ){
      setLoading(false) 
      setEmail({...email,errors:["Se necesita colocar el email del representante"]})
      return
    }else{
      setLoading(false) 
      setEmail({...email,errors:[]})
    }
    
    if (image?.value?.length === 0 ){
      setLoading(false) 
      setImage({...image,errors:["Se necesita colocar la imagen del alumno"]})
      return
    }else{
      
      setLoading(false) 
      setImage({...image,errors:[]})
    }

    if(name?.errors?.length > 0 || yearAndSection?.errors?.length > 0 || email?.errors?.length > 0 || image?.errors?.length > 0){
      setLoading(false) 
      return
    }

    const {status,data,error} = await UpdateInfoStudent(alumno.id,name.value,image.value,email.value, yearAndSection.value)
    if(status !== 200){
      console.log(error);
      
      Toast.show({type:"error",text1:"Error",text2:"Ha ocurrido un error al modificar alumno"})
      setLoading(false) 
      return
  }
  setTrigger((e)=>!e)
  Toast.show({type:"success",text1:"Correcto",text2:"Alumno modificado correctamente"})
  setName({value:"",errors:[]})
  setYearAndSection({value:"",errors:[]})
  setEmail({value:"",errors:[]})
  setImage({value:"",errors:[]})
  setLoading(false) 
  hideModal()
  }

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
       <TouchableOpacity style={{backgroundColor:"#fff", padding:5, position:"absolute", top: heightPercentageToDP(3),right:5}} onPress={hideModalEdit}>
        <MaterialCommunityIcons name='close-thick' size={32} />
      </TouchableOpacity>
      <Text style={{fontSize:24,textAlign:"center",marginTop:heightPercentageToDP(2),fontWeight:"700"}}>Editar alumno</Text>
     
      <Image style={{marginLeft:"auto",marginRight:"auto",marginVertical:20,borderRadius:100}} width={100} height={100} source={{uri:image?.value?image.value:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}} />
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

      <Button  labelStyle={{fontSize:18}} loading={loading} icon="creation" style={{padding:5,}}  mode="contained" onPress={onModify}>
    Guardar Cambios
    </Button>
    <HelperText style={{marginBottom:heightPercentageToDP(4),textAlign:"center"}} type="error" visible={yearAndSection.errors?.length > 0 || name?.errors?.length > 0}>
        Hay campos vacíos
      </HelperText>
      
    </View>
  );
}

export default EditarAlumno