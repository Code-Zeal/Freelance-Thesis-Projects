import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import templates from './templates.json';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import OpenExpressTemplate from './OpenExpressTemplate';
import SearchInput from './SearchInput';
function RequiredImageList({ route, navigation }) {
  //dependiendo del tipo se muestran algunos templates
  //contiene buscador
  const [search, setSearch] = useState("")
  const [templatesData, setTemplatesData] = useState(undefined)
  const [modal, setModal] = useState(false)
  const {product } = route.params;
  useEffect(() => {
    templates?.categories?.map((category)=>{
      category?.templates?.map((template)=>{
        if(template.reqImage){
          if(templatesData){
            setTemplatesData([...templatesData,template])
          }else{
            setTemplatesData([template])
          }
        }
        
      })
    })
  }, [])

  useEffect(() => {
    if(search !== "" && templatesData?.length > 0){
      const filteredData = templatesData?.filter(template => {
        const searchText = search?.toLowerCase();
        const nameMatch = template?.nameTemplate?.toLowerCase().includes(searchText);
        const tagsMatch = template?.tags?.some(tag => tag.toLowerCase().includes(searchText));
        return nameMatch || tagsMatch;
      });
      setTemplatesData([...filteredData]);
    }else if(search !== ""){
      let data = templatesData
      templates?.categories?.map((category)=>{
        category?.templates?.map((template)=>{
          if(template.reqImage){
            if(data){
              data = []
              data = [...data,template]
            }else{
              data = [template]
            }
          }
          
        })
      })
      const filteredData = data?.filter(template => {
        const searchText = search?.toLowerCase();
        const nameMatch = template?.nameTemplate?.toLowerCase().includes(searchText);
        const tagsMatch = template?.tags?.some(tag => tag.toLowerCase().includes(searchText));
        return nameMatch || tagsMatch;
      });
      setTemplatesData([...filteredData]);
    } else{
      let data = templatesData
      templates?.categories?.map((category)=>{
        category?.templates?.map((template)=>{
          if(template.reqImage){
            if(data){
              data = []
              data = [...data,template]
            }else{
              data = [template]
            }
          }
          
        })
      })
      setTemplatesData(data)
    }
  }, [search]);
  

  return (
    <View style={{flex:1}}>
      {!modal && 
      <SearchInput content={search} setContent={setSearch} />
    }
    {!modal &&
            <Image
            source={{uri:"data:image/png;base64,"+product}}
            style={{ marginLeft:"auto",marginRight:"auto",width: widthPercentageToDP(30), height: widthPercentageToDP(30), borderRadius:10 }}
            />
          }
      {modal ? <OpenExpressTemplate product={product} navigation={navigation} setModal={setModal} templateData={modal}/>:<ScrollView contentContainerStyle={{flexDirection:"row",flexWrap:"wrap", justifyContent:"space-around",marginVertical:5,}}>
      {templatesData?.map((templa)=>{
        return(
          <TouchableOpacity onPress={()=>{
              setModal(templa)
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

export default RequiredImageList