import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import firebase from 'firebase';

export default function Search() {
    // track the fetched users
    const [users, setUsers] = useState([]);
    const {
        parentContainer,
        searchContainer,
        searchResultsContainer
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
                        <Text>{ item.name }</Text>
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
    }
});