import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import store from './store';
import { StackNavigator } from 'react-navigation';


import InstructionsScreen from './screens/instructions';
import AuthenticateScreen from './screens/authenticate';
import WelcomeScreen from './screens/welcome';

import MainMenu from './components/mainMenu';


export default class App extends React.Component {
    render() {
        const MainNavigator = StackNavigator({
            welcome: { screen: WelcomeScreen},
            instructions: { screen: InstructionsScreen},
            authenticate: { screen: AuthenticateScreen},
        });

        return (
            <Provider store={store}>
                <MainMenu window={<MainNavigator/>}/>
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
