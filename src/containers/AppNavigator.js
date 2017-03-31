import {StackNavigator} from "react-navigation";
import LiveTracker from "./LiveTracker";
import DetailedSessionScreen from "../components/DetailedSessionScreen";

export default AppNavigator = StackNavigator({
    LiveTracker: { screen: LiveTracker},
    DetailedSession: { screen: DetailedSessionScreen },
});