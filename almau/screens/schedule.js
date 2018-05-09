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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';

import Icon from "react-native-vector-icons/FontAwesome";
import * as Actions from '../actions/schedule';
import Slides from '../components/slides';
import {URL} from '../api/url';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import icons from '../icons.json';

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};

LocaleConfig.defaultLocale = 'ru';

class Schedule extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const todayISO = today.toISOString().substr(0, 10);
        let markedDates = {};
        markedDates[todayISO] = {selected: true};
        console.log("Today ISO", todayISO);
        this.state = {
            expanded: {},
            imageUrl: {},
            i: 0,
            selectedDate: todayISO,
        };
    }

    componentDidMount() {
        this.props.load();
    }

    static navigationOptions = {
        title: 'Дисциплины',
    };


    renderSingleItem({item, index}) {
        let sum = 0;
        item.title.split('').forEach(function (alphabet) {
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
            <View key={item.subjectid + item.StudyGroupID}
            >
                <View style={{
                    flexDirection: "row", flex: 1, padding: 10, borderBottomWidth: 1,
                    borderColor: "#ccc",
                }}>
                    <View style={{width: 70, flexDirection: "column"}}>
                        {icon}
                        <Text>{item.time.substr(0, 5)}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}> </Text>
                        <Text style={styles.title}>{item.room}</Text>
                    </View>
                </View>
            </View>
        )
    }

    selectDate(day, thi) {
        thi.setState({i: this.state.i + 1, selectedDate: day.dateString})
    }

    render() {
        if (this.props.data.schedule) {
            let markedDates = JSON.parse(JSON.stringify(this.props.data.markedDates));
            for (key in markedDates)
                markedDates[key].selected = false;
            if (!markedDates.hasOwnProperty(this.state.selectedDate))
                markedDates[this.state.selectedDate] = {selected: true};
            else
                markedDates[this.state.selectedDate].selected = true;
            //key={this.state.i}
            return (
                <View style={{flexDirection: "column", flex: 1}}>
                    <ScrollView style={{flex: 1}}>
                        <Calendar
                            onDayPress={(day) => {
                                this.selectDate(day, this)
                            }}
                            monthFormat={'yyyy MMMM'}
                            firstDay={1}
                            showWeekNumbers={true}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            markedDates={markedDates}
                            markingType={'multi-dot'}
                        />
                    </ScrollView>
                    <ScrollView style={{flex: 1}}>
                        <FlatList
                            containerStyle={{margin: 0, padding: 0}}
                            style={{width: SCREEN_WIDTH}}
                            ref='listRef'
                            data={this.props.data.schedule.filter((day) => day.startsAt.substr(0, 10) === this.state.selectedDate)}
                            renderItem={this.renderSingleItem.bind(this)}
                            keyExtractor={(item, index) => index}/>
                    </ScrollView>
                </View>
            );
        }
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        data: state.scheduleReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

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
        fontSize: 12,
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