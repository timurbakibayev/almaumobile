import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-elements';
import logo from '../logo3.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').width;

class Slides extends Component {
    render() {
        return (
            <ScrollView
                horizontal
                style={{flex: 1}}
                pagingEnabled
            >
                <View style={[styles.slide, {backgroundColor: "#2196f3"}]}>
                    <Image style={{
                        width:SCREEN_WIDTH/2,
                        resizeMode: "contain",
                        height: SCREEN_WIDTH/2,
                        marginTop: -SCREEN_HEIGHT/2,
                    }} source={logo}/>
                    <Text style={styles.slideText}>Управление знаниями</Text>
                    <Text style={styles.slideText}>-></Text>
                </View>
                {this.props.data.map((slide, index) => (
                        <View key={slide.text} style={[styles.slide, {backgroundColor: slide.color}]}>
                            <Text style={styles.slideText}>{slide.text}</Text>
                            <Text/>
                            {index === this.props.data.length - 1 && <Button
                                title = "Начать"
                                raised
                                onPress = {this.props.onComplete}
                                buttonStyle = {styles.button}
                            >

                            </Button>}
                        </View>
                    )
                )}
            </ScrollView>
        )
    }
}

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    slideText: {
        fontSize: 30,
        color: "white",
        textAlign: "center",
    },
    button: {
        backgroundColor: '#0288D1',
    }
}

export default Slides;