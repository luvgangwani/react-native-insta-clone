import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';

export default function App() {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Landing">
        <Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Navigator>
    </NavigationContainer>
  );
}
