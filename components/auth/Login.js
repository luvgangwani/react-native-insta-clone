import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { logIn } from '../../redux/actions/authActions';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.onLogin = this.onLogin.bind(this);
    }
    onLogin() {
        const { email, password } = this.state;
        // call the login action
        this.props.logIn({ email, password });
    }
    render() {
        const { loginContainer, loginInput, loginButton } = styles;
        return (
            <View style={loginContainer}>
                <TextInput
                    style={loginInput}
                    keyboardType="email-address"
                    placeholder="Email ID"
                    onChangeText={(email) => this.setState({ email })}
                />

                <TextInput
                    style={loginInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    title="Log in"
                    onPress={this.onLogin}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginInput: {
        marginVertical: 5,
        borderBottomColor: '#a5a58d',
        borderBottomWidth: 1,
        width: 200,
        padding: 10,
    },

    loginButton: {
        marginTop: 10,
        width: 100,
    }
});

const mapDispatchToProps = { logIn };
export default connect(null, mapDispatchToProps)(Login);
