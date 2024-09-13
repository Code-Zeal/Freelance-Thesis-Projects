import React, { useState } from 'react';
import { View, Image, PanResponder, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';


const ImageCompare = ({img1,img2,userId,navigation}) => {
  const [sliderPosition, setSliderPosition] = useState(150); // posición inicial del slider

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      setSliderPosition(gestureState.moveX);
    },
  });
  const uploadSelected =async (image)=>{
    let formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        name: `photo.png`,
        type: `image/Png`,
      });
      formData.append('userId', userId);
    
      // Enviar el archivo al servidor
      await fetch('{backend-url}/media/saveFile', { 
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => navigation.goBack())
      .catch((error) => {
        console.error(error);
      }); 
  }
  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, {width: sliderPosition,position: 'absolute'}]}>
        <Image
          source={img1} // reemplaza 'img1' con la URL o el recurso de tu primera imagen
          style={styles.image}
        />
        
        <Button onPress={()=>uploadSelected(img1)} title='Elegir' />
      </View>
      <View style={[styles.imageContainer, {left: sliderPosition, width: '100%', position: 'absolute'}]}>
        <Image
          source={img2} 
          style={styles.image}
        />
        <Button onPress={()=>uploadSelected(img2)} title='Elegir' />
      </View>
      <View
        {...panResponder.panHandlers}
        style={[styles.slider, {left: sliderPosition - 15}]} // el '15' aquí es la mitad del ancho del slider
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  }, image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ImageCompare;
