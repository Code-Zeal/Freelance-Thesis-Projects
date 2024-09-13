import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

function AddCoverImage({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}
        style={{
          position: "absolute",
          top:140,
          right: 10,
          zIndex: 9999,
        }}  
      >
  <Ionicons name="add-circle-outline" size={50} color="black" />
   </TouchableOpacity>
  )
}

export default AddCoverImage