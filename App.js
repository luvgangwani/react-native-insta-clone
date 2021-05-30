import React, { Component } from 'react'
import Constants from 'expo-constants';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import store from './redux/store';
import Init from './Init';


export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { loaded } = this.state;
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
        renderJSX = <Init />
      }

    
    return <Provider store={store}>{renderJSX}</Provider>;
  }
}

const styles = StyleSheet.create({
  appContainer: {
      flex: 1,
      justifyContent: 'center',
  }
});

export default App
