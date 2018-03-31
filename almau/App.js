import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import store from './store';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer'

import InstructionsScreen from './screens/instructions';
import WelcomeScreen from './screens/welcome';
import DrawerContent from './components/drawerContent';

let drawer = null;

export default class App extends React.Component {
    render() {
        const MainNavigator = StackNavigator({
            welcome: { screen: WelcomeScreen},
            instructions: { screen: InstructionsScreen},
        });
        let closeDrawer = () => {
            //this._drawer.close()
            //this.context.drawer.close()
            drawer.close()
        };

        return (
            <Provider store={store}>
                <Drawer
                    ref={(ref) => drawer = ref}
                    type="overlay"
                    content={(
                        <DrawerContent closeDrawer={closeDrawer}/>
                    )}
                    tapToClose={true}
                    panOpenMask={0.1}
                    openDrawerOffset={0.4}
                    panCloseMask={0.2}
                    closedDrawerOffset={3}
                    styles={drawerStyles}
                    tweenHandler={(ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}
                >
                    <Text/>
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