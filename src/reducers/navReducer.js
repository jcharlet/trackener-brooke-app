
import AppNavigator from "../components/AppNavigator"
import {
    NavigationActions,
} from 'react-navigation';
import {NAV_HACK_DETAILS} from "../actions/actionTypes";

const initialNavState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: 'LiveTracker' },
        { key: 'InitB', routeName: NAV_HACK_DETAILS },
        { key: 'InitC', routeName: 'History' },
    ],
};

export default (state = initialNavState, action) => {
    // if (action.type === 'DetailedSession') {
    //     return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    // }
    // if (action.type === 'LiveTracker') {
    //     return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailedSession' }), state);
    // }
    // if (action.type === 'History') {
    //     return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailedSession' }), state);
    // }
    // if (action.type === 'Logout') {
    //     return AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Login'}), state);
    // }
    return AppNavigator.router.getStateForAction(action, state);
};