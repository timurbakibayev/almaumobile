import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
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
import * as Actions from '../actions/news';
import Slides from '../components/slides';
import {URL} from '../api/url';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class News extends Component {
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
        title: 'Новости',
    };

    renderSingleNews({item, index}) {
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
                        borderLeftColor: item.color,
                    }}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.title}></Text>
                        {item.files!==null && item.files.map((file) => {
                            return (
                                <HTMLView key={file.name}
                                    value={"<a href='"+URL+"/"+file.path+"'>"+file.name+"</a>"}
                                />
                            )
                        })}
                        <HTMLView
                            value={this.state.expanded["" + index] ? item.content : item.short_content}
                            stylesheet={styles}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }


    render() {
        // console.log("News:", this.props.news);
        return (
            this.props.news.data ? (<View
                    style={{flex: 1, backgroundColor: '#FAFAFA', paddingTop: 0, alignItems: "center"}}>
                    <FlatList
                        containerStyle={{margin: 0, padding: 0}}
                        style={{width: SCREEN_WIDTH}}
                        ref='listRef'
                        data={this.props.news.data}
                        renderItem={this.renderSingleNews.bind(this)}
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
        news: state.newsReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(News);

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