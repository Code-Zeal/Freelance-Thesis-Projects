import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Map from '../components/Map';
import Discover from '../components/Discover';
import Comments from '../components/Comments';
import RatingApp from '../components/RatingApp';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import SearchHome from '../components/SearchHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Manual from '../components/Manual';
import storage from '../storage/user';



export default function Home({navigation,route}) {
  const STYLES = ["default", "dark-content", "light-content"];
  const [commentStatus, setCommentStatus] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [manual, setManual] = useState(false)
  const [userData, setUserData] = useState(undefined)
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
    if(userData !== undefined && !userData?.email && !userData.name){
      Toast.show({type:"info",text1:"Inicia sesión para continuar"})
      setLoading(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Welcome",
            },
          ],
        })
      );
    }else{
      return
    }

  }, [userData])
  return (
    <View style={{flex:1}}>
      {manual && <Manual setManual={setManual}/>}
      {isSearch&&
        <SearchHome navigation={navigation} setIsSearch={setIsSearch}/>
      }
      <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(8), backgroundColor:"white",flexDirection:"row", justifyContent:"flex-end",alignItems:"center",paddingRight:widthPercentageToDP(5)}}>
         
        <TouchableOpacity onPress={()=>setIsSearch(a=>!a)}>
      <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>setManual(true)}  style={{width:widthPercentageToDP(25),height:widthPercentageToDP(25),position:"absolute", right:widthPercentageToDP(2),bottom:heightPercentageToDP(2), backgroundColor:"#fff",justifyContent:"center",alignItems:"center", borderRadius:100,borderColor:"#003D27",borderWidth:4,zIndex:99999}}>
        <MaterialCommunityIcons name="book-information-variant" size={30} color="black" />
        <Text style={{fontSize:widthPercentageToDP(4),fontWeight:"800"}}>Manual</Text>
        </TouchableOpacity>
      <RatingApp navigation={navigation} route={route}/>
{commentStatus !== false && <Comments setTrigger={setTrigger} setCommentStatus={setCommentStatus} comments={commentStatus.comments} userData={commentStatus.userData} postId={commentStatus.postId} fetchUserData={commentStatus.fetchUserData} />}
    <ScrollView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={STYLES[2]}
        showHideTransition={"none"}
        hidden={false}
      />
      <Map/>
      <Discover trigger={trigger} setCommentStatus={setCommentStatus} navigation={navigation} route={route} />
    </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  main:{
    height:heightPercentageToDP(100),
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"stretch"
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
});
