import React, {Component} from 'react';
import {Button, Image, Linking, ScrollView, Text, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


class FactCard extends Component {
    goToTopScrollView = () => {
        this.scrollView.scrollTo({x: 0, y: 0, animate: true})
    }

    componentDidMount(props) {

    }

    render() {
        const width = Math.floor(wp("85%"))
            , height = Math.floor(hp("30%"));

        return (
            <View style={{
                elevation: 1,
                shadowColor: "black",
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.7,
                width: width,
                marginTop: 40,
                backgroundColor: "white"
            }}
            >

                <Image
                    source={{uri: this.props.fact.image}}

                    style={{width: width, height: height}}
                />
                <ScrollView onScrollEndDrag={this.goToTopScrollView} ref={scrollViewRef => {
                    this.scrollView = scrollViewRef
                }} height={hp("10%")}>
                    <Text>{this.props.fact.text + " " + this.props.fact.text + " " + this.props.fact.text}</Text>
                </ScrollView>
                <Button title="See the source" onPress={() => Linking.openURL(this.props.fact.source_url)}
                        disabled={this.props.disabled}/>
            </View>

        );
    }
}

export default FactCard;