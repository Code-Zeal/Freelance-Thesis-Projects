import { Video,ResizeMode } from 'expo-av'
import React, { useRef, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

function PostCard({file,setModal}) {
  const [status, setStatus] = useState({})
  const video = useRef(null);
  return (
    <View  onPress={()=>setModal(true)}>
      {file?.includes(".mp4")?
      <Video
            ref={video}
            style={styles.video}
            source={{
              uri: file.includes("http")?file: `{backend-url}${file}`,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          :
         
      <Image
    source={{uri:file.includes("http")?file: `{backend-url}${file}`}}
    style={{ marginLeft:widthPercentageToDP(5),marginRight:widthPercentageToDP(5),width: widthPercentageToDP(40), height: widthPercentageToDP(50),marginVertical:widthPercentageToDP(5) }}
  ></Image>
  }
    </View>
  )
}

export default PostCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    backgroundColor: "#ffff",
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(60),
    marginRight: widthPercentageToDP(5),
    marginLeft: widthPercentageToDP(5),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
