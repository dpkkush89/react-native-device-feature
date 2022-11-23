import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import PlaceItem from './PlaceItem';
import {Colors} from '../../Constants/colors';

const PlacesList = ({places}) => {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', {placeId: id});
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No place added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
