import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/actions/';
import firebase from 'firebase';

export class Main extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    onLogout() {
        console.log('Attempting to log out...');
        firebase.auth().signOut()
        .catch((error) => {
          const { code, message } = error;
          console.error(`Error ${code}: Message - ${message}`);
        });
      }
    
    render() {
        const { mainContainer } = styles;
        const { loggedInUser } = this.props;
        console.log(loggedInUser);
        return (
            <View style={mainContainer}>
                <Button
                    title="Log out"
                    onPress={this.onLogout}
                />
            </View>
        );
    }
}

// get state from redux and map it to properties of this component
const mapStateToProps = (state) => ({
    loggedInUser: state.auth.user,
});

const mapDispatchProps = { fetchUser };

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    }
  });

export default connect(mapStateToProps, mapDispatchProps)(Main);
