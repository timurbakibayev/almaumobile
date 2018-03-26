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

import * as Actions from '../actions'; //Import your actions

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20}}>
                <Text>Welcome to AlmaU!</Text>
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