import React, { useEffect, useState } from 'react'
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GetAllEntrepreneurships, GetEntrepreneurship } from '../api/entrepreneurship';
import storage from '../storage/user';

function SearchHome({setIsSearch,navigation}) {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState("")
  const [dataFiltered, setDataFiltered] = useState(undefined)
  const [userData, setUserData] = useState(undefined)
  const getData = async()=>{
    setLoading(true)
   let {status,data,error} = await GetAllEntrepreneurships()
    if(status === 200){
    
      
      setData(data)
    setLoading(false)
    return data
  }else{
    setLoading(false)
    return error
    }
  
  }

  useEffect(() => {
    getData()
  }, [])
  
  useEffect(() => {
    
  if(content && data){
    let filtered = data?.filter((el)=>el?.name?.includes(content))
    if(filtered){
      setDataFiltered(filtered)
    }else{
      setDataFiltered([])
    }
    
  }else{
    setDataFiltered([])
  }
  }, [data,content])
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

  return (
    <Modal animationType='fade' style={{height:heightPercentageToDP(100),width: widthPercentageToDP(100),justifyContent:"flex-start", alignItems:"center",backgroundColor:"white"}}>
      <ScrollView>
      <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(8), backgroundColor:"white",flexDirection:"row", justifyContent:"flex-end",alignItems:"center",paddingRight:widthPercentageToDP(5)}}>
      <TextInput autoFocus style={{width:widthPercentageToDP(83),borderWidth:2,borderRadius:2, borderColor:"#171717",marginRight:widthPercentageToDP(5)}} value={content} onChangeText={(text)=>setContent(text)}/>
      <TouchableOpacity onPress={()=>setIsSearch(a=>!a)} >
      <FontAwesome5 name="times" size={24} color="black" />
        </TouchableOpacity>
      </View>
        {loading?<Text>Cargando...</Text>:
        <View style={{height:heightPercentageToDP(92)}}>
          {content && dataFiltered?.length > 0 ? <View>{dataFiltered.map((el)=>{
            
            return (
              <TouchableOpacity
                onPress={async () => {
                  let data = { userData: el.User, entrepreneurshipData: el };

                  if (data.userData.id !== userData.id) {
                    navigation.navigate("EntrepreneurshipProfile", {
                      data,
                      userData,
                    });
                  } else {
                    navigation.navigate("Perfil");
                  }
                }}
                style={{
                  width: widthPercentageToDP(90),
                  height: heightPercentageToDP(10),
                  borderWidth: 3,
                  marginVertical: 10,
                  marginLeft: widthPercentageToDP(5),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  width={widthPercentageToDP(16)}
                  height={heightPercentageToDP(9)}
                  source={{
                    uri: el.User.profileImage
                      ? `{backend-url}${el.User.profileImage}`
                      : "https://i.postimg.cc/wvNbM5tp/pngwing-com.png",
                  }}
                />
                <Text style={{ marginLeft: widthPercentageToDP(2) }}>
                  {el?.name}
                </Text>
              </TouchableOpacity>
            );
          })}</View> : !content && dataFiltered?.length > 0 ? <Text>Realice una búsqueda para obtener resultado</Text>  :content && dataFiltered?.length < 1? <Text>No hay resultados para {content}</Text> : <View></View>
        }
        </View>}
        </ScrollView>
    </Modal>
  )
}

export default SearchHome