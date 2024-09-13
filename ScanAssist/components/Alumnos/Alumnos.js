import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { DataTable } from 'react-native-paper'; 
import { DeleteStudent, getAllStudent } from '../../api/student';
import NuevoAlumno from './NuevoAlumno';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import * as WebBrowser from "expo-web-browser";
import EditarAlumno from './EditarAlumno';
import storage from '../../storage/user';
import { NewClass } from '../../api/classrooms';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { NewStudent } from '../../api/student';
function Alumnos() {
  const [alumnos, setAlumnos] = useState(undefined)
  const [visible, setVisible] = useState(false);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [trigger, setTrigger] = useState(false)
  const [userData, setUserData] = useState(undefined)
  const [name, setName] = useState({value:"",errors:[]})
  const [yearAndSection, setYearAndSection] = useState({value:"",errors:[]})
  const [email, setEmail] = useState({value:"",errors:[]})
  const [image, setImage] = useState({value:"",errors:[]})
  const [loading, setLoading] = useState(false)
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
  const showModal = () => setVisible(true);
  const showModalEdit = (alumno) => setVisibleEditor(alumno);
  const hideModal = () => setVisible(false);
  const hideModalEdit = () => setVisibleEditor(false);
  const getAlumnos = async()=>{
    const {data,status} = await getAllStudent()
    if(status === 200){
      console.log(data);
      
      setAlumnos(data)
    }else{
      setAlumnos([])
    }
  } 

  
  useEffect(() => {
    if(visible === false)getAlumnos()
      
    }, [visible,trigger])
    
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
    const onCreate = async () => {
      setLoading(true);
      
      if (name?.value?.length === 0) {
        setName({ ...name, errors: ["Se necesita un nombre para el alumno"] });
        setLoading(false);
        return;
      } else {
        setName({ ...name, errors: [] });
      }
    
      if (yearAndSection?.value?.length === 0) {
        setYearAndSection({ ...yearAndSection, errors: ["Se necesita colocar el año y la sección del alumno"] });
        setLoading(false);
        return;
      } else {
        setYearAndSection({ ...yearAndSection, errors: [] });
      }

      if (email?.value?.length === 0) {
        setEmail({ ...email, errors: ["Se necesita colocar el Correo del alumno"] });
        setLoading(false);
        return;
      } else {
        setYearAndSection({ ...email, errors: [] });
      }
      
      if (image?.value?.length === 0) {
        setImage({ ...image, errors: ["Se necesita una foto del alumno"] });
        setLoading(false);
        return;
      } else {
        setImage({ ...image, errors: [] });
      }
      if (name?.errors?.length > 0 || yearAndSection?.errors?.length > 0) {
        setLoading(false);
        return;
      }
    
      try {
        const { status } = await NewStudent(name.value, email.value, image.value, yearAndSection.value);
        if (status !== 200) {
          Toast.show({ type: "error", text1: "Error", text2: "Ha ocurrido un error al crear alumno" });
        } else {
          Toast.show({ type: "success", text1: "Correcto", text2: "Alumno creado correctamente" });
          setName({value:"",errors:[]})
          setYearAndSection({value:"",errors:[]})
          setEmail({value:"",errors:[]})
          setImage({value:"",errors:[]})
          
          hideModal();
        }
      } catch (error) {
        console.error(error);
        Toast.show({ type: "error", text1: "Error", text2: "Ha ocurrido un error inesperado" });
      } finally {
        setLoading(false);
      }
    };  
  return (
    <View>
   
    <DataTable style={styles.container}> 
   
      {loading?
  <MaterialCommunityIcons name='loading' size={32} />

      : visible && <NuevoAlumno name={name} setName={setName} setYearAndSection={setYearAndSection} yearAndSection={yearAndSection} onCreate={onCreate} openCameraOrGallery={openCameraOrGallery} image={image} email={email} setEmail={setEmail} hideModal={hideModal}/>}
    {visibleEditor&& <EditarAlumno setTrigger={setTrigger}  hideModal={hideModalEdit} alumno={visibleEditor}/>}
  
    <TouchableOpacity onPress={showModal} style={{position:"absolute", bottom:heightPercentageToDP(11),borderRadius:100 ,right:20,zIndex:1,backgroundColor:"#171717"}}>
      <MaterialCommunityIcons name='plus' color={"#fff"} size={62} />
    </TouchableOpacity>
    <DataTable.Header style={styles.tableHeader}> 
      <DataTable.Title >Nombre</DataTable.Title> 
      <DataTable.Title>Año y sección</DataTable.Title> 
    </DataTable.Header> 
    {alumnos && alumnos.length > 0 ? alumnos?.map((alumno,index)=>{
      return <View key={`Alumno Item`+ index}>
        <DataTable.Row> 
      <DataTable.Cell>{alumno.name}</DataTable.Cell> 
      <DataTable.Cell>{alumno.yearAndSection}</DataTable.Cell> 
      <Menu>
      <MenuTrigger style={{alignItems:"center", justifyContent:"center", width:20, height:50}}><Entypo name="dots-three-vertical" size={24} color="black" /></MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={async() =>  await WebBrowser.openBrowserAsync("https://display-pdf-software-educativo.vercel.app/?url="+alumno?.pdfUrl,{createTask: false})} text='Obtener el carnet' />
        <MenuOption onSelect={()=>showModalEdit(alumno)} text='Editar alumno' />
        <MenuOption onSelect={async() =>{
          let {status,data,error} = await DeleteStudent(alumno?.id)
            if(status === 200){
              setTrigger(!trigger)
              return Alert.alert("Borrado correctamente")
            }else{
              return Alert.alert("Error al borrar",error)
            }
          } } >
          <Text style={{color: 'red'}}>Borrar alumno</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
    </DataTable.Row></View>
    }):alumnos && alumnos.length < 1 ? <Text style={{width:widthPercentageToDP(100),textAlign:"center",marginTop:heightPercentageToDP(20),fontSize:widthPercentageToDP(5),fontWeight:"700"}}>No se encontraron alumnos</Text>:<Text style={{width:widthPercentageToDP(100),textAlign:"center",marginTop:heightPercentageToDP(20),fontSize:widthPercentageToDP(5),fontWeight:"700"}}>Cargando...</Text>  }
    
  </DataTable> 
</View>
  )
}
const styles = StyleSheet.create({ 
  container: { 
    height:heightPercentageToDP(100),
    position:"relative",
    paddingTop: 0, 
  }, 
  tableHeader: { 
    backgroundColor: '#b59af7', 
    color:"#000"
  }, 
});
export default Alumnos