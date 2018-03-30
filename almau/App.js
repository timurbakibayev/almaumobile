import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import store from './store';
import { TabNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer'

import InstructionsScreen from './screens/instructions';
import WelcomeScreen from './screens/welcome';

export default class App extends React.Component {
    render() {
        const MainNavigator = TabNavigator({
            welcome: { screen: WelcomeScreen},
            instructions: { screen: InstructionsScreen},
        });

        closeControlPanel = () => {
            this._drawer.close()
        };
        openControlPanel = () => {
            this._drawer.open()
        };

        return (
            <Provider store={store}>
                <Drawer
                    type="overlay"
                    content={<ControlPanel />}
                    tapToClose={true}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    styles={drawerStyles}
                    tweenHandler={(ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}
                >
                    <WelcomeScreen />
                </Drawer>
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

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}