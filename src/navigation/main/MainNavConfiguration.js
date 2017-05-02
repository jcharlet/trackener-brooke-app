'use strict'
import { StackNavigator} from 'react-navigation'
import BottomTabNavContainer from "../bottomBar/BottomTabNavContainer";
import LoginContainer from "../../screens/authentication/login/LoginContainer";
import RegisterContainer from "../../screens/authentication/register/RegisterContainer";
import SettingsContainer from "../../screens/settings/SettingsContainer";


export const MainNavNavigator = StackNavigator({
    Login: {
        screen: LoginContainer,
    },
    Register: {
        screen: RegisterContainer,
    },
    BottomTabNavContainer: {
        screen: BottomTabNavContainer,
    },
    Settings: {
        screen: SettingsContainer,
    },
},{
    headerMode:'none',
});

