import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import liveTrackerReducer from "./reducers/liveTrackerReducer";
import hackDetailsReducer from "./reducers/hackDetailsReducer";
import navReducer from "./reducers/navReducer";
import promiseMiddleware from 'redux-promise';
import {createLogger} from "redux-logger";


const logger = createLogger();
const middleWare = global.__DEV__ ? [logger, thunkMiddleware, promiseMiddleware] :
    [thunkMiddleware, promiseMiddleware];

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
