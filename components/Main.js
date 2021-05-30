import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Feed from './main/Feed';
import Add from './main/Add';
import Profile from './main/Profile';

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
                <Screen name="Add" component={Add} options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="plus-circle" color='#ffffff' size={20} />
                    )
                 }} />
                <Screen name="Profile" component={Profile} options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account-circle" color='#ffffff' size={20} />
                    )
                }}/>
            </Navigator>
        );
    }
}

export default connect()(Main);
