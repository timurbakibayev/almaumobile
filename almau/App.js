import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import store from './store';
import { StackNavigator } from 'react-navigation';


import InstructionsScreen from './screens/instructions';
import WelcomeScreen from './screens/welcome';

import DrawerLeft from './components/drawerLeft';


export default class App extends React.Component {
    render() {
        const MainNavigator = StackNavigator({
            welcome: { screen: WelcomeScreen},
            instructions: { screen: InstructionsScreen},
        });

        return (
            <Provider store={store}>
                <DrawerLeft window={<MainNavigator/>}/>
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
