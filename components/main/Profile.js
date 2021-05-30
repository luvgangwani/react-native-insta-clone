import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions/authActions';

function Profile(props) {

    const { mainContainer } = styles;
    const { authUser, logOut } = props;
    const { name, email } = authUser;

    const onLogout = () => {
        // call the logout action
        logOut();
    }
    return (
        <View style={mainContainer}>
            <Text>Name: { name }</Text>
            <Text>Email: { email }</Text>
            <Button
                title="Log out"
                onPress={onLogout}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    }
  });


// get state from redux and map it to properties of this component
const mapStateToProps = (state) => ({
    authUser: state.auth.user,
});

const mapDispatchToProps = { logOut }

export default connect(mapStateToProps, mapDispatchToProps)(Profile);