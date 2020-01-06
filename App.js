import React, {Component} from 'react';
import SearchScreen from "./component/shared/search-screen/SearchScreen";
import store from "./store"
import {Provider} from "react-redux"

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SearchScreen/>
            </Provider>
        )
    }
}
