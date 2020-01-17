import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition(){
      const { granted } = await requestPermissionsAsync();  
      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        
        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadInitialPosition();
  }, []);

  if(!currentRegion){
    return null;
  }

  return <MapView initialRegion={currentRegion} style={style.map}>
    <Marker coordinate={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }}>
      <Image style={style.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/6667778?s=460&v=4'}}/>

      <Callout>
        <View style={style.callout}>
          <Text style={style.devName}>Gabriel Almeida</Text>
          <Text style={style.devBio}>Full Stack Developer - PHP, Ruby, JS</Text>
          <Text style={style.devTechs}>PHP, JS, Rails</Text>
        </View>
      </Callout>
    </Marker>
  </MapView>
}

const style = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  }
})

export default Main;