import {
    AsyncStorage
} from 'react-native';

export const RIDE_POSITIONS_COLL='ridePositions';

export const save = (rides) => {
    return AsyncStorage.setItem(RIDE_POSITIONS_COLL, JSON.stringify(rides));
}

export const loadAllRides = () => {
    return AsyncStorage.getItem(RIDE_POSITIONS_COLL)
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        });
};

export const loadById = (id) => {
    return loadAllRides()
        .then((rides) => {
            return rides.map(ride => {
                if (ride.id==id) {
                    return ride
                }
            })
        }).then((rides)=>{
            return rides.filter(function(e){return e});
        }).then((rides)=>{
            if(rides.length===1){
                return rides[0]
            }
            return null;
        })
};



export const addRide = (ride) => {
    return loadAllRides()
        .then((rideArray) => {
            return AsyncStorage.setItem(RIDE_POSITIONS_COLL, JSON.stringify([...rideArray, ride]));
        });
}

export const removeRide = (id: string) => {
    return loadAllRides()
        .then((rideArray) => {
            let newRideArray = rideArray.filter(function (item) {
                return !(item.id === id) ;
            });
            return AsyncStorage.setItem(RIDE_POSITIONS_COLL, JSON.stringify(newRideArray));
        });
}

export const empty = () => {
    return save([])
}