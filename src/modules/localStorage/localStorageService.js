import {
    AsyncStorage
} from 'react-native';

export const loadRides = () => {
    return AsyncStorage.getItem('rides')
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        });
};

export const addRide = (ride) => {
    loadRides()
        .then((rideArray) => {
            return AsyncStorage.setItem('rides', JSON.stringify([...rideArray, ride]));
        });
}

export const removeRide = (date: string) => {
    loadRides()
        .then((rideArray) => {
            let newRideArray = rideArray.filter(function (item) {
                return item.date !== date;
            });
            return AsyncStorage.setItem('rides', JSON.stringify(newRideArray));
        });
}

export const loadRidesHistory = () => {
    return loadRides()
        .then((completeRides) => {
        return completeRides.map(ride => {
            delete ride.analytics.timeSpentByGait;
            return {
                ...ride.analytics,
                date: ride.date
            }
        })
    })
};

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

export const emptyLocalStorage = () => {
    AsyncStorage.setItem('rides', JSON.stringify([]));
    AsyncStorage.setItem('totalDistance', JSON.stringify([]));
}