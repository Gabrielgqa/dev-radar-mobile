import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import '../services/api';

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
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

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: 'PHP'
      }
    });

    setDevs(response.data);
  }

  if(!currentRegion){
    return null;
  }

  return (
  <>
  <MapView initialRegion={currentRegion} style={style.map}>
    <Marker coordinate={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }}>
      <Image style={style.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/6667778?s=460&v=4'}}/>

      <Callout onPress={() => {
        navigation.navigate('Profile', { git_username: 'GabrielGQA' })
      }}>
        <View style={style.callout}>
          <Text style={style.devName}>Gabriel Almeida</Text>
          <Text style={style.devBio}>Full Stack Developer - PHP, Ruby, JS</Text>
          <Text style={style.devTechs}>PHP, JS, Rails</Text>
        </View>
      </Callout>
    </Marker>
  </MapView>

  <View style={style.searchForm}>
      <TextInput
        style={style.searchInput}
        placeholder="Buscar devs por tecnologia..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity onPress={() => {}} style={style.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#FFF" />
      </TouchableOpacity>

  </View>
  </>
  );
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
  },

  searchForm: {
    position: "absolute",
    top: 20,
    right: 20,
    left: 20,
    zIndex: 5,
    flexDirection: "row",
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  }
})

export default Main;