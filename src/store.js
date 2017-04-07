import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import liveTrackerReducer from "./reducers/liveTrackerReducer";
import hackDetailsReducer from "./reducers/hackDetailsReducer";
import navReducer from "./reducers/navReducer";
import promiseMiddleware from 'redux-promise';
import {createLogger} from "redux-logger";
import {ADD_RIDE, LOAD_RIDES} from "./actions/actionTypes";



let middleWare = [thunkMiddleware, promiseMiddleware];

if (global.__DEV__) {
    const logger = createLogger({
        predicate: (getState, action) => [LOAD_RIDES, ADD_RIDE].includes(action.type)
    });

    middleWare.push(logger);
}

// export default (initialState = {}) => (
export default () => (
    createStore(
        combineReducers({
            nav: navReducer,
            liveTracker: liveTrackerReducer,
            hackDetails: hackDetailsReducer,
        }),
        applyMiddleware(...middleWare)
    )
);
