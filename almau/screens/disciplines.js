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
import icons from '../icons.json';

class Disciplines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {a1: false,},
            imageUrl: {a1: false,},
        };
    }

    componentDidMount() {
        this.props.load();
    }

    static navigationOptions = {
        title: 'Дисциплины',
    };

    renderSingleDisciplines({item, index}) {
        let sum = 0;
        item.subject.SubjectNameRU.split('').forEach(function (alphabet) {
            sum += alphabet.charCodeAt(0);
        });
        let random = ((sum % 100) / 100);
        let color = "#" + ('00000' + (random * (1 << 24) | 0).toString(16)).slice(-6);
        const iconName = icons[sum % icons.length].name;
        let icon = (
            <View style={{
                backgroundColor: color,
                alignItems: "center", alignContent: "center", height: 40, width: 40,
                justifyContent: "space-around",
                borderRadius: 20,
            }}>
                <Icon style={{color: "white", fontSize: 25, fontWeight: 600}} name={iconName}/>
            </View>
        );
        return (
            <Card key={item.subjectid + item.StudyGroupID}
            >
                <View style={{flexDirection: "row", flex: 1, minHeight: 80}}>
                    <View style={{width: 50}}>
                        {icon}
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableHighlight onPress={() => {
                            let expanded = this.state.expanded;
                            expanded["" + index] = true; //!this.state.expanded["" + index];
                            this.setState({expanded: expanded});
                        }}>
                            <Text style={styles.title}>{item.subject.SubjectNameRU}</Text>
                        </TouchableHighlight>
                        <Text style={styles.date}>{item.students.length} {
                            (item.students.length % 10) === 1 ? "студент" :
                                ([2, 3].includes(item.students.length % 10) ?
                                        "студента" : "студентов"
                                )
                        }</Text>
                        {item.files.map((file) => (
                            <HTMLView key={file.id} value={"<a " + file.filename + "'>"+file.description+"</a>"}/>
                        ))}
                    </View>
                </View>
            </Card>
        )
    }


    render() {
        // console.log("Disciplines:", this.props.disciplines);
        return (
            this.props.disciplines ? (<View
                    style={{flex: 1, backgroundColor: '#FAFAFA', paddingTop: 0, alignItems: "center"}}>
                    <FlatList
                        containerStyle={{marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0}}
                        style={{width: SCREEN_WIDTH}}
                        ref='listRef'
                        data={this.props.disciplines}
                        renderItem={this.renderSingleDisciplines.bind(this)}
                        keyExtractor={(item, index) => item.subjectid + item.StudyGroupID}/>
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