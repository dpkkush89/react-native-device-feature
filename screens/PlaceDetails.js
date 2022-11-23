import {ScrollView, StyleSheet, Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OutlinedButton from '../components/UI/OutlinedButton';
import {Colors} from '../Constants/colors';
import {fetchPlaceDetails} from '../util/database';

const PlaceDetails = ({route, navigation}) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.latitude,
      initialLng: fetchedPlace.location.longitude,
    });
  }
  const selectedPlaceID = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceID);
      setFetchedPlace(place);
      navigation.setOptions({title: place.title});
    }
    loadPlaceData();
  }, [selectedPlaceID]);
  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onTap={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
