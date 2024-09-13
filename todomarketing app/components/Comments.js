import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { AddCommentPost } from '../api/post';
import Toast from 'react-native-toast-message';
function Comments({setTrigger,setCommentStatus,comments,userData,postId}) {
  const [commentsData, setCommentsData] = useState(undefined)
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [comment, setComment] = useState("");
  const sentComment = async ()=>{
    if(comment?.length > 0){
      let aux = comment
      setComment("")
      const {data,status}=await AddCommentPost(userData?.id,postId,comment)
      if(status === 200){
        Toast.show({
          type: "success",
          text1: "",
          text2: "Comentario enviado correctamente",
        });
        setTrigger((value)=>!value)
        setCommentStatus(false)
      }else{
        Toast.show({
          type: "error",
          text1: "",
          text2: "Ha ocurrido un error al enviar el comentario",
        });
      }
    }
  }
  useEffect(() => {
    if(comments?.length > 0){
      setCommentsData(comments)
    }
  
  }, [comments])
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(0);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
    style={{ position:"absolute", zIndex:99999,width:widthPercentageToDP(100),height:heightPercentageToDP(92),bottom: keyboardOffset,backgroundColor:"#fff" }}
  >

      <TouchableOpacity onPress={()=>{
        setTrigger((value)=>!value)
        setCommentStatus(false)}} style={{height:heightPercentageToDP(8),marginRight:"auto",width:widthPercentageToDP(20),marginTop:heightPercentageToDP(2)}}>
      <MaterialCommunityIcons name="arrow-u-left-top-bold" size={45} color={"#000"} />
      </TouchableOpacity>
      <ScrollView style={{height:"auto",width:widthPercentageToDP(100),backgroundColor:"gray",marginBottom:heightPercentageToDP(10)}}>
      {commentsData?.map((comment)=>{
       return <View style={{width:widthPercentageToDP(95),height:"auto", backgroundColor:"#fff",marginVertical:5,marginLeft:widthPercentageToDP(2.5),marginRight:widthPercentageToDP(2.5),padding: 10,borderRadius:20}}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}} >
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image
          source={
            comment?.userData?.profileImage
              ? {
                  uri: `{backend-url}${comment?.userData?.profileImage}`,
                }
              : require("../assets/default.png")
            }
            style={{
              width: widthPercentageToDP(10),
              height: widthPercentageToDP(10),
              borderRadius: 1000,
            backgroundColor: "gray"
          }}
        />

        <Text style={{fontWeight:"700",fontSize:15, paddingVertical:10,paddingHorizontal:5}}>{comment?.userData?.name}</Text>

        </View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text >{ formatDistanceToNow(new Date(comment?.date), { addSuffix: true, locale: es })}</Text>
        </View>
          </View>
          <Text style={{fontSize:14,marginLeft:widthPercentageToDP(10),backgroundColor:"gray",color:"#fff", paddingVertical:10,paddingHorizontal:20,borderRadius:10}}>{comment?.text}</Text>
        </View>
      })}
      </ScrollView>
      <View style={{position: "absolute",bottom: keyboardOffset , height:heightPercentageToDP(10), width:widthPercentageToDP(100), backgroundColor:"#fff",flexDirection:"row",alignItems:"center"}}>

      <TextInput value={comment}  onChangeText={(text)=>setComment(text)} style={{width:widthPercentageToDP(80), marginLeft:widthPercentageToDP(1), padding: 5, height: heightPercentageToDP(8), borderWidth:2,borderColor:"gray",marginTop:heightPercentageToDP(1), textAlignVertical:"top"}} />

      <TouchableOpacity onPress={()=>sentComment()} style={{backgroundColor:"#fff",marginLeft:widthPercentageToDP(5),marginTop:heightPercentageToDP(1)}}><MaterialCommunityIcons name="send" size={45} color={"#000"} /></TouchableOpacity>
      </View>
  </KeyboardAvoidingView>
  )
}

export default Comments