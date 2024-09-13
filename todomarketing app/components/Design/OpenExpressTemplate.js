import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Modal,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
function OpenExpressTemplate({ templateData, setModal, navigation, product }) {
  const [tutorial, setTutorial] = useState(false);
  const [imageModal, setImageModal] = useState(undefined);
  const uri = templateData.templateImage;
  const downloadImage = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "images.jpg";
      const { uri: downloadedUri } = await FileSystem.downloadAsync(
        uri,
        fileUri
      );

      // Solicitar permisos para acceder a la biblioteca de medios
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "No se pudo obtener permiso para acceder a la biblioteca de medios.",
          [{ text: "OK" }]
        );
        return;
      }

      // Crear un asset en la biblioteca de medios
      const asset = await MediaLibrary.createAssetAsync(downloadedUri);

      // Crear un álbum y agregar el asset (si no existe el álbum, se creará)
      const albumName = "Plantillas TodoMarketing"; // Puedes cambiar el nombre del álbum
      await MediaLibrary.createAlbumAsync(albumName, asset, false);

      Alert.alert(
        "Éxito",
        "Imagen descargada correctamente y guardada en la galería",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al descargar la imagen", [
        { text: "OK" },
      ]);
      console.error(error);
    }
  };
  const downloadImageNoTemplate = async () => {
    try {
      const uri = templateData.templateImage;
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "No se pudo obtener permiso para acceder a la biblioteca de medios.",
          [{ text: "OK" }]
        );
        return;
      }

      // Crear un asset en la biblioteca de medios
      const asset = await MediaLibrary.createAssetAsync(uri);

      // Crear un álbum y agregar el asset (si no existe el álbum, se creará)
      const albumName = "Imágenes Todo Marketing"; // Puedes cambiar el nombre del álbum
      await MediaLibrary.createAlbumAsync(albumName, asset, false);

      Alert.alert(
        "Éxito",
        "Imagen descargada correctamente y guardada en la galería",
        [{ text: "OK" }]
      );
      alert("Image saved to gallery!");
    } catch (error) {
      console.error(error);
      alert("Failed to save image.");
    }
  };
  const viewRef = useRef();

  return (
    <Modal style={{ flex: 1,position:"relative" }}>
      {tutorial ? (
        <View style={{width:widthPercentageToDP(100),height:heightPercentageToDP(100)}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#db1a29",
              borderRadius: 100,
              padding: 8,
              alignItems: "center",
              marginVertical: 10,
              height:heightPercentageToDP(10)
            }}
            onPress={ () =>
             setTutorial(false)
            }
          >
            <AntDesign name="closecircle" size={32} color="white" />
          </TouchableOpacity>
          <Image
            source={ require('../../assets/tutorial.gif') }
            style={{width:widthPercentageToDP(90),height:heightPercentageToDP(90),marginLeft:widthPercentageToDP(5)}}
          />
        </View>
      ):(
<ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginVertical: 5,
        }}
      >
        <View
          style={{
            width: widthPercentageToDP(90),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {templateData?.nameTemplate && (
            <Text
              style={{
                width: widthPercentageToDP(80),
                fontWeight: "700",
                fontSize: 14,
              }}
            >
              Plantilla: {templateData?.nameTemplate}
            </Text>
          )}

          <TouchableOpacity
            style={{ marginLeft: "auto", marginRight: 10, marginTop: 10 }}
            onPress={() => setModal(false)}
          >
            <AntDesign name="closecircle" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <ViewShot
          ref={viewRef}
          options={{ fileName: "Your-File-Name", format: "jpg", quality: 1 }}
          style={{
            marginVertical: widthPercentageToDP(3),
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(80),
            borderRadius: 10,
          }}
        >
          {product ? (
            <ImageBackground
              source={{ uri: templateData?.templateImage }}
              style={{
                width: widthPercentageToDP(100),
                height: heightPercentageToDP(80),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: "data:image/png;base64," + product }}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: widthPercentageToDP(80),
                  height: widthPercentageToDP(100),
                  borderRadius: 10,
                }}
              />
            </ImageBackground>
          ) : (
            <ImageBackground
              source={{ uri: templateData?.templateImage }}
              style={{
                width: widthPercentageToDP(100),
                height: heightPercentageToDP(80),
              }}
            ></ImageBackground>
          )}
        </ViewShot>
        <View style={{ alignItems: "center" }}>
          {templateData?.nameTemplate && (
            <TouchableOpacity
              style={{
                backgroundColor: "#a73277",
                borderRadius: 10,
                padding: 8,
                width: widthPercentageToDP(80),
                alignItems: "center",
                marginVertical: 10,
              }}
              onPress={async () => {
                viewRef.current.capture().then(async (uri) => {
                  const { status } =
                    await MediaLibrary.requestPermissionsAsync();
                  if (status !== "granted") {
                    Alert.alert(
                      "Permiso denegado",
                      "No se pudo obtener permiso para acceder a la biblioteca de medios.",
                      [{ text: "OK" }]
                    );
                    return;
                  }

                  // Crear un asset en la biblioteca de medios
                  const asset = await MediaLibrary.createAssetAsync(uri);
                  const albumName = "Imágenes Todo Marketing";
                  await MediaLibrary.createAlbumAsync(albumName, asset, false);
                  alert("Imagen guardada en la galería correctamente");

                  // Crear un álbum y agregar el asset (si no existe el álbum, se creará)
                });
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>
                Descargar plantilla
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: "#3279a7",
              borderRadius: 10,
              padding: 8,
              width: widthPercentageToDP(80),
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={async () =>
              await WebBrowser.openBrowserAsync("https://pixlr.com/es/express/",{createTask: false})
            }
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Editar imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#a78e32",
              borderRadius: 10,
              padding: 8,
              width: widthPercentageToDP(80),
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={ () =>
             setTutorial(true)
            }
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Ver tutorial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#32a74f",
              borderRadius: 10,
              padding: 8,
              width: widthPercentageToDP(90),
              alignItems: "center",
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("NewDesignPost")}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>
              Pasar a hacer publicación
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      )
    }
    </Modal>
  );
}

export default OpenExpressTemplate;
