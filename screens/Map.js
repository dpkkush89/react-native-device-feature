import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

const Map = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    console.log(event);
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude: latitude,
      longitude: longitude,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map) first!',
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLatitude: selectedLocation.latitude,
      pickedLongitude: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onTap={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked LOcation"
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
