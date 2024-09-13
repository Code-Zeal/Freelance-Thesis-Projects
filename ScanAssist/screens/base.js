import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function BASE({route}) {
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="#8c52ff"
        barStyle={"light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
      
    </ScrollView>
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
