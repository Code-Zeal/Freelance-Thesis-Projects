import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { getUserInfo, updateUserInfo } from '../api/user';
import storage from '../storage/user';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

const RatingApp = ({navigation,route}) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(undefined)
  const [userData, setUserData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [recient, setRecient] = useState(undefined)
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

  const getMyData = async ()=>{
    
    const res = await getUserInfo(userData?.id)
    
    if(res.status === 200){
      setData(res.data)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getMyData()
    }, [navigation,route,userData])
  );


  useEffect(() => {
    let timer;
    if (!showModal && (data && data.youLikeTheApp === 0 && !recient) ) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 15000);
    }else{
      return () => clearTimeout(timer);
    }
  }, [showModal,data]);

  let status = ["Por favor, selecciona una calificación para continuar.","Muy mala","Mala","Regular","Buena","Muy buena","Excelente",]

  if(true) {return (
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
        style={{backgroundColor:"#e7e7e7"}}
      
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Te gusta la app?</Text>
            <View style={{flexDirection:"row",marginVertical:heightPercentageToDP(2)}}>

              {rating >= 1 ?
              <AntDesign onPress={()=>setRating(1)} name="star" size={24} color="yellow" />
              :
              <AntDesign onPress={()=>setRating(1)} name="staro" size={24} color="yellow" />
            }
              
              {rating >= 2 ?
              <AntDesign onPress={()=>setRating(2)} name="star" size={24} color="yellow" />
              :
              <AntDesign onPress={()=>setRating(2)} name="staro" size={24} color="yellow" />
            }

              {rating >= 3 ?
              <AntDesign onPress={()=>setRating(3)} name="star" size={24} color="yellow" />
              :
              <AntDesign onPress={()=>setRating(3)} name="staro" size={24} color="yellow" />
            }

              {rating >= 4 ?
              <AntDesign onPress={()=>setRating(4)} name="star" size={24} color="yellow" />
              :
              <AntDesign onPress={()=>setRating(4)} name="staro" size={24} color="yellow" />
            }

              {rating >= 5 ?
              <AntDesign onPress={()=>setRating(5)} name="star" size={24} color="yellow" />
              :
              <AntDesign onPress={()=>setRating(5)} name="staro" size={24} color="yellow" />
            }

              {rating >= 6 ?
              <AntDesign onPress={()=>setRating(6)} name="star" size={24} color="yellow" />
              :
              <AntDesign onPress={()=>setRating(6)} name="staro" size={24} color="yellow" />
            }
              </View>
             <Text style={{marginBottom:heightPercentageToDP(3)}}>{status[rating]}</Text> 

            <Button disabled={loading || rating < 1} color={"green"} title="Calificar" onPress={async() => {
              
              setLoading(true)
              await updateUserInfo(userData.id,"youLikeTheApp",rating)
              setRecient(5)
              setLoading(false)
              Toast.show({
                type: "success",
                text1: "",
                text2: "Gracias por su valoración",
              });
              setShowModal(false)
            }} />
          </View>
        </View>
      </Modal>
  )}

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default RatingApp;