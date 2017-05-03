import {
    AsyncStorage
} from 'react-native';

export const loadTotalDistance = () => {
    return AsyncStorage.getItem('totalDistance').then((totalDistance) => {
        if (totalDistance && !isNaN(totalDistance)) {
            return Number(totalDistance);
        }
        return 0;
    })
};

export const addToTotalDistanceAndSave = (rideDistance) => {
    return loadTotalDistance()
        .then((totalDistance) => {
            totalDistance += rideDistance;
            AsyncStorage.setItem('totalDistance', totalDistance.toString());
            return totalDistance;
        })
};
export const saveTotalDistance = (totalDistance) => {
    AsyncStorage.setItem('totalDistance', totalDistance.toString());
};