import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from 'firebase';

import Feed from './main/Feed';
import Profile from './main/Profile';
import Search from './main/Search';

const EmptyScreen = () => (null);
export class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        const { Navigator, Screen } = createMaterialBottomTabNavigator();
        return (
            <Navigator initialRouteName="Feed" labeled={false}>
                <Screen name="Feed" component={Feed} options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color='#ffffff' size={20} />
                    )
                }} />
                <Screen
                    name="Search"
                    component={Search} options={{
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="magnify" color='#ffffff' size={20} />
                        )
                    }}
                
                />
                <Screen
                    name="AddTab"
                    component={EmptyScreen}
                    listeners={
                        ({ navigation }) => ({
                            tabPress: (event) => {
                                event.preventDefault();
                                navigation.navigate('Add')
                            }
                        })
                    }
                    options={{
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="plus-circle" color='#ffffff' size={20} />
                        )
                    }}
                />
                <Screen
                    name="Profile"
                    component={Profile}
                    listeners={
                        ({ navigation }) => ({
                            tabPress: (event) => {
                                event.preventDefault();
                                navigation.navigate('Profile', { uid: firebase.auth().currentUser.uid })
                            }
                        })
                    }
                    options={{
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="account-circle" color='#ffffff' size={20} />
                        )
                    }}
                />
            </Navigator>
        );
    }
}

export default connect()(Main);
