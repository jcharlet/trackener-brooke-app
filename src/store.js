import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import liveTrackerReducer from "./screens/rides/liveTracker/liveTrackerReducer";
import hackDetailsReducer from "./screens/rides/hackDetails/hackDetailsReducer";
import navReducer from "./navigation/bottomBar/bottomBarNavReducer";
import promiseMiddleware from 'redux-promise';
import {createLogger} from "redux-logger";
import historyReducer from "./screens/rides/history/historyReducer";
import loginReducer from "./screens/authentication/login/loginReducer";
import registerReducer from "./screens/authentication/register/registerReducer";
import settingsReducer from "./screens/settings/settingsReducer";
import mainNavReducer from "./navigation/main/mainNavReducer";



let middleWare = [thunkMiddleware, promiseMiddleware];

 // if (global.__DEV__) {
 //     const logger = createLogger({
 //          // predicate: (getState, action) => [LOAD_RIDES, ADD_RIDE].includes(action.type)
 //     });
 //     middleWare.push(logger);
 // }

export default () => (
    createStore(
        combineReducers({
            mainNav: mainNavReducer,
            login:loginReducer,
            nav: navReducer,
            liveTracker: liveTrackerReducer,
            hackDetails: hackDetailsReducer,
            history: historyReducer,
            register: registerReducer,
            settings: settingsReducer,
        }),
        applyMiddleware(...middleWare)
    )
);
