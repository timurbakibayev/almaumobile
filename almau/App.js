import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import store from './store';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import DrawerContent from './components/drawerContent';

import InstructionsScreen from './screens/instructions';
import AuthenticateScreen from './screens/authenticate';
import NotImplementedScreen from './screens/notImplemented';
import WelcomeScreen from './screens/welcome';

import MainMenu from './components/mainMenu';


export default class App extends React.Component {
    render() {
        const MainNavigator = DrawerNavigator({
            welcome: { screen: WelcomeScreen},
            instructions: { screen: InstructionsScreen},
            authenticate: { screen: AuthenticateScreen},
            news: { screen: NotImplementedScreen},
        }, {
            contentComponent: DrawerContent,
        });

        return (
            <Provider store={store}>
                <MainNavigator/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 30,
    }
});
