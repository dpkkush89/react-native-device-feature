/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {registerRootComponent} from 'expo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';
import AppLoading from 'expo-app-loading';

import IconButton from './components/UI/IconButton';
import {Colors} from './Constants/colors';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import {init} from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();
enableLatestRenderer();

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onTap={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{title: 'Add new Place'}}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
registerRootComponent(App);
