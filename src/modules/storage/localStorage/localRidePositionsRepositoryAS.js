import {
    AsyncStorage
} from 'react-native';
//TODO profile ride on ios simulator: check no memory leak
export const RIDE_POSITIONS_COLL='ridePositions';
export const RIDE_POSITIONS_CURRENT_COLL='ridePositionsCurrent';

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
                if (ride.id===id) {
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

export const loadCurrentRidePositions = () => {
    return AsyncStorage.getItem(RIDE_POSITIONS_CURRENT_COLL)
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        });
}

export const loadCurrentRidePositionsFromIndex = (lastIndexProcessed) => {
    return AsyncStorage.getItem(RIDE_POSITIONS_CURRENT_COLL)
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        })
        .then((positions)=>{
            return positions.slice(lastIndexProcessed);
        })
}

export const emptyCurrentRidePositions = () => {
    return saveCurrent([]);
}

export const saveCurrent = (positions) => {
    return AsyncStorage.setItem(RIDE_POSITIONS_CURRENT_COLL, JSON.stringify(positions));
}

export const addPosition = (position) => {
    return loadCurrentRidePositions()
        .then((positions)=>{
            positions.push(position);
            return saveCurrent(positions);
        })
}


export const getLastPosition = () => {
    return loadCurrentRidePositions()
        .then((positions)=>{
            return positions[positions.length-1]
        })
}