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
import Icon from "react-native-vector-icons/FontAwesome";
import * as Actions from '../actions';
import Slides from '../components/slides'

class Authenticate extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
    }

    static navigationOptions = {
        title: 'Авторизация',
        //tabBarIcon: ({ tintColor }) => <Icon name={"graduation-cap"} size={30} color={tintColor} />
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20, justifyContent: "center", alignItems: "center"}}>
                <Text>Авторизация</Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

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