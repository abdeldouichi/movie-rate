import {applyMiddleware, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/index"

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, {}, composeEnhancer)

export default store;