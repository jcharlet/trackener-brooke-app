import {MainNavNavigator} from "./MainNavConfiguration"
import {
    NavigationActions,
} from 'react-navigation';
import {NAV_HACK_DETAILS, LOGOUT, NAV_AUTHENT_LOGIN} from "../../actions/actionTypes";

export default (state, action) => {
    let nextState;

    switch (action.type) {
        case LOGOUT:
            nextState = MainNavNavigator.router.getStateForAction(NavigationActions.navigate({routeName: NAV_AUTHENT_LOGIN}), state);
            break;
        default:
            nextState = MainNavNavigator.router.getStateForAction(action, state);
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