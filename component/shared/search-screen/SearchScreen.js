import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from "react-native-maps";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {SearchBar} from "react-native-elements";

import {connect} from "react-redux"

const DEFAULT_COORD = {
    lat: 48.859268,
    lng: 2.347060
};

class SearchScreen extends Component {
    state = {
        search: ""
    };
    updateSearch = (search) =>
        this.setState({search});
    submitSearch = () => {

    };

    render() {
        console.log(this.props.currentWeather);
        return (

            <View style={styles.container}>
                <MapView
                    style={{flex: 1}}
                    region={{
                        latitude: DEFAULT_COORD.lat,
                        longitude: DEFAULT_COORD.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    scrollEnabled={false}
                    liteMode={true}
                />
                <SearchBar
                    style={{}}
                    lightTheme
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    onSubmitEditing={this.submitSearch}
                    placeholder="Type your city ...."
                    containerStyle={{
                        position: "absolute",
                        bottom: hp("50%"),
                        left: wp("5%"),
                        width: wp("85%")
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30
    }
});

const mapStateToProps = (store) => {
    return {
        currentWeather: store.weather.data
    }
};

export default connect(mapStateToProps, {})(SearchScreen)