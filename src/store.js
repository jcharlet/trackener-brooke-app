import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import liveTrackerReducer from "./screens/liveTracker/liveTrackerReducer";
import hackDetailsReducer from "./screens/hackDetails/hackDetailsReducer";
import navReducer from "./navigation/navReducer";
import promiseMiddleware from 'redux-promise';
import {createLogger} from "redux-logger";
import historyReducer from "./screens/history/historyReducer";



let middleWare = [thunkMiddleware, promiseMiddleware];

 if (global.__DEV__) {
     const logger = createLogger({
          // predicate: (getState, action) => [LOAD_RIDES, ADD_RIDE].includes(action.type)
     });
     middleWare.push(logger);
 }

export default () => (
    createStore(
        combineReducers({
            nav: navReducer,
            liveTracker: liveTrackerReducer,
            hackDetails: hackDetailsReducer,
            history: historyReducer,
        }),
        applyMiddleware(...middleWare)
    )
);
