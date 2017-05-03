
import BottomTabNavigator from "./BottomTabNavConfiguration"
import {
    NavigationActions,
} from 'react-navigation';
import {NAV_HACK_DETAILS, LOGOUT, NAV_TRACKER, LOGIN_SUCCESS, STOP_RIDE} from "../../actions/actionTypes";

const initialNavState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: 'LiveTracker' },
        { key: 'InitB', routeName: NAV_HACK_DETAILS },
        { key: 'InitC', routeName: 'History' },
    ],
};

export default (state = initialNavState, action) => {
    let nextState = BottomTabNavigator.router.getStateForAction(action, state);

    switch (action.type) {
        case LOGOUT:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_TRACKER}), state);
            break;
        case LOGIN_SUCCESS:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_TRACKER}), state);
            break;
        case STOP_RIDE:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_HACK_DETAILS}), state);
            break;
    }
    // if (action.type === 'DetailedSession') {
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.back(), state);
    // }
    // if (action.type === "Navigation/NAVIGATE" && action.routeName==="History") {
    //     console.log('going to History');
    // }
    // if (action.type === 'HistoryContainer') {
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailedSession' }), state);
    // }
    // if (action.type === 'Logout') {
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Login'}), state);
    // }

    // Simply return `state` if `nextState` is null or undefined
    return nextState || state;
};