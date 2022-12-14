import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {launchCameraAsync} from 'expo-image-picker';

const ImagePicker = () => {
  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image, 'erer');
  }

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({});
