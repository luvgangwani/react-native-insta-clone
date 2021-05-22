import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants';
import firebase from 'firebase';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

export default function App() {
  // initialize firebase app
  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  } = Constants.manifest.extra;

  if (firebase.apps.length == 0)
    firebase.initializeApp({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    });

  const { Navigator, Screen } = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Landing">
        <Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Navigator>
    </NavigationContainer>
  );
};
