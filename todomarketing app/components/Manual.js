import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

function Manual({setManual}) {
  return (
    <Modal
      style={{
        position: "relative",
      }}
    >
      <TouchableOpacity
        onPress={() => setManual(false)}
        style={{
          top: 5,
          right: 5,
          position: "absolute",
          backgroundColor: "#cc2222",
          borderRadius: 100,
          padding: 5,
          zIndex: 99999,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.53,
          shadowRadius: 13.97,

          elevation: 21,
        }}
      >
        <AntDesign name="close" size={30} color="white" />
      </TouchableOpacity>
      <ScrollView>
        <Text
          style={{
            fontSize: widthPercentageToDP(6),
            fontWeight: "800",
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          MANUAL
        </Text>


        <Image
          source={{ uri: "https://i.postimg.cc/kMFPK8Jp/2.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#f222e4",
              width: widthPercentageToDP(30),
            }}
          >
            Manual:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Despliega el manual que estas leyendo en este momento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#000",
              width: widthPercentageToDP(30),
            }}
          >
            Tipo de cuenta:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Despliega el manual que estás leyendo en este momento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#f2ef22",
              width: widthPercentageToDP(30),
              textShadowColor:'#000',
              textShadowOffset:{width: 0, height: 0},
              textShadowRadius:5,
            }}
          >
            Siguiente:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Continua con el inicio de sesión o registro de tu cuenta.
          </Text>
        </View>



        <Image
          source={{ uri: "https://i.postimg.cc/ZnckmksS/4.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#ee1d1d",
              width: widthPercentageToDP(30),
            }}
          >
            Volver:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Vuelve a la bienvenida a la app donde puedes cambiar el tipo de cuenta.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#000",
              width: widthPercentageToDP(30),
            }}
          >
            Manual:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Despliega el manual que estás leyendo en este momento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#c41dee",
              width: widthPercentageToDP(30),
            }}
          >
            Datos:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Ingresa los datos validos para iniciar sesión en tu cuenta, también debe coincidir el tipo de cuenta a la que tratas de entrar.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#22d3f2",
              width: widthPercentageToDP(30),
            }}
          >
            Siguiente:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
           Inicia sesión en la aplicación
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "gray",
              width: widthPercentageToDP(30),
            }}
          >
            Registro:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Si aún no tienes cuenta, puedes crear una nueva completamente gratis.
          </Text>
        </View>



        <Image
          source={{ uri: "https://i.postimg.cc/g2jCCTvC/6.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#ee1d1d",
              width: widthPercentageToDP(30),
            }}
          >
            Volver:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Volver a la sección de inicio de sesión.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#000",
              width: widthPercentageToDP(30),
            }}
          >
            Datos:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Ingresa todos los datos requeridos para registrarte, dependiendo del tipo de cuenta te pedirá mas o menos datos.
          </Text>
        </View>
        

        <Image
          source={{ uri: "https://i.postimg.cc/N0SBCwSC/1.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#17d817",
              width: widthPercentageToDP(30),
            }}
          >
            Buscador:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            En esta sección podrás realizar una búsqueda de emprendimientos.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#1015dd",
              width: widthPercentageToDP(30),
            }}
          >
            Mapa:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            En este mapa puedes encontrar los emprendimientos mas cercanos a tu ubicación.
          </Text>
        </View>
        
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#ca10dd",
              width: widthPercentageToDP(30),
            }}
          >
            Manual:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Despliega el Manual que estás leyendo en este momento.
          </Text>
        </View>


        <Image
          source={{ uri: "https://i.postimg.cc/rFMcPjZT/9.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#15dd10",
              width: widthPercentageToDP(30),
            }}
          >
            Perfil:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes explorar el emprendimiento que realizó la publicación.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#1026dd",
              width: widthPercentageToDP(30),
            }}
          >
            Guardar:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes guardar la publicación para verla después en la sección de guardados.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#dd1010",
              width: widthPercentageToDP(30),
            }}
          >
            Otros:
          </Text>
          <View style={{
             marginLeft: widthPercentageToDP(3),
             width: widthPercentageToDP(65),
          }}>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
             marginVertical:5
            }}
            >
            Ubicación: Te llevará a la ubicación exacta del emprendimiento.
          </Text>
          <Text  style={{
             marginVertical:5,
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
            }}>Delivery: Te muestra el tipo de servicio de delivery que maneja el emprendimiento.</Text>
             <Text  style={{
             marginVertical:5,
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
            }}>Contacto: Te muestra las redes sociales e información de contacto del emprendimiento.</Text>
             <Text  style={{
             marginVertical:5,
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
            }}>Me gusta: Puedes demostrar tu agrado al usuario marcando la publicación con un me gusta.</Text>
             <Text  style={{
             marginVertical:5,
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
            }}>Comentarios: Puedes dejar un comentario en la publicación.</Text>
             <Text  style={{
             marginVertical:5,
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
            }}>Favorito: Puedes marcar la publicación como favorito y consultar las publicaciones favoritas en la sección de guardados.</Text>
            </View>
        </View>


        <Image
          source={{ uri: "https://i.postimg.cc/G3kdKVQz/7.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#dd1010",
              width: widthPercentageToDP(30),
            }}
          >
            Seguir:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            En la sección del perfil de otro emprendedor puedes seguir o dejarlo de seguir.
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.postimg.cc/HxbDS8Qj/10.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#102bdd",
              width: widthPercentageToDP(30),
            }}
          >
            Guardados:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            En esta sección puedes consultar las publicaciones marcadas como guardadas.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#dd1015",
              width: widthPercentageToDP(30),
            }}
          >
            Favoritos:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
             En esta sección puedes consultar las publicaciones marcadas como favoritas.
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.postimg.cc/gkg9BW6y/8.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />

        <Image
          source={{ uri: "https://i.postimg.cc/7ZRFwn9f/3.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#dd1015",
              width: widthPercentageToDP(30),
            }}
          >
            Preguntas frecuentes:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Se despliega una lista de preguntas frecuentes que puedes hacerle a la IA.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#dd10ca",
              width: widthPercentageToDP(30),
            }}
          >
            Chat con IA:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes escribir manualmente cualquier duda que tengas y la IA te responderá.
          </Text>
        </View>


        <Image
          source={{ uri: "https://i.postimg.cc/TwbGZ4Xd/12.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#26dd10",
              width: widthPercentageToDP(30),
            }}
          >
            Recomendadas:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes elegir una de las plantillas recomendadas para realizar una publicación de tu emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#dd1010",
              width: widthPercentageToDP(30),
            }}
          >
            Mi Galería:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes explorar tu galería de la aplicación en la cual puedes subir/descargar tus imágenes y videos.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#cf10dd",
              width: widthPercentageToDP(30),
            }}
          >
            Fondos IA:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            En esta sección podrás elegir la imagen de tu producto, automáticamente se eliminará el fondo con IA y podrás elegir los fondos generados con IA para tu producto, luego podrás editar la imagen y subirla.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#10b4dd",
              width: widthPercentageToDP(30),
            }}
          >
            Categorías:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes buscar la plantilla de tu preferencia por categoría.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#03B97A",
              width: widthPercentageToDP(30),
            }}
          >
            Cámara:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Sube una imagen, se borra el fondo con IA y luego puedes seleccionar una plantilla de tu preferencia.
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.postimg.cc/3xwhKRHb/16.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#8d0d62",
              width: widthPercentageToDP(30),
            }}
          >
            Descargar plantilla:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Deberás descargar la plantilla para luego editarla.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#0d148d",
              width: widthPercentageToDP(30),
            }}
          >
            Editar imagen:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes abrir un editor de imágenes y hacer las modificaciones necesarias a tu plantilla para luego publicarla.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#8d4a0d",
              width: widthPercentageToDP(30),
            }}
          >
            Ver tutorial:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes ver un pequeño tutorial del flujo de editar y subir una publicación con plantillas.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#108d0d",
              width: widthPercentageToDP(30),
            }}
          >
            Pasar a hacer publicación:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Realiza la publicación de la imagen anteriormente editada.
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.postimg.cc/qMJVLRgM/17.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#21cf1d",
              width: widthPercentageToDP(30),
            }}
          >
            Volver:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Salir del creador de publicaciones.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#151fe7",
              width: widthPercentageToDP(30),
            }}
          >
            Agregar:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Agregar imagen o video que tendrá la publicación
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#e71515",
              width: widthPercentageToDP(30),
            }}
          >
            Descripción:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Descripción de la publicación
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(30),
              color: "#f2ef22",
              width: widthPercentageToDP(30),
              textShadowColor:'#000',
              textShadowOffset:{width: 0, height: 0},
              textShadowRadius:5,
            }}
          >
            Etiquetas:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes agregar etiquetas que caractericen la publicación o el emprendimiento separadas por coma, ","
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#000",
              width: widthPercentageToDP(30),
            }}
          >
            Publicar:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Termina la publicación de la imagen o video y te redirige a tu perfil para que compruebes.
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.postimg.cc/g0nGK0S6/11.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#15e715",
              width: widthPercentageToDP(30),
            }}
          >
            Nombre:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Editar Nombre del emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#e71515",
              width: widthPercentageToDP(30),
            }}
          >
            Imagen de perfil:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Editar imagen de perfil del emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#15e7df",
              width: widthPercentageToDP(30),
            }}
          >
            Imagen de portada:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes cambiar la imagen de portada de tu perfil de emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#152be7",
              width: widthPercentageToDP(30),
            }}
          >
            Categoría:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes cambiar la categoría de tu emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#000",
              width: widthPercentageToDP(30),
            }}
          >
            Descripción:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes agregar una descripción para describir tu emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#d915e7",
              width: widthPercentageToDP(30),
            }}
          >
            Publicaciones / Videos:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes cambiar entre los tipos de publicaciones, imágenes o videos.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#b499c4",
              width: widthPercentageToDP(30),
            }}
          >
            Cerrar sesión:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Cerrar sesión de la aplicación.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "gray",
              width: widthPercentageToDP(30),
            }}
          >
            Cámara:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes realizar una publicación directamente desde tu perfil de emprendedor, dependiendo de la sección (publicaciones/videos) puedes subir imágenes o videos.
          </Text>
        </View>


        <Image
          source={{ uri: "https://i.postimg.cc/P5FjNjXf/5.jpg" }}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            marginBottom: heightPercentageToDP(5),
          }}
        />
         <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#d915e7",
              width: widthPercentageToDP(30),
            }}
          >
            Nombre:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Editar Nombre del emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#2015e7",
              width: widthPercentageToDP(30),
            }}
          >
            Imagen de perfil:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Editar imagen de perfil del emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#15e7df",
              width: widthPercentageToDP(30),
            }}
          >
            Imagen de portada:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes cambiar la imagen de portada de tu perfil de emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#000",
              width: widthPercentageToDP(30),
            }}
          >
            Convertir cuenta:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Puedes desplegar un formulario para cambiar el tipo de cuenta de cliente a emprendedor y poder disfrutar de las herramientas para impulsar tu emprendimiento.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: heightPercentageToDP(2),
          }}
        >
          <Text
            style={{
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
              marginLeft: widthPercentageToDP(3),
              color: "#2be715",
              width: widthPercentageToDP(30),
            }}
          >
            Cerrar sesión:
          </Text>
          <Text
            style={{
              fontSize: widthPercentageToDP(4),
              fontWeight: "500",
              marginLeft: widthPercentageToDP(3),
              width: widthPercentageToDP(65),
            }}
          >
            Cierras sesión de la aplicación.
          </Text>
        </View>



       


        


       


            



      </ScrollView>
    </Modal>
  );
}

export default Manual