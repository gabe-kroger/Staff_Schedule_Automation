//this is boilerplate code that brings in createStore, then we need to run createStore and pass it into a variable

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //thunk is our middleware
import rootReducer from './reducers'; //we'll have multiple reducers, but they'll be combined in a rootReducer.

const initialState = {}; //this is our initial state object

const middleware = [thunk]; //thunk is our middleware

// creating the store and taking in the root reducer and the initial state, as well as the middleware variable.
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
