
import BottomTabNavigator from "./BottomTabNavConfiguration"
import {
    NavigationActions,
} from 'react-navigation';
import {NAV_HACK_DETAILS} from "../../actions/actionTypes";

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
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.back(), state);
    // }
    // if (action.type === 'LiveTrackerContainer') {
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailedSession' }), state);
    // }
    // if (action.type === 'HistoryContainer') {
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailedSession' }), state);
    // }
    // if (action.type === 'Logout') {
    //     return BottomTabNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Login'}), state);
    // }
    return BottomTabNavigator.router.getStateForAction(action, state);
};