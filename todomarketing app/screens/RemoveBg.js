import React, { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ImageCompare from "../components/ImageComparation";
// import CompareSlider from 'react-native-compare-slider';
export default function RemoveBg({ navigation, route }) {
  const [imageBefore, setImageBefore] = useState(undefined);
  const [imageAfter, setImageAfter] = useState(undefined);
  const RemoveBg = async ()=>{
    if (route.params.image) {
      let formData = new FormData();
      formData.append("file", {
        uri: route.params.image.uri,
        name: route.params.image.name,
        type: route.params.image.type,
      });

      await fetch("{backend-url}/media/removeBg", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let imageUri = `data:image/png;base64,${data.base64img}`;
          setImageAfter({ uri: imageUri});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  useEffect(() => {
    if (route?.params?.image) {
      setImageBefore({ uri: route.params.image.uri });
      RemoveBg()
    }
  }, [route]);

  
  

  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="#03B97A"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
        {imageAfter&&
        <ImageCompare img1={imageBefore} img2={imageAfter} userId={route.params.userId} navigation={navigation}/> }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  video: {
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "#171717",
    width: widthPercentageToDP(45),
    height: widthPercentageToDP(45),
    marginRight: widthPercentageToDP(2.5),
    marginLeft: widthPercentageToDP(2.5),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
