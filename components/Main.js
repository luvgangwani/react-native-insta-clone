import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../redux/actions/authActions';

export class Main extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        // call the logout action
        this.props.logOut();

    }
    
    render() {
        const { mainContainer } = styles;
        const { authUser } = this.props;
        const { name } = authUser;
        return (
            <View style={mainContainer}>
                <Text>Welcome { name },</Text>
                <Button
                    title="Log out"
                    onPress={this.onLogout}
                />
            </View>
        );
    }
}

// get state from redux and map it to properties of this component
const mapStateToProps = (state) => ({
    authUser: state.auth.user,
});

const mapDispatchToProps = { logOut }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
