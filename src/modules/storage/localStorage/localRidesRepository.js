import {
    AsyncStorage
} from 'react-native';

export const RIDES_COLL='rides';

export const saveRides = (rides) => {
    return AsyncStorage.setItem(RIDES_COLL, JSON.stringify(rides));
}

export const loadAllRides = () => {
    return AsyncStorage.getItem(RIDES_COLL)
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        });
};

export const loadRidesByDeviceId = (deviceId) => {
    return loadAllRides()
        .then((rides) => {
            return rides.map(ride => {
                if (ride.deviceId==deviceId) {
                    return ride
                }
            })
        }).then((rides)=>{
            return rides.filter(function(e){return e});
        }).then((rides)=>{
            if(rides.length>0){
                return rides
            }
            return [];
        })
};

export const findAllUnsynced = (rides) => {
    return loadAllRides()
        .then((rides) => {
            console.log('found ' + rides.length + ' ride(s)');
            return rides.map(ride => {
                if (!ride.synced || ride.synced == false) {
                    return ride
                }
            })
        }).then((rides)=>{
            return rides.filter(function(e){return e});
        }).then((rides)=>{
            console.log('found ' + rides.length + ' unsynced ride(s)');
            return rides;
        })
}

export const flagAsSynced = () => {
    return loadAllRides()
        .then((rides) => {
            return rides.map(ride => {
                ride.synced=true;
                return ride;
            })
        }).then((rides) => {
        return AsyncStorage.setItem(RIDES_COLL, JSON.stringify(rides));
    });
}


export const addRide = (ride) => {
    return loadAllRides()
        .then((rideArray) => {
            return AsyncStorage.setItem(RIDES_COLL, JSON.stringify([...rideArray, ride]));
        });
}

export const removeRide = (date: string, deviceId: string) => {
    return loadAllRides()
        .then((rideArray) => {
            let newRideArray = rideArray.filter(function (item) {
                return !(item.date === date & item.deviceId === deviceId) ;
            });
            return AsyncStorage.setItem(RIDES_COLL, JSON.stringify(newRideArray));
        });
}