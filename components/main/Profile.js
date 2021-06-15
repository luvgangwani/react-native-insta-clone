import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { fetchUserPosts } from '../../redux/actions/postActions';
import { logOut } from '../../redux/actions/authActions';
import { registerFetchListenerForUserFollowing } from '../../redux/actions/';

function Profile({ authUser, posts, fetchUserPosts, route, logOut, registerFetchListenerForUserFollowing, following }) {

    // get the uid
    // this is done since the profile to be shown can be of the current user or a user you have searched for
    const uid = route.params.uid;

    // track user details state
    // this is to evaluate which user details are to be shown
    // load profile of the logged in user by default
    const [user, setUser] = useState(authUser);

    // track if the loaded profile is followed by the current user
    const [isFollowing, setIsFollowing] = useState(false);

    // handler function for Logout button
    const handleLogout = () => {
        logOut();
    };

    // handler function for Follow button
    const handleFollow = () => {
        firebase
        .firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(uid)
        .set({});
    };

    // handler function for Following button
    const handleFollowing = () => {
        firebase
        .firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(uid)
        .delete();
    };

    // run this once when the component mounts
    useEffect(() => {
        // register a listener to update the array that lists the users the logged in user is following
        registerFetchListenerForUserFollowing();
    }, []);
    
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

        // update the isFollowing to true if the logged in user follows the loaded profile
        if (following && following.includes(uid)) setIsFollowing(true);
        else setIsFollowing(false);
    }, [uid, following]);

    const personalDetailsSibling = () => {
        let elReturn = null;
        // check that the current use is not null
        // Refer https://stackoverflow.com/a/59601773
        if (firebase.auth().currentUser) {
            if (uid === firebase.auth().currentUser.uid)
                elReturn = <Button
                            title="Logout"
                            onPress={ handleLogout }></Button>;
            else {
                if (isFollowing)
                    elReturn = <Button
                                title="Following"
                                onPress={ handleFollowing }></Button>;
                else
                    elReturn = <Button
                                title="Follow"
                                onPress={ handleFollow }
                                ></Button>;
            }
        }
        return elReturn;
    }

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
            { personalDetailsSibling() }
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
        marginTop: 20,
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
    following: state.following.all,
});

const mapDispatchToProps = { fetchUserPosts, logOut, registerFetchListenerForUserFollowing }

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
