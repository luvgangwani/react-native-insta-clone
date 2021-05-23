import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants';
import firebase from 'firebase';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Button, StyleSheet, Text, View } from 'react-native';
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
      user: null,
    }

    // bind functions to this context
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    // Register auth state change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (user)
        this.setState({
          loggedIn: true,
          user
        });
    });
    this.setState({
      loaded: true,
    });
  }
  
  onLogout() {
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        loggedIn: false,
        user: null,
      });
    })
    .catch((error) => {
      const { code, message } = error;
      console.error(`Error ${code}: Message - ${message}`);
    });
  }

  render() {
    const { loaded, loggedIn, user } = this.state;
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
      // when the component is not yet mounted
      let renderJSX =   <View style={appContainer}>
                          <Text>Loading...</Text>
                        </View>;
      if (loaded) {
        // load the landing page if user is not logged in
        const { Navigator, Screen } = createStackNavigator();
        renderJSX = <NavigationContainer>
                      <Navigator initialRouteName="Landing">
                        <Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                        <Screen name="Register" component={Register} options={{ headerShown: false }} />
                        <Screen name="Login" component={Login} options={{ headerShown: false }}/>
                      </Navigator>
                    </NavigationContainer>
        if (loggedIn)
          renderJSX = <View style={appContainer}>
                        <Text>User { user.email } logged in!</Text>
                        <Button
                          title="Log out"
                          onPress={this.onLogout}
                        />
                      </View>
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
