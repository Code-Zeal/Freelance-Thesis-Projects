import React from 'react'
import { Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';

function AddProfileImage() {
  return (
    <TouchableOpacity
        style={{
          position: "absolute",
          top:100,
          left: 100,
          zIndex: 9999,
        }}  
      >
  <Ionicons name="add-circle-outline" size={28} color="black" />
   </TouchableOpacity>
  )
}

export default AddProfileImage