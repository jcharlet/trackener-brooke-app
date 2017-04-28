'use strict'
import { StackNavigator} from 'react-navigation'
import BottomTabNavContainer from "../bottomBar/BottomTabNavContainer";
import LoginContainer from "../../screens/authentication/login/LoginContainer";
import RegisterContainer from "../../screens/authentication/register/RegisterContainer";


export const MainNavigator = StackNavigator({
    Login: {
        screen: LoginContainer,
    },
    Register: {
        screen: RegisterContainer,
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
