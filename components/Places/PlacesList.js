import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';
import {Colors} from '../../Constants/colors';

const PlacesList = ({places}) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No place added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({item}) => <PlaceItem place={item} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
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
