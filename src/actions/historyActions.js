import {
    AsyncStorage
} from 'react-native';
import {LOAD_RIDES_SUMMARY} from "./actionTypes";

export const loadRides = () => ({
    type: LOAD_RIDES_SUMMARY,
    payload: AsyncStorage.getItem('rides').then((ridesString) => {
        if (ridesString) {
            let completeRides = JSON.parse(ridesString);
            return completeRides.map(ride => {
                delete ride.analytics.timeSpentByGait;
                return {
                    ...ride.analytics,
                    date:ride.date
                }
            })
        }
        return [];
    })
});