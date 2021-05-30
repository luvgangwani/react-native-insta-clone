import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

function Profile(props) {

    const { profileContainer } = styles;
    const { authUser } = props;
    const { name, email } = authUser;

    return (
        <View style={profileContainer}>
            <Text>Name: { name }</Text>
            <Text>Email: { email }</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
    }
  });


// get state from redux and map it to properties of this component
const mapStateToProps = (state) => ({
    authUser: state.auth.user,
});

export default connect(mapStateToProps, null)(Profile);
