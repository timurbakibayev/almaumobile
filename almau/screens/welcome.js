import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../actions';
import Slides from '../components/slides'

const SLIDES_DATA = [
    {text: "Welcome to AlmaU", color: '#03A9F4'},
    {text: "This app is here to make your study better", color: '#009688'},
    {text: "Start your journey now", color: '#03A9F4'},
];

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
    }

    static navigationOptions = {
        title: 'Welcome',
        header: ({ navigate }) => {
            return {
                right: <Text>Settings</Text>
            }
        }
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20}}>
                <Slides data={SLIDES_DATA} onComplete = {()=>{this.props.navigation.navigate('instructions')}}/>
            </View>
        );
    }

}


function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title: {
        fontSize: 15,
        fontWeight: "600"
    },

    description: {
        marginTop: 5,
        fontSize: 14,
    }
});