import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PermissionsAndroid, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

async function requestLocationPermission() {
  try {
    const hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasLocationPermission) {
      console.log('Permiso de ubicación ya concedido');
      return;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permiso de ubicación',
        message: 'Necesitamos acceder a tu ubicación para mostrar el mapa.',
        buttonNeutral: 'Preguntar después',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permiso de ubicación concedido');
    } else {
      console.log('Permiso de ubicación denegado');
    }
  } catch (error) {
    console.error('Error al solicitar permiso de ubicación:', error);
  }
}

function GetLocation({setSelectedLocation,selectedLocation}) {

  const INITIAL_REGION = {
    latitude: 10.6483,
    longitude: -71.6258,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    
    setSelectedLocation({value:{ latitude, longitude },error:""});
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
      initialRegion={INITIAL_REGION}
      style={styles.map}
      onPress={handleMapPress}
    >
      {selectedLocation && (
        <Marker coordinate={selectedLocation} />
      )}
    </MapView>
  );
}

export default GetLocation;

const styles = StyleSheet.create({
  map: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(50),
  },
});