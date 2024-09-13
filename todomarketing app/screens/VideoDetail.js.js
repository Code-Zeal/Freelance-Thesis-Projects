import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { DeleteFile } from "../api/media";
import { Video, ResizeMode } from "expo-av";
export default function VideoDetail({ navigation, route }) {
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const {id,filePath} = route.params.video
  const showAlert = () =>
  Alert.alert(
    'Advertencia',
    'Estas seguro(a) de que quieres borrar la imagen?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Borrar',
        onPress: () => DeleteFile(id,navigation),
        style: 'delete',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
      <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: filePath,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />

        <Button onPress={showAlert} title="Borrar" color={"red"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentContainer: {
    justifyContent:"center",
    alignItems:"center"
  },
  video: {
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "#171717",
    width:widthPercentageToDP(100),
    height: heightPercentageToDP(50),
    marginRight: widthPercentageToDP(2.5),
    marginLeft: widthPercentageToDP(2.5),
    marginBottom:20
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
