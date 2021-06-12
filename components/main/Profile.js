import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { fetchUserPosts } from '../../redux/actions/postActions';

function Profile({ authUser, posts, fetchUserPosts, route }) {

    // get the uid
    // this is done since the profile to be shown can be of the current user or a user you have searched for
    const uid = route.params.uid;

    // track user details state
    // this is to evaluate which user details are to be shown
    // load profile of the logged in user by default
    const [user, setUser] = useState(authUser);
    
    useEffect(() => {
        // if the uid of the requested users' profile does not match the logged in user
        // fetch details of the requested user and update the state
        if (uid !== firebase.auth().currentUser.uid)
            firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists) setUser(snapshot.data());
            });
        // else update the state with the logged in user
        else setUser(authUser);
        // get use posts based on uid
        fetchUserPosts(uid);
    }, [uid]);

    const { 
        profileContainer,
        personalDetailsContainer,
        galleryContainer,
        img,
        imgContainer
    } = styles;

    const { name, email } = user;
    return (
        <View style={profileContainer}>
            <View style={personalDetailsContainer}>
                <Text>{ name }</Text>
                <Text>{ email }</Text>
            </View>
            <View style={galleryContainer}>
                <FlatList
                    data={posts}
                    numColumns={3}
                    horizontal={false}
                    renderItem={ ({ item }) => (
                        <View style={imgContainer}>
                            <Image
                                style={img}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        marginTop: 40,
    },
    personalDetailsContainer: {
        margin: 20,
    },
    galleryContainer: {
        flex: 1,
    },
    imgContainer: {
        flex: 1/3,
    },
    img: {
        flex: 1,
        aspectRatio: 1/1
    },
  });


// get state from redux and map it to properties of this component
const mapStateToProps = (state) => ({
    authUser: state.auth.user,
    posts: state.posts.all,
});

const mapDispatchToProps = { fetchUserPosts }

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
