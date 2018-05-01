import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ScrollView,
    Text,
    TextInput,
    ActivityIndicator,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import {Card, ListItem, Button} from 'react-native-elements'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';

import Icon from "react-native-vector-icons/FontAwesome";
import * as Actions from '../actions/database';
import Slides from '../components/slides';
import {URL} from '../api/url';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let self = null;

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {a1: false,},
            content: "",
        };
        self = this;
    }

    componentDidMount() {
        this.props.load();
    }

    static navigationOptions = {
        title: 'База знаний',
        headerLeft: (
            <TouchableHighlight onPress={() => {
                self.setState({content: ""});
            }}>
                <View>
                    <Text>  </Text>
                    <Icon style={{marginLeft: 10}} name={'chevron-left'}/>
                    <Text>   </Text>
                </View>
            </TouchableHighlight>),
    };

    renderSingleDB({item, index}) {
        return (
            <View style={{
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingLeft: 1,
                paddingRight: 5,
                paddingTop: 10,
                paddingBottom: 10,
                overflow: "hidden",
            }}>
                <TouchableHighlight onPress={() => {
                    let expanded = this.state.expanded;
                    expanded["" + index] = true; //!this.state.expanded["" + index];
                    this.setState({expanded: expanded});
                }
                }>
                    <View style={{
                        borderLeftWidth: 5,
                        borderLeftColor: item._type.color,
                    }}
                    >
                        <Text style={styles.title}>{item._type.id}. {item._type.title}</Text>
                        <Text style={styles.date}>{item._source.updated_at}</Text>
                        <Text style={styles.date}>{item._source.user.fullname}</Text>
                        <Text style={styles.title}></Text>
                        {item._source.attachments && item._source.attachments.map((attachment) => {
                            return (
                                <TouchableHighlight key={attachment.name + item._type.title} onPress={() => {
                                    this.setState({content: attachment.attachment.content});
                                }
                                }><Text>{attachment.name}</Text>
                                </TouchableHighlight>
                                // <HTMLView key={attachment.name}
                                //     value={"<a href='"+URL+"/"+attachment.name+"'>"+attachment.name+"</a>"}
                                // />
                            )
                        })}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            this.props.db.results ? (this.state.content === "" ? (<View
                        style={{flex: 1, backgroundColor: '#FAFAFA', paddingTop: 0, alignItems: "center"}}>
                        <FlatList
                            containerStyle={{margin: 0, padding: 0}}
                            style={{width: SCREEN_WIDTH}}
                            ref='listRef'
                            data={this.props.db.results}
                            renderItem={this.renderSingleDB.bind(this)}
                            keyExtractor={(item, index) => index}/>
                    </View>)
                    :
                    <View>
                        <ScrollView>
                            <HTMLView stylesheet={styles} value={"<p>"+this.state.content+"</p>"}/>
                        </ScrollView>
                    </View>
                )
                : <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        db: state.dbReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Database);

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
    p: {
        fontSize: 20,
        color: '#333366', // make links coloured pink
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