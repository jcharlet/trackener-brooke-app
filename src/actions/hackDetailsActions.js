import {
    AsyncStorage
} from 'react-native';
import {LOAD_RIDES, SHOW_PREVIOUS_HACK, SHOW_NEXT_HACK, REMOVE_HACK} from "./actionTypes";

export const loadRides = () => ({
    type: LOAD_RIDES,
    payload: AsyncStorage.getItem('rides').then((rides) => {
        if (rides) {
            return JSON.parse(rides);
        }
        return [];
    })
});

export const removeHack = (date: string) => {
    AsyncStorage.getItem('rides').then((rides) => {
        const rideArray = JSON.parse(rides);
        let newRideArray = rideArray.filter(function (item) {
            return item.date !== date;
        });
        return AsyncStorage.setItem('rides', JSON.stringify(newRideArray));
    });

    return ({
        type: REMOVE_HACK,
        payload: date
    })
}

export const showPreviousHack = function () {
    return {type: SHOW_PREVIOUS_HACK};
};
export const showNextHack = function () {
    return {type: SHOW_NEXT_HACK};
};