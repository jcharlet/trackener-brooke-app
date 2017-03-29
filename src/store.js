import { createStore, applyMiddleware, combineReducers } from 'redux';
// import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import liveTrackerReducer from "./reducers/liveTrackerReducer";

//FIXME logger to enable (throws error currently)
// const logger = createLogger();

// export default (initialState = {}) => (
export default () => (
    createStore(
        combineReducers({
            liveTracker: liveTrackerReducer,
        }),
        // initialState,
        applyMiddleware(thunkMiddleware)
    )
);
