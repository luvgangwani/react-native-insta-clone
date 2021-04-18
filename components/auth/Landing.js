import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

export default function Landing({ navigation }) {
    const { landing } = styles;
    return (
        <View style={landing}>
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')} />
            <Button
            title="Login"
            onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

const styles = StyleSheet.create({
    landing: {
        flex: 1,
        justifyContent: 'center',
    }
});
