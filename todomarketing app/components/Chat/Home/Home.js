import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import "dayjs/locale/es";
import { TalkWithIA } from "../../../api/extra";
import Toast from "react-native-toast-message";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export function Home({FAQ}) {
  function generateId() {
    let date = new Date();
    return date.getTime().toString();
  }
  const [frequentQuestions, setFrequentQuestions] = useState(false)
  const [messages, setMessages] = useState([]);

  
  const [typing, setTyping] = useState(false);
  const onTalkIA = async (text) => {
    const { status, data, error } = await TalkWithIA(text);
    if (status !== 200) {
      setTyping(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "por favor vuelve a enviar un mensaje",
      });
      return;
    }
    setTyping(false);
    return data.message;
  };
  useEffect(() => {
    setMessages([
      {
        _id: generateId(),
        text: "Hola! en que te puedo ayudar?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Consejero",
          avatar:
            "https://i.postimg.cc/tTzXn6bM/ogo-es-icono-bot-amistoso-960911-23145-removebg-preview.png",
        },
      },
    ]);
  }, []);
  const sendFAQ = (FAQ)=>{
    setMessages((previousMessages) =>GiftedChat.append(previousMessages, [{
      _id: generateId(),
      text: FAQ,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "Yo",
        avatar:
          "https://i.postimg.cc/tTzXn6bM/ogo-es-icono-bot-amistoso-960911-23145-removebg-preview.png",
      },
    }],)
    );  
    setFrequentQuestions(false)
    setTyping(true);
  responseIA(FAQ)
  }
  const responseIA = async (text)=>{
    const response = await onTalkIA(text)
  setMessages((previousMessages) =>GiftedChat.append(previousMessages, [{
    _id: generateId(),
    text: response,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Consejero",
      avatar:
        "https://i.postimg.cc/tTzXn6bM/ogo-es-icono-bot-amistoso-960911-23145-removebg-preview.png",
    },
  }],)
  );  
  }
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, messages)
  );
  setTyping(true);
  responseIA(messages[0].text)
}, []);
  return (
    <View style={{ flex: 1,paddingTop:heightPercentageToDP(17) }}>
      <TouchableOpacity
        onPress={() => setFrequentQuestions(!frequentQuestions)}
        style={{
          width: widthPercentageToDP(20),
          height: widthPercentageToDP(20),
          position: "absolute",
          top: heightPercentageToDP(2.5),
          left: widthPercentageToDP(5),
          zIndex: 99999,
          backgroundColor: "#fff",
          padding: 5,
          borderRadius: 1000,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/666/666991.png",
          }}
          style={{
            width: widthPercentageToDP(14),
            height: widthPercentageToDP(14),
          }}
        ></Image>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#148878",
          width: widthPercentageToDP(95),
          height: widthPercentageToDP(25),
          position: "absolute",
          top: heightPercentageToDP(1),
          left: widthPercentageToDP(2.5),
          zIndex: 9999,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginLeft: "auto",
            marginRight: 18,
            marginTop: widthPercentageToDP(8),
            color: "white",
          }}
        >
          Preguntas frecuentes
        </Text>
      </View>

      {frequentQuestions ? (
        <View
          style={{
            backgroundColor: "#148878",
            width: widthPercentageToDP(95),
            height: heightPercentageToDP(55),
            position: "absolute",
            top: widthPercentageToDP(27),
            left: widthPercentageToDP(2.5),
            zIndex: 9999,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopColor: "#171717",
            borderTopWidth: 2,
            padding: 10,
            flexWrap:"wrap"
          }}
        >
          {FAQ?.map((FQ,index)=>{
            return (<TouchableOpacity key={`FAQ`+ index}
              onPress={()=>sendFAQ(FQ.send)}
                style={{
                  width: widthPercentageToDP(25),
                  height: widthPercentageToDP(50),
                  
                }}
              >
                <Image
                  source={FQ.image}
                  style={{
                    width: widthPercentageToDP(25),
                    height: widthPercentageToDP(25),
                    borderRadius: 1000,
                 backgroundColor:"#FFF"
                  }}
                ></Image>
                <Text
                  style={{
                    width: widthPercentageToDP(25),
                    color: "white",
                    fontSize: 10,
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  {FQ.text}
                </Text>
              </TouchableOpacity>)
          })}
        </View>
      ) : (
        false
      )}
      <GiftedChat
        
        onInputTextChanged={() => setFrequentQuestions(false)}
        isTyping={typing}
        locale={"es"}
        placeholder="Escribe un mensaje..."
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
