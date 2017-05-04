import {MainNavNavigator} from "./MainNavConfiguration"
import {
    NavigationActions,
} from 'react-navigation';
import {LOGOUT, NAV_AUTHENT_LOGIN, START_RIDE, STOP_RIDE, NAV_TRACKER_STARTED, NAV_BOTTOM_TAB_NAV, LOGIN_SUCCESS,
    REGISTER_SUCCESS
} from "../../actions/actionTypes";

export default (state, action) => {
    let nextState;

    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            nextState = MainNavNavigator.router.getStateForAction(NavigationActions.navigate({routeName:NAV_BOTTOM_TAB_NAV}), state);
            break;
        case LOGOUT:
            nextState = MainNavNavigator.router.getStateForAction(NavigationActions.navigate({routeName: NAV_AUTHENT_LOGIN}), state);
            break;
        case START_RIDE:
            nextState = MainNavNavigator.router.getStateForAction(NavigationActions.navigate({routeName: NAV_TRACKER_STARTED}), state);
            break;
        case STOP_RIDE:
            nextState = MainNavNavigator.router.getStateForAction(NavigationActions.back(), state);
            break;
        default:
            nextState = MainNavNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return `state` if `nextState` is null or undefined
    return nextState || state;
};