import React, {Component} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';
import FactCard from "./component/fact-card/FactCard";
import axios from "axios";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const CARD_X_ORIGIN = 0;
const MAX_LEFT_ROTATION_DISTANCE = wp("-150%");
const MAX_RIGHT_ROTATION_DISTANCE = wp("150%");
const LEFT_TRESHOLD_BEFORE_SWIPE = wp("-50%");
const RIGHT_TRESHOLD_BEFORE_SWIPE = wp("50%");
const FACT_URL = "https://uselessfacts.jsph.pl/random.json";
const RANDOM_IMAGE_URL = `https://picsum.photos/id/${Math.floor(hp("30%"))}/${Math.floor(wp("85%"))}/`;
export default class App extends Component {
    state = {
        panResponder: undefined,
        topFact: undefined,
        bottomFact: undefined
    };
    position = new Animated.ValueXY();

    componentDidMount() {
        console.log(this.position);
        const panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gesture) => {
                return Math.abs(gesture.dx < gesture.dy);
            },
            onPanResponderMove: (event, gesture) => {
                this.position.setValue({
                    x: gesture.dx,
                    y: 0
                })
            },

            onPanResponderRelease: (event, gesture) => {

                if (gesture.dx < LEFT_TRESHOLD_BEFORE_SWIPE) {
                    this.forceLeftExit();
                } else if (gesture.dx > RIGHT_TRESHOLD_BEFORE_SWIPE) {
                    this.forceRightExit();
                } else {
                    this.resetPositionSoft();
                }
            }
        });

        this.setState({
                panResponder
            },
            () => {
                this.loadTopFact();
                this.loadBottomFact();
            });

    }

    loadTopFact() {
        axios.get(FACT_URL).then(
            res => {
                this.setState({
                    topFact: {
                        ...res.data,
                        image: this.getRandomImageURL()
                    }
                });
            }
        );
    }

    loadBottomFact() {
        axios.get(FACT_URL).then(
            res => {
                this.setState({
                    bottomFact: {
                        ...res.data,
                        image: this.getRandomImageURL()
                    }
                });
            }
        );
    }

    resetPositionSoft() {
        Animated.spring(this.position, {
            toValue: {
                x: 0,
                y: 0
            }
        }).start()
    }

    forceLeftExit() {

        Animated.timing(this.position, {
            toValue: {
                x: wp("-100%"),
                y: 0
            }
        }).start(this.onCardExitDone)
    }

    forceRightExit() {
        Animated.timing(this.position, {
            toValue: {
                x: wp("100%"),
                y: 0
            }
        }).start(this.onCardExitDone)
    }

    onCardExitDone = () => {
        this.setState({topFact: this.state.bottomFact});
        this.loadBottomFact();
        this.position.setValue({x: 0, y: 0});
    }

    getCardStyle() {
        const rotation = this.position.x.interpolate({
            inputRange: [MAX_LEFT_ROTATION_DISTANCE, CARD_X_ORIGIN, MAX_RIGHT_ROTATION_DISTANCE],
            outputRange: ["-120deg", "0deg", "120deg"]
        });
        return {
            transform: [{rotate: rotation}],
            ...this.position.getLayout()
        }
    }

    getRandomImageURL() {
        return `${RANDOM_IMAGE_URL}${Math.floor(Math.random() * 500 + 1)}`
    }

    renderTopCard() {
        return (
            <Animated.View
                {...this.state.panResponder.panHandlers}
                style={this.getCardStyle()}
            >
                <FactCard fact={this.state.topFact} disabled={false}/>
            </Animated.View>

        )
    }

    renderBottomCard() {
        return (
            <View style={{zIndex: -1, position: "absolute"}}>
                <FactCard disabled={true} fact={this.state.bottomFact}/>
            </View>
        )
    }

    render() {
        console.log(this.state.bottomFact);
        console.log(this.state.topFact);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Fact Swipe</Text>
                <View>
                    {this.state.topFact && this.renderTopCard()}
                    {this.state.bottomFact && this.renderBottomCard()}
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 30
    }
});
