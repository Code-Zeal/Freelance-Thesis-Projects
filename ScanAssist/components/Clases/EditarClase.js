import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { Switch } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { NewClass, UpdateClass } from '../../api/classrooms';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function EditarClase({clase,hideModal,setTrigger}) {
  console.log(clase);
  
  const [name, setName] = useState({value:clase?.name,errors:[]})
  const [yearAndSection, setYearAndSection] = useState({value:clase?.yearAndSection,errors:[]})
  const [schedule, setSchedule] = useState({"friday": clase?.schedule?.friday, "monday": clase?.schedule?.monday, "tuesday": clase?.schedule?.tuesday, "thursday": clase?.schedule?.thursday, "wednesday": clase?.schedule?.wednesday})
  const [loading, setLoading] = useState(false)

  
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
    if(name?.errors?.length > 0 || yearAndSection?.errors?.length > 0){
      setLoading(false) 
      return
    }
    console.log("algo");
    
    const {status,data,} = await UpdateClass(clase.id,name.value, yearAndSection.value,schedule)
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
    <ScrollView
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
              zIndex:9999999
            }}
            onPress={hideModal}
          >
            <MaterialCommunityIcons name="close-thick" size={32} />
          </TouchableOpacity>
      <Text style={{fontSize:24,textAlign:"center",marginTop:heightPercentageToDP(2),fontWeight:"700"}}>Editar una clase</Text>

      <TextInput
        label="Nombre de la clase"
        value={name.value}
        onChangeText={(text) => {
          if (text.length === 0 ){
            console.log("1");
            setName({value:text,errors:["Se necesita un nombre para la clase"]})
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
            setYearAndSection({value:text,errors:["Se necesita un nombre para la clase"]})
          }else{
            setYearAndSection({value:text,errors:[]})}
      }}
      />
      <HelperText type="error" visible={yearAndSection.errors?.length > 0}>
        Año y sección es obligatorio
      </HelperText>
      <Text style={{fontSize:24}}>Horario de la clase</Text>
      <Text style={{fontSize:16}}>Selecciona los dias que hay clases</Text>
      <View style={{flexDirection:"row", width:widthPercentageToDP(96),justifyContent:"space-between",marginVertical:heightPercentageToDP(2),alignItems:"center"}}>
        <Text style={{fontSize:18}}>Lunes: </Text>
        <Switch value={schedule.monday} onValueChange={(e) => setSchedule({...schedule,monday:e})} />
      </View>
      <View style={{flexDirection:"row", width:widthPercentageToDP(96),justifyContent:"space-between",marginVertical:heightPercentageToDP(2),alignItems:"center"}}>
        <Text style={{fontSize:18}}>Martes: </Text>
        <Switch
          value={schedule.tuesday}
          onValueChange={(e) => setSchedule({...schedule,tuesday:e})}
        />
      </View>
      <View style={{flexDirection:"row", width:widthPercentageToDP(96),justifyContent:"space-between",marginVertical:heightPercentageToDP(2),alignItems:"center"}}>
        <Text style={{fontSize:18}}>Miércoles: </Text>
        <Switch
          value={schedule.wednesday}
          onValueChange={(e) => setSchedule({...schedule,wednesday:e})}
        />
      </View>
      <View style={{flexDirection:"row", width:widthPercentageToDP(96),justifyContent:"space-between",marginVertical:heightPercentageToDP(2),alignItems:"center"}}>
        <Text style={{fontSize:18}}>Jueves: </Text>
        <Switch
          value={schedule.thursday}
          onValueChange={(e) => setSchedule({...schedule,thursday:e})}
        />
      </View>
      <View style={{flexDirection:"row", width:widthPercentageToDP(96),justifyContent:"space-between",marginVertical:heightPercentageToDP(2),alignItems:"center"}}>
        <Text style={{fontSize:18}}>Viernes: </Text>
        <Switch value={schedule.friday} onValueChange={(e) => setSchedule({...schedule,friday:e})} />
      </View>

      <Button  labelStyle={{fontSize:18}} loading={loading} icon="creation" style={{padding:5,}}  mode="contained" onPress={onModify}>
      Guardar cambios
    </Button>
    <HelperText style={{marginBottom:heightPercentageToDP(4),textAlign:"center"}} type="error" visible={yearAndSection.errors?.length > 0 || name?.errors?.length > 0}>
        Hay campos vacíos
      </HelperText>
      
    </ScrollView>
  );
}

export default EditarClase