import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants';
import firebase from 'firebase';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { StyleSheet, Text, View } from 'react-native';
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    // Register auth state change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (user)
        this.setState({
          loggedIn: true
        });
    });
    this.setState({
      loaded: true,
    });
  }
  
  render() {
    const { loaded, loggedIn } = this.state;
    const { appContainer } = styles;
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

      let renderJSX =   <View style={appContainer}>
                          <Text>Loading...</Text>
                        </View>;
      if (loaded) {
        if (loggedIn)
          renderJSX = <View style={appContainer}>
                        <Text>User logged in!</Text>
                      </View>
        else {
          const { Navigator, Screen } = createStackNavigator();
          renderJSX = <NavigationContainer>
                        <Navigator initialRouteName="Landing">
                          <Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                          <Screen name="Register" component={Register} options={{ headerShown: false }} />
                          <Screen name="Login" component={Login} options={{ headerShown: false }}/>
                        </Navigator>
                      </NavigationContainer>
        }
      }

    
    return renderJSX;
  }
}

const styles = StyleSheet.create({
  appContainer: {
      flex: 1,
      justifyContent: 'center',
  }
});


export default App
