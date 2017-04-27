import {
    AsyncStorage
} from 'react-native';
import {loadRides} from "./localStorageService";

export const addRides = (rides) => {
    loadRides()
        .then((rideArray) => {
            return AsyncStorage.setItem('rides', JSON.stringify([...rideArray, ...rides]));
        });
}

export const findAllUnsynced = (rides) => {
    return loadRides()
        .then((rides) => {
            console.log('found ' + rides.length + ' ride(s)');
            return rides.map(ride => {
                if (!ride.synced || ride.synced == false) {
                    return ride
                }
            })
        }).then((rides)=>{
            let nonEmptyRides = rides.filter(function(e){return e});
            console.log('found ' + nonEmptyRides.length + ' unsynced ride(s)');
            return nonEmptyRides;
        })
}

export const flagAsSynced = () => {
    loadRides()
        .then((rides) => {
            return rides.map(ride => {
                ride.synced=true;
                return ride;
            })
        }).then((rides) => {
        return AsyncStorage.setItem('rides', JSON.stringify(rides));
    });

}