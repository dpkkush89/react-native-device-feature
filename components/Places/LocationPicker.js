import {Alert, StyleSheet, Text, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import {Colors} from '../../Constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import {getMapPreview} from '../../util/location';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        latitude: route.params.pickedLatitude,
        longitude: route.params.pickedLongitude,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant location access permission to use this app.',
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location Picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onTap={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onTap={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius: 4,
  },
});
