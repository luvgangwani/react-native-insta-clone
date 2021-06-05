import React, { useState } from 'react'
import { Button, Image, StyleSheet, TextInput, View } from 'react-native'
import firebase from 'firebase';

export default function Save({ route, navigation }) {

    // access the image uri
    const uri = route.params.image;

    // get uid of logged in user
    const uid = firebase.auth().currentUser.uid;

    // track changes to the image caption
    const [caption, setCaption] = useState('');

    // change handler for caption input text
    const handleCaptionChange = (caption) => {
        setCaption(caption);
    }

    // submit handler for save image button
    const handleSaveImage = async () => {
        // get the image blob
        const response = await fetch(uri);
        const blob = await response.blob();

        // add it to the firebase storage
        const task = firebase
                        .storage()
                        .ref()
                        .child(`post/${uid}/${Math.random().toString()}`)
                        .put(blob);
        
        // task progress callback
        const taskProgress = ({ bytesTransferred }) => {
            console.log(`Transferred ${bytesTransferred} bytes...`);
        }

        // task completed callback
        const taskCompleted = () => {
            task
            .snapshot
            .ref
            .getDownloadURL()
            .then((downloadURL) => {
                // save image details to firestore
                firebase
                .firestore()
                .collection('posts')
                .doc(uid)
                .collection('userPosts')
                .add({
                    downloadURL,
                    caption,
                    creation: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                    navigation.popToTop();
                })
                .catch(({ code, message}) => {
                    console.log(`Error uploading image - ${code}: Message - ${message}`)
                });
            });
        }

        // task error callback
        const taskError = (snapshot) => {
            console.log(snapshot);
        }

        // Eventlistener for task state change
        task.on('state_changed', taskProgress, taskError, taskCompleted);
    }

    const { saveContainer, img } = styles;
    return (
        <View style={ saveContainer }>
            <Image source={{ uri }} style={ img } />
            <TextInput
                placeholder="Write a caption..."
                onChangeText={ handleCaptionChange }
            />
            <Button
                title="Save"
                onPress={ handleSaveImage }
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    saveContainer: {
        flex: 1,
    },
    img: {
        flex: 1,
    }
});