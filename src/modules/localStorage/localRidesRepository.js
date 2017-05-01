import {
    AsyncStorage
} from 'react-native';

export const saveRides = (rides) => {
    return AsyncStorage.setItem('rides', JSON.stringify(rides));
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