import React, { Component } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import firebase from 'firebase';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.onRegister = this.onRegister.bind(this);
    }
    onRegister() {
        const { name, email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            // save user to firestore database
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            const { email } = user;
            console.log(`User with ${email} registered!`);
        })
        .catch((error) => {
            const { code, message } = error;
            console.error(`Error ${code}: Message - ${message}`);
        });
    }
    render() {
        const { registerContainer, registerInput, registerButton } = styles;
        return (
            <View style={registerContainer}>
                <TextInput
                    style={registerInput}
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                    />
                <TextInput
                    style={registerInput}
                    keyboardType="email-address"
                    placeholder="Email ID"
                    onChangeText={(email) => this.setState({ email })}
                    />
                <TextInput
                    style={registerInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    /> 
                <Button
                    title="Register"
                    onPress={this.onRegister}
                    />                   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerInput: {
        marginVertical: 5,
        borderBottomColor: '#a5a58d',
        borderBottomWidth: 1,
        width: 200,
        padding: 10,
    },
})
