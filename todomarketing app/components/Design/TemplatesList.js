import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import templates from './templates.json';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import OpenExpressTemplate from './OpenExpressTemplate';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RemoveBG } from '../../api/media';
import SearchInput from './SearchInput';
function TemplatesList({ route, navigation }) {
  //dependiendo del tipo se muestran algunos templates
  //contiene buscador
  const [search, setSearch] = useState("")
  const [templatesData, setTemplatesData] = useState(undefined)
  const [modal, setModal] = useState(false)
  const [product, setProduct] = useState(undefined)
  const { type } = route.params;
  useEffect(() => {
    let temp = templates.categories.find((el)=>el.categoryName === type)
    setTemplatesData(temp)
  }, [type])

  const openMedia = async (type) => {
    let permissionResult;
    let result;

    if (type === 'gallery') {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Se requieren permisos para acceder a la galería.');
        return null;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    } else if (type === 'camera') {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Se requieren permisos para acceder a la cámara.');
        return null;
      }

      result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });
    }

    if (!result.canceled) {
      return result.assets[0].uri;
    } else {
      return null;
    }
  };

  const handleSelectImage = (templa) => {
    Alert.alert(
      "Seleccionar Imagen",
      "Elige una opción",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cámara",
          
          onPress: async () => {
            const uri = await openMedia('camera');
            if(uri){
                const fileInfo = await FileSystem.getInfoAsync(uri);
                const res = await RemoveBG(fileInfo.uri)
              setProduct(res.base64img)
              setModal(templa)
            }
          },
          
        },
        {
          text: "Galería",
          onPress: async () => {
            const uri = await openMedia('gallery');
            if(uri){
              const fileInfo = await FileSystem.getInfoAsync(uri);
              const res = await RemoveBG(fileInfo.uri)
              setProduct(res.base64img)
              setModal(templa)
            }
          }
        },
        
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if(search){
      const filteredData = templatesData?.templates?.filter(template => {
        const searchText = search?.toLowerCase();
        const nameMatch = template?.nameTemplate?.toLowerCase().includes(searchText);
        const tagsMatch = template?.tags?.some(tag => tag.toLowerCase().includes(searchText));
        return nameMatch || tagsMatch;
      });
      setTemplatesData({...templatesData,templates:filteredData});
    }else{
      let temp = templates.categories.find((el)=>el.categoryName === type)
      setTemplatesData(temp)
    }
  }, [search]);
  

  return (
    <View style={{flex:1}}>
      {!modal&&<SearchInput content={search} setContent={setSearch} />}
      {modal ? <OpenExpressTemplate product={product} navigation={navigation} setModal={setModal} templateData={modal}/>:<ScrollView contentContainerStyle={{flexDirection:"row",flexWrap:"wrap", justifyContent:"space-around",marginVertical:5,}}>
      {templatesData?.templates?.map((templa)=>{
        return(
          <TouchableOpacity onPress={()=>{
            if(templa?.reqImage){
              handleSelectImage(templa)
            }else{
              setProduct("")
              setModal(templa)
            }
            }} style={{marginBottom:widthPercentageToDP(5)}} >
            <Image
           source={{uri:templa?.previewImage}}
            style={{
              width: widthPercentageToDP(45),
              height: widthPercentageToDP(45),
              borderRadius:10,
            backgroundColor: "gray"
          }}
        />
          </TouchableOpacity>
        )
      })}
    </ScrollView>}
    
    </View>
  )
}

export default TemplatesList