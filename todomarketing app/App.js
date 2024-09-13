import * as React from "react";
import AppGeneral from "./Stacks/HomeStack";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 17,
        color:"#fff"
      }}
      text2Style={{
        fontSize: 12,
        color:"#fff"
      }}
      contentContainerStyle={{
        backgroundColor:"#171717",
        borderLeftColor:"#03B97A",
        borderLeftWidth:8
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        color:"#fff"
      }}
      text2Style={{
        fontSize: 12,
        color:"#fff"
      }}
      contentContainerStyle={{
        backgroundColor:"#171717"
      }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

export default function App() {
  return (
    <>
      <AppGeneral />
      <Toast position="top"   config={toastConfig}/>
    </>
  );
}
