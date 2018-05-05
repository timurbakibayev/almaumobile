import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    TextInput,
    Image,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import {Card, ListItem, Button} from 'react-native-elements'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';

import Icon from "react-native-vector-icons/FontAwesome";
import * as Actions from '../actions/disciplines';
import Slides from '../components/slides';
import {URL} from '../api/url';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class Disciplines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {a1: false,},
        };
    }

    componentDidMount() {
        this.props.load();
    }

    static navigationOptions = {
        title: 'Дисциплины',
    };

    renderSingleDisciplines({item, index}) {
        return (
            <Card key={index}
                  style={{flexDirection: "column", flex: 1, left: 1, overflow: "hidden"}}
            >
                <TouchableHighlight onPress={() => {
                    let expanded = this.state.expanded;
                    expanded["" + index] = true; //!this.state.expanded["" + index];
                    this.setState({expanded: expanded});
                }}>
                    <Text style={styles.title}>{item.subject.SubjectNameRU}</Text>
                </TouchableHighlight>
                <Text style={styles.date}>{item.subject.SubjectID}</Text>
                <Text style={styles.title}></Text>
            </Card>
        )
    }


    render() {
        // console.log("Disciplines:", this.props.disciplines);
        return (
            this.props.disciplines.data ? (<View
                    style={{flex: 1, backgroundColor: '#FAFAFA', paddingTop: 0, alignItems: "center"}}>
                    <FlatList
                        containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}
                        style={{width: SCREEN_WIDTH}}
                        ref='listRef'
                        data={this.props.disciplines.data}
                        renderItem={this.renderSingleDisciplines.bind(this)}
                        keyExtractor={(item, index) => item.id}/>
                </View>)
                : <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        disciplines: state.disciplinesReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Disciplines);

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
    title: {
        fontSize: 15,
        fontWeight: "600"
    },
    date: {
        fontSize: 10,
        fontWeight: "300"
    },
    description: {
        marginTop: 5,
        fontSize: 14,
    },
    row: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },
});