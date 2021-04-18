import React, { Component } from 'react'
import { Button, TextInput, View } from 'react-native'

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
        console.log('Register');
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                    />
                <TextInput
                    placeholder="Email ID"
                    onChangeText={(email) => this.setState({ email })}
                    />
                <TextInput
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
