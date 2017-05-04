
import BottomTabNavigator from "./BottomTabNavConfiguration"
import {
    NavigationActions,
} from 'react-navigation';
import {NAV_HACK_DETAILS, LOGOUT, NAV_TRACKER, LOGIN_SUCCESS, STOP_RIDE, NAV_HISTORY, REGISTER_SUCCESS} from "../../actions/actionTypes";

const initialNavState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: NAV_TRACKER },
        { key: 'InitB', routeName: NAV_HACK_DETAILS },
        { key: 'InitC', routeName: NAV_HISTORY },
    ],
};

export default (state = initialNavState, action) => {
    let nextState = BottomTabNavigator.router.getStateForAction(action, state);

    switch (action.type) {
        case LOGOUT:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_TRACKER}), state);
            break;
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_TRACKER}), state);
            break;
        case STOP_RIDE:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_HACK_DETAILS}), state);
            break;
        case NAV_HACK_DETAILS:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_HACK_DETAILS}), state);
            break;
        case NAV_HISTORY:
            nextState = BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_HISTORY}), state);
            break;
    }
    // Simply return `state` if `nextState` is null or undefined
    return nextState || state;
};