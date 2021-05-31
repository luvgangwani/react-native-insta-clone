import { Camera } from 'expo-camera';
import React from 'react'
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'

// destructure the camera types (back camera/front camera)
const { back, front } = Camera.Constants.Type;

function Add() {
    // tracks camera permissions
    const [hasPermission, setHasPermission] = useState(null);
    // initial state is set to launch the back camera
    const [type, setType] = useState(back);

    // check that the user has granted permissions to use the Camera when component mounts
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //handler function to flip the camera
    const flipCamera = () => {
        setType(type === back ? front : back)
    }

    // rendering logic

    const { cameraContainer, camera } = styles;
    let renderJSX = <View style={{ flex: 1}}>
                        <View style={cameraContainer}>
                            <Camera
                                style={camera}
                                type={type}
                                ratio={'1:1'}
                            />
                        </View>
                        <Button
                            title="Flip"
                            onPress={flipCamera}
                        ></Button>
                    </View>;

    if (!hasPermission) renderJSX = <Text>No access to camera</Text>;

    return renderJSX;
}

export default Add;

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    camera:{
        flex: 1,
        aspectRatio: 1,
    }
});
