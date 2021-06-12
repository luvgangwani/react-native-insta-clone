import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firebase from 'firebase';

export default function Search({ navigation }) {
    // track the fetched users
    const [users, setUsers] = useState([]);
    const {
        parentContainer,
        searchContainer,
        searchResultsContainer,
        searchResult,
    } = styles;

    // handler for search text change
    const handleSearchTextChange = (searchText) => {
        firebase
        .firestore()
        .collection('users')
        .where('name', '>=', searchText)
        .get()
        .then((snapshot) => {
            const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(users);
        });
    };

    // handler for search result press
    const handleSearchResultPress = (id) => {
        navigation.navigate('Profile', { uid: id });
    };

    return (
        <View style={parentContainer}>
            <View style={searchContainer}>
                <TextInput
                    placeholder="Search someone..."
                    onChangeText={handleSearchTextChange}
                ></TextInput>
            </View>
            <View style={searchResultsContainer}>
                <FlatList
                    numColumns={1}
                    data={users}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={ () => handleSearchResultPress(item.id) }
                        >
                            <Text style={searchResult}>{ item.name }</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        marginTop: 40,
    },
    searchContainer: {
        marginHorizontal: 20,
    },
    searchResultsContainer: {
        flex: 1,
        margin: 20,
    },
    searchResult: {
        paddingVertical: 20,
    }
});