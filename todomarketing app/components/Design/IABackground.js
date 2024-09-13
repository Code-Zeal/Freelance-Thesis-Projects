import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View,ImageBackground, Button, Alert, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { GenerateImage, RemoveBG } from '../../api/media';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import OpenExpressTemplate from './OpenExpressTemplate';

export default function IABackground({route,navigation}) {
  const [imageNoBg, setImageNoBg] = useState(undefined)
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imagesGenerated, setImagesGenerated] = useState(undefined)
  const [modal, setModal] = useState(undefined)
  const viewRef = useRef();
  const [status, setStatus] = useState(false)
  const { uri } = route.params;
  const removerBg = async ()=>{
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const res = await RemoveBG(fileInfo.uri)
    setImageNoBg(res.base64img)
  }

    const GenerateRandomBackgrounds = async () => {
      if(status  === false){
      setStatus(true)
        const images = await GenerateImage()
         setImagesGenerated(imagesGenerated ? [...imagesGenerated,...images]: images && images)
      setStatus(false)
      }else{
        setStatus(false)
      }
  };

  useEffect(() => {
   GenerateRandomBackgrounds()
  }, [])
  
  useEffect(() => {
  if(uri){
  removerBg()
  }
  
  }, [uri])



  if(modal){
return(
  <OpenExpressTemplate navigation={navigation} setModal={setModal} templateData={modal}/>
)
  } else{

    return (
      <View style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      >
          <Text style={{marginVertical:heightPercentageToDP(2),fontWeight:"800", marginHorizontal:widthPercentageToDP(10),fontSize:21}}>Elige el fondo de tu preferencia y presiona continuar</Text>
      <ViewShot  ref={viewRef} options={{ fileName: "Your-File-Name", format: "jpg", quality: 1 }}  style={{
        marginVertical: widthPercentageToDP(5),
        marginLeft: widthPercentageToDP(5),
                width: widthPercentageToDP(90),
                height: widthPercentageToDP(90),
                borderRadius: 10,
              }}>

      {imageNoBg ? (
        <ImageBackground
        source={{ uri: backgroundImage }}
        style={{backgroundColor:"#fff"}}
        >
         
            <Image
              source={{ uri: `data:image/png;base64,${imageNoBg}` }}
              style={{
                width: widthPercentageToDP(90),
                height: widthPercentageToDP(90),
                borderRadius: 10,
              }}
            />
        </ImageBackground>
      ) : (
        <View
          style={{
            marginTop: widthPercentageToDP(5),
            marginLeft: widthPercentageToDP(5),
            width: widthPercentageToDP(90),
            height: widthPercentageToDP(90),
            borderRadius: 10,
            backgroundColor: "gray",
          }}
        >
          <Text>Cargando imagen...</Text>
        </View>
      )}
      </ViewShot>
      {/* {backgroundImage && imageNoBg && <Button title="Descargar Imagen" onPress={downloadImage} />} */}
      <Button  color={"#32a74f"} title="Descargar y Continuar" onPress={()=>{
        viewRef.current.capture().then(async(uri) => {
              const { status } = await MediaLibrary.requestPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'No se pudo obtener permiso para acceder a la biblioteca de medios.', [{ text: 'OK' }]);
                return;
              }
          
              // Crear un asset en la biblioteca de medios
              const asset = await MediaLibrary.createAssetAsync(uri);
              const albumName = 'Imágenes Todo Marketing';
              await MediaLibrary.createAlbumAsync(albumName, asset, false);
               alert('Imagen guardada en la galería correctamente');
              setModal({
                templateImage:uri,
                nameTemplate:""
              })
          
              // Crear un álbum y agregar el asset (si no existe el álbum, se creará)
            
            });
      }}
         />

      <View style={{flexDirection:"row", flexWrap:"wrap", marginTop:widthPercentageToDP(5), justifyContent:"space-around",}}>

      {imagesGenerated?.length > 0 ? (
        imagesGenerated?.map((el) => {
          return (
            <TouchableOpacity
            onPress={()=>setBackgroundImage(el)}
              style={{
                marginVertical: widthPercentageToDP(5),
                width: widthPercentageToDP(30),
                height: widthPercentageToDP(30),
                borderRadius: 10,
                backgroundColor: "gray",
              }}
            >
              

      {el ? (
        <ImageBackground
        source={{ uri:el }}
          style={{backgroundColor:"#fff"}}
        >
         
         <Image
                source={{ uri: `data:image/png;base64,${imageNoBg}` }}
                style={{
                  width: widthPercentageToDP(30),
                  height: widthPercentageToDP(30),
                  borderRadius: 10,
                }}
              />
        </ImageBackground>
      ) : (
        <View
          style={{
            width: widthPercentageToDP(30),
            height: widthPercentageToDP(30),
            borderRadius: 10,
            backgroundColor: "gray",
          }}
        >
          <Text>Cargando imagen...</Text>
        </View>
      )}
            </TouchableOpacity>
          );
        })
      ) : (
        <></>
      )}
      </View>
      {!status ? <TouchableOpacity onPress={()=>GenerateRandomBackgrounds()} style={{backgroundColor:"#171717",padding:5, borderRadius:10, marginVertical:heightPercentageToDP(5),marginHorizontal:heightPercentageToDP(5),justifyContent:"center",alignItems:"center"}} ><Text style={{color:"#fff"}}>Cargar más</Text></TouchableOpacity>:<Text style={{marginLeft:widthPercentageToDP(10),marginRight:widthPercentageToDP(10),width: widthPercentageToDP(80), textAlign:"center",fontSize:20, fontWeight:"700"}}>Generando fondos...</Text>}
    </ScrollView>
                </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    // Asegurar que el contenido puede crecer en altura
  },
  cardsContainer: {
    // Otras configuraciones de estilo para tu contenedor de tarjetas
  },
  card: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
});