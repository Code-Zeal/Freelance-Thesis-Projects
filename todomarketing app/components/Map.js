import React, { useEffect, useState } from 'react';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { PermissionsAndroid, StyleSheet, } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { GetAllEntrepreneurships } from '../api/entrepreneurship';
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
      // Aquí puedes iniciar la obtención de la ubicación
    } else {
      console.log('Permiso de ubicación denegado');
    }
  } catch (error) {
    console.error('Error al solicitar permiso de ubicación:', error);
  }
  
}
function Map() {
  const INITIAL_REGION = {
    latitude: 10.6483,
    longitude: -71.6258,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2
  };
  const [markers, setMarkers] = useState(undefined)
    const getMyMarkers = async()=>{
      const {status,data,error} = await GetAllEntrepreneurships()
      if(status === 200){
        let branches = []
        data.map((entrepreneurship)=>{
          entrepreneurship?.branches?.map((branch)=>{
            branches.push(branch)
            return branch
          }) 
          return entrepreneurship
        })
        setMarkers(branches)
      }else{
        console.log("error:",error);
      }
    }
    
    useEffect(() => {
        getMyMarkers()
        requestLocationPermission()
    }, [])
  return (
    <MapView
    provider={PROVIDER_GOOGLE}
    showsUserLocation
    showsMyLocationButton

    initialRegion={INITIAL_REGION}
    style={styles.map}
  >
    {markers && markers?.map((marker,index)=>{
      return <Marker key={`marker${index}`}
      title={marker.name}
      coordinate={marker.location}  />
    })}
  </MapView>
  )
}

export default Map
const styles = StyleSheet.create({
  map: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(30),
  },
});