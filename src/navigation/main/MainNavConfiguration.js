'use strict'
import { StackNavigator} from 'react-navigation'
import BottomTabNavContainer from "../bottomBar/BottomTabNavContainer";
import LoginContainer from "../../screens/authentication/login/LoginContainer";
import RegisterContainer from "../../screens/authentication/register/RegisterContainer";
import SettingsContainer from "../../screens/settings/SettingsContainer";
import LiveTrackerStartedContainer from "../../screens/rides/liveTracker/LiveTrackerStartedContainer";
import ModifyPasswordContainer from "../../screens/authentication/modifyPassword/ModifyPasswordContainer";


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
    ModifyPassword: {
        screen: ModifyPasswordContainer,
    },
    LiveTrackerStartedContainer:{
        screen: LiveTrackerStartedContainer
    }
},{
    headerMode:'none',
});

