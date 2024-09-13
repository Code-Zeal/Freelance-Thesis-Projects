import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import storage from "../../storage/user";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UpdateInfoTeacher } from "../../api/teacher";
import Toast from "react-native-toast-message";

function Perfil({ navigation, route }) {
  const [name, setName] = useState({ value: "", errors: [] });
  const [cellPhone, setCellPhone] = useState({
    value: "",
    errors: [],
  });
  const [email, setEmail] = useState({ value: "", errors: [] });
  const [isModifying, setIsModifying] = useState(false);
  const [userData, setUserData] = useState(undefined)
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false)
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
    
  if(userData){
    setName({value:userData.name,errors:[]})
    setCellPhone({value:userData.cellPhone,errors:[]})
    setEmail({value:userData.email,errors:[]})
  }
  
  }, [userData,trigger])
  
  const onModify = async () => {
    setLoading(true);
    if (name?.value?.length === 0) {
      setName({ ...name, errors: ["Se necesita un nombre para la clase"] });
      setLoading(false);
      return;
    } else {
      setName({ ...name, errors: [] });
      setLoading(false);
    }

    if (cellPhone?.value?.length === 0) {
      setLoading(false);
      setCellPhone({
        ...cellPhone,
        errors: ["Se necesita colocar el año y la sección para la clase"],
      });
      return;
    } else {
      setLoading(false);
      setCellPhone({ ...cellPhone, errors: [] });
    }

    if (email?.value?.length === 0) {
      setLoading(false);
      setEmail({
        ...email,
        errors: ["Se necesita colocar el email del representante"],
      });
      return;
    } else {
      setLoading(false);
      setEmail({ ...email, errors: [] });
    }

    if (
      name?.errors?.length > 0 ||
      cellPhone?.errors?.length > 0 ||
      email?.errors?.length > 0
    ) {
      setLoading(false);
      return;
    }

    const { status, data, error } = await UpdateInfoTeacher(
      userData.id,
      name.value,
      email.value,
      cellPhone.value
    );
    if (status !== 200) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ha ocurrido un error al modificar alumno",
      });
      setLoading(false);
      return;
    }
    storage.save({
      key: 'user',
      data,
      expires:null
    });
    setTrigger(!trigger)
    setIsModifying(false)
    Toast.show({
      type: "success",
      text1: "Correcto",
      text2: "Alumno modificado correctamente",
    });
    setLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={async()=>{
     await storage.remove({
        key: 'user',
      });
      navigation.navigate("Login")
      }} style={{position:"absolute", bottom:heightPercentageToDP(5),borderRadius:100 ,left:20,zIndex:1,backgroundColor:"#ffe652",padding:5}}>
      <MaterialCommunityIcons name='logout' color={"#000"} size={70} />
    </TouchableOpacity>
       {!isModifying? <TouchableOpacity onPress={()=>setIsModifying(true)} style={{position:"absolute", bottom:heightPercentageToDP(5),borderRadius:100 ,right:20,zIndex:1,backgroundColor:"#8c52ff",padding:5}}>
      <MaterialCommunityIcons name='account-edit' color={"#fff"} size={70} />
    </TouchableOpacity>:<TouchableOpacity onPress={()=>setIsModifying(false)} style={{position:"absolute", bottom:heightPercentageToDP(5),borderRadius:100 ,right:20,zIndex:1,backgroundColor:"#960b24",padding:5}}>
      <MaterialCommunityIcons name='cancel' color={"#fff"} size={70} />
    </TouchableOpacity>}
      {!isModifying ? (
        <ScrollView
          style={{
            flex:1,
            backgroundColor: "white",
            height: heightPercentageToDP(100),
            position: "absolute",
            width: widthPercentageToDP(100),
            top: heightPercentageToDP(0),
            
          }}
        >
          <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(10), backgroundColor:"#8c52ff",marginBottom:heightPercentageToDP(5)}}>
          <Text style={{fontSize:widthPercentageToDP(10),fontWeight:"700",marginLeft:widthPercentageToDP(3),color:"#fff"}}>
            Mi perfil
          </Text>
          </View>

          <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"700",marginLeft:widthPercentageToDP(3)}}>
            Nombre
          </Text>
          <View style={{height:heightPercentageToDP(8.5),borderWidth:2,borderBlockColor:"black",borderRadius:20, justifyContent:"center",padding:5,marginHorizontal: widthPercentageToDP(3),}}>
          <Text
            style={{ marginTop: heightPercentageToDP(0) }}
            >{name.value}</Text>
          </View>
          
          <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"700",marginLeft:widthPercentageToDP(3),marginTop:heightPercentageToDP(4)}}>
            Teléfono
          </Text>
          <View style={{height:heightPercentageToDP(8.5),borderWidth:2,borderBlockColor:"black",borderRadius:20, justifyContent:"center",padding:5,marginHorizontal: widthPercentageToDP(3)}}>
          <Text
            style={{ marginTop: heightPercentageToDP(0) }}
            >{cellPhone.value}</Text>
          </View>
          <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"700",marginLeft:widthPercentageToDP(3),marginTop:heightPercentageToDP(4)}}>
            Correo
          </Text>
          <View style={{height:heightPercentageToDP(8.5),borderWidth:2,borderBlockColor:"black",borderRadius:20, justifyContent:"center",padding:5,marginHorizontal: widthPercentageToDP(3)}}>
          <Text
            style={{ marginTop: heightPercentageToDP(0) }}
            >{email.value}</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
        style={{
          flex:1,
          backgroundColor: "white",
          height: heightPercentageToDP(100),
          position: "absolute",
          width: widthPercentageToDP(100),
          top: heightPercentageToDP(0),
          
        }}
      >
        <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(10), backgroundColor:"#8c52ff",marginBottom:heightPercentageToDP(5)}}>
        <Text style={{fontSize:widthPercentageToDP(10),fontWeight:"700",marginLeft:widthPercentageToDP(3),color:"#fff"}}>
          Mi perfil
        </Text>
        </View>

        <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"700",marginLeft:widthPercentageToDP(3)}}>
          Nombre
        </Text>
        <View style={{height:heightPercentageToDP(8.5),borderWidth:2,borderBlockColor:"black",borderRadius:20, justifyContent:"center",padding:5,marginHorizontal: widthPercentageToDP(3),}}>
        <TextInput
        onChangeText={(t)=>setName({value:t,errors:[]})}
        clearButtonMode="always"
          value={name.value}
          style={{ marginTop: heightPercentageToDP(0),borderRadius:20,backgroundColor:"#fff", }}
          />
        </View>
        
        <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"700",marginLeft:widthPercentageToDP(3),marginTop:heightPercentageToDP(4)}}>
          Teléfono
        </Text>
        <View style={{height:heightPercentageToDP(8.5),borderWidth:2,borderBlockColor:"black",borderRadius:20, justifyContent:"center",padding:5,marginHorizontal: widthPercentageToDP(3)}}>
        <TextInput
        onChangeText={(t)=>setCellPhone({value:t,errors:[]})}
        clearButtonMode="always"
          value={cellPhone.value}
          style={{ marginTop: heightPercentageToDP(0),borderRadius:20,backgroundColor:"#fff", }}
          />
        </View>
        <Text style={{fontSize:widthPercentageToDP(5),fontWeight:"700",marginLeft:widthPercentageToDP(3),marginTop:heightPercentageToDP(4)}}>
          Correo
        </Text>
        <View style={{height:heightPercentageToDP(8.5),borderWidth:2,borderBlockColor:"black",borderRadius:20, justifyContent:"center",padding:5,marginHorizontal: widthPercentageToDP(3),marginBottom:heightPercentageToDP(4)}}>
        <TextInput
        onChangeText={(t)=>setEmail({value:t,errors:[]})}
        clearButtonMode="always"
          value={email.value}
          style={{ marginTop: heightPercentageToDP(0),borderRadius:20,backgroundColor:"#fff", }}
          />
        </View>
        {!loading?
          (
         <Button  labelStyle={{fontSize:18}} loading={loading} icon="creation" style={{padding:5,width:widthPercentageToDP(80),marginLeft:widthPercentageToDP(10)}}  mode="contained" onPress={onModify}>
         Guardar Cambios
         </Button>
        )
        :
        (<TouchableOpacity disabled onPress={onModify} style={{backgroundColor:"#270185", width:widthPercentageToDP(60), marginLeft:widthPercentageToDP(20),borderRadius:20, padding:10,marginTop:heightPercentageToDP(5)}}>
        <Text style={{color:"#fff",fontSize:widthPercentageToDP(5),textAlign:"center"}}>Cargando...</Text>
      </TouchableOpacity>)
        }
      </ScrollView>
      )}
    </View>
  );
}

export default Perfil;
