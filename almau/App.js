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
import NewsScreen from './screens/news';
import AnnouncementsScreen from './screens/announcements';
import DatabaseScreen from './screens/database';
import OmbudsmanScreen from './screens/ombudsman';

import MainMenu from './components/mainMenu';


export default class App extends React.Component {
    render() {
        const NewsScreenStack = StackNavigator(
            {
                MainScreen: {
                    screen: NewsScreen,
                }
            },
            {
                navigationOptions: ({ navigation }) => ({
                    initialRouteName: 'news',
                    headerMode: 'screen',
                    headerTitle: 'Новости',
                }),
            }
        );

        const AnnouncementsScreenStack = StackNavigator(
            {
                MainScreen: {
                    screen: AnnouncementsScreen,
                }
            },
            {
                navigationOptions: ({ navigation }) => ({
                    initialRouteName: 'news',
                    headerMode: 'screen',
                    headerTitle: 'Объявления',
                }),
            }
        );

        const DBScreenStack = StackNavigator(
            {
                MainScreen: {
                    screen: DatabaseScreen,
                }
            },
            {
                navigationOptions: ({ navigation }) => ({
                    initialRouteName: 'database',
                    headerMode: 'screen',
                    headerTitle: 'База знаний',
                }),
            }
        );

        const OmbudsmanScreenStack = StackNavigator(
            {
                MainScreen: {
                    screen: OmbudsmanScreen,
                }
            },
            {
                navigationOptions: ({ navigation }) => ({
                    initialRouteName: 'ombudsman',
                    headerMode: 'screen',
                    headerTitle: 'Омбудсмен AlmaU',
                }),
            }
        );

        const MainNavigator = DrawerNavigator({
            welcome: { screen: WelcomeScreen},
            instructions: { screen: InstructionsScreen},
            authenticate: { screen: AuthenticateScreen},
            news: { screen: NewsScreenStack},
            announcements: { screen: AnnouncementsScreenStack},
            database: { screen: DBScreenStack},
            ombudsman: { screen: OmbudsmanScreenStack},
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
