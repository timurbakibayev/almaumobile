import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    Dimensions,
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Actions from '../actions';
import Slides from '../components/slides'

class DrawerContent extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    };

    constructor(props) {
        super(props);
        this.state = {text:"Content of a drawer"};
    }

    componentDidMount() {
    }
    render() {
        console.log(this.props);
        return (
            <View style={styles}>
                <TouchableHighlight onPress={()=>{
                    //this.props.closeDrawer();
                    //this.setState({text:"111"});
                    //this.props.navigation.navigate('instructions')
                    this.navigateToScreen('instructions');
                }}><Text>{this.state.text}</Text></TouchableHighlight>
            </View>
        );
    }

}

styles = {
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
};


function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
