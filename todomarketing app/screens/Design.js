import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import DesignSlider from "../components/DesignSlider";
import DesignMainButtons from "../components/DesignMainButtons";
import DesignIcon from "../components/DesignIcon";
import DesignCamera from "../components/DesignCamera";
import OpenExpressTemplate from "../components/Design/OpenExpressTemplate";
export default function Design({ navigation, route }) {
  const [modal, setModal] = useState(false)
  const [product, setProduct] = useState(undefined)

  const dataIcons = [
    {
      title: "Logos",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/xdFwDd57/logo.jpg",
      params: {type:"Logos"},
    },
    {
      title: "Poster",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/pdgsJ5q2/posters.jpg",
      params: {type:"Poster"},
    },
    {
      title: "Avisos",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/7ZqRcz3X/avisos.jpg",
      params: {type:"Avisos"},
    },
    {
      title: "Menus",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/SQ5x7Spg/image.jpg",
      params: {type:"Menus"},
    },
    {
      title: "Ofertas",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/W4rHK7DD/image-1.jpg",
      params: {type:"Ofertas"},
    },
    {
      title: "Catálogos",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/252ZCsLg/catalogos.jpg",
      params: {type:"Catálogos"},
    },
    
    {
      title: "Folletos",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/KcgD5YMz/folletos.jpg",
      params: {type:"Folletos"},
    },{
      title: "Tarjetas",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/QtZdGS0v/tarjetas.jpg",
      params: {type:"Tarjetas"},
    },{
      title: "Flyers",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/FsTzdyHJ/image-2.jpg",
      params: {type:"Flyers"},
    },
    {
      title: "Collage",
      screen: "GenerateImageTemplate",
      logo: "https://i.postimg.cc/nrP8ZhnM/image-3.jpg",
      params: {type:"Collage"},
    },
    
  ];
  return (
    <View style={styles.container}>
      {modal && <OpenExpressTemplate product={product} navigation={navigation} setModal={setModal} templateData={modal}/>}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 8,
          left: widthPercentageToDP(30),
          right: widthPercentageToDP(30),
          zIndex: 9999,
          width: widthPercentageToDP(40),
          height: widthPercentageToDP(32),
        }}
      >
        <DesignCamera navigation={navigation}/>
      </TouchableOpacity>
      <View style={{ height: heightPercentageToDP(35) }}>
        <DesignSlider setProduct={setProduct} setModal={setModal} />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 2,
            height: 2,
            width: widthPercentageToDP(100),
          }}
        />
        <DesignMainButtons navigation={navigation} />
      </View>
        
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          height: heightPercentageToDP(150),
          width: widthPercentageToDP(100),
        }}
        style={{
          backgroundColor: "#ecf0f1",
          marginTop: 15,
        }}
      >
        <StatusBar
          animated={false}
          backgroundColor="#03B97A"
          barStyle={"light-content"}
          showHideTransition={"none"}
          hidden={false}
        />

        {dataIcons?.map((icon) => {
          return <DesignIcon icon={icon} navigation={navigation} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: heightPercentageToDP(100),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  container: {
    flex: 1,
    height: "auto",
    backgroundColor: "#ecf0f1",
  },
});
