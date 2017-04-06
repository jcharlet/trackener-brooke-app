import {createStore, applyMiddleware, combineReducers} from 'redux';
// import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import liveTrackerReducer from "./reducers/liveTrackerReducer";
import hackDetailsReducer from "./reducers/hackDetailsReducer";
import navReducer from "./reducers/navReducer";
import promiseMiddleware from 'redux-promise';
//FIXME LOW logger to enable (throws error currently)
// const logger = createLogger();



// export default (initialState = {}) => (
export default () => (
    createStore(
        combineReducers({
            nav: navReducer,
            liveTracker: liveTrackerReducer,
            hackDetails: hackDetailsReducer,
        }),
        applyMiddleware(thunkMiddleware, promiseMiddleware)
    )
);
