import React, { useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchUserPosts } from '../../redux/actions/postActions';

function Profile({ authUser, posts, fetchUserPosts }) {

    useEffect(() => {
        fetchUserPosts();
    }, []);
    const { 
        profileContainer,
        personalDetailsContainer,
        galleryContainer,
        img,
        imgContainer
    } = styles;
    const { name, email } = authUser;
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
