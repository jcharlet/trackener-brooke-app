
import {
    AsyncStorage
} from 'react-native';
import {LOAD_RIDES, ADD_RIDE, SHOW_PREVIOUS_HACK, SHOW_NEXT_HACK} from "./actionTypes";

//TODO update totalDistance as well on liveTracker screen!
export const loadRides = () => ({
    type: LOAD_RIDES,
    payload: AsyncStorage.getItem('rides').then((rides) => {
        if (rides) {
            return JSON.parse(rides);
        }
        return [];
    })
});

export const addRide = (ride) =>{
    AsyncStorage.getItem('rides').then((rides) => {
        if (rides) {
            const rideArray = JSON.parse(rides);
            return AsyncStorage.setItem('rides', JSON.stringify([...rideArray, ride]));
        }
        return AsyncStorage.setItem('rides', JSON.stringify([ride]));
    });
    return ({type: ADD_RIDE, payload: ride});
};


export const showPreviousHack = function () {
    return {type: SHOW_PREVIOUS_HACK};
};
export const showNextHack = function () {
    return {type: SHOW_NEXT_HACK};
};