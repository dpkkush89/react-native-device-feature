import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Colors} from '../../Constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const LoactionPicker = () => {
  function getLocationHandler() {}

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
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

export default LoactionPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
