import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux';

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main';
import { verifyAuth } from './redux/actions/authActions';
import Add from './components/main/Add';



class Init extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Register the auth state change listener
        this.props.verifyAuth();
    }
    

    render() {
        // load the landing page if user is not logged in
        const { Navigator, Screen } = createStackNavigator();
        const { authUser } = this.props;
        let renderJSX =     <NavigationContainer>
                                <Navigator initialRouteName="Landing">
                                    <Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                                    <Screen name="Register" component={Register} options={{ headerShown: false }} />
                                    <Screen name="Login" component={Login} options={{ headerShown: false }}/>
                                </Navigator>
                            </NavigationContainer>;
        if (authUser) renderJSX =   <NavigationContainer>
                                        <Navigator initialRouteName="Main">
                                            <Screen name="Main" component={Main} options={{ headerShown: false }}/>
                                            <Screen name="Add" component={Add} />
                                        </Navigator>
                                    </NavigationContainer>;
        return renderJSX;
    }
}

const mapStatetoProps = (state) => ({
    authUser: state.auth.user,
});

const mapDispatchToProps = { verifyAuth }

export default connect(mapStatetoProps, mapDispatchToProps)(Init);
