import { Camera } from 'expo-camera';
import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// destructure the camera types (back camera/front camera)
const { back, front } = Camera.Constants.Type;

function Add() {
    // tracks camera permissions
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    // track image picker permissions
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    // track the camera type (back camera/front camera)
    // initial state is set to launch the back camera
    const [type, setType] = useState(back);
    // track if the camera reference is set
    const [camera, setCamera] = useState(null);
    // track the image uri
    const [image, setImage] = useState(null);

    // check that the user has granted permissions to use the Camera and Image picker when component mounts
    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await Camera.requestPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    //handler function to flip the camera
    const flipCamera = () => {
        setType(type === back ? front : back)
    };

    // handler function to take a picture
    const takePicture = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync(null);
            setImage(uri);
        }
    };

    // handler function to pick an image from your device
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled)
            setImage(result.uri);
    }

    // rendering logic

    const { cameraContainer, camera: camStyle } = styles;
    let renderJSX = <View style={{ flex: 1}}>
                        <View style={cameraContainer}>
                            <Camera
                                ref = {(ref) => setCamera(ref)}
                                style={camStyle}
                                type={type}
                                ratio={'1:1'}
                            />
                        </View>
                        <Button
                            title="Flip"
                            onPress={flipCamera}
                        ></Button>
                        <Button
                            title="Take picture"
                            onPress={takePicture}
                        ></Button>
                        <Button
                            title="Pick image"
                            onPress={pickImage}
                        ></Button>
                        { image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
                    </View>;

    if (!hasCameraPermission || !hasGalleryPermission) renderJSX = <Text>No access to camera</Text>;

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
