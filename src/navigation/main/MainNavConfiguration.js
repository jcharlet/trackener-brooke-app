'use strict'
import { StackNavigator} from 'react-navigation'
import BottomTabNavContainer from "../bottomBar/BottomTabNavContainer";
import LoginContainer from "../../screens/login/LoginContainer";


export const MainNavigator = StackNavigator({
    Login: {
        screen: LoginContainer,
    },
    BottomTabNavContainer: {
        screen: BottomTabNavContainer,
    },
},{
    headerMode:'none',
});


export const mainNavReducer = (state,action) => {
        return MainNavigator.router.getStateForAction(action,state)
}
