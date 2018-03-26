import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    render() {
        return (
            <ScrollView
                horizontal
                style={{flex: 1}}
                pagingEnabled
            >
                {this.props.data.map((slide, index) => (
                        <View key={slide.text} style={[styles.slide, {backgroundColor: slide.color}]}>
                            <Text style={styles.slideText}>{slide.text}</Text>
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
    },
    button: {
        backgroundColor: '#0288D1',
        marginTop: 15,
    }
}

export default Slides;