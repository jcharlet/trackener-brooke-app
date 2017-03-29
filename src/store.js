import { createStore, applyMiddleware, combineReducers } from 'redux';
// import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import liveTrackerReducer from "./reducers/liveTrackerReducer";

// const logger = createLogger();

// export default (initialState = {}) => (
export default () => (
    createStore(
        combineReducers({
            liveTracker: liveTrackerReducer,
        }),
        // initialState,
        // applyMiddleware(promiseMiddleware)
    )
);
