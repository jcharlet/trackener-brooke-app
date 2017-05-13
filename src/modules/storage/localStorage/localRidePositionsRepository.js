import {
    AsyncStorage
} from 'react-native';
import {storage} from "./localStorage"
export const RIDE_POSITIONS_COLL = 'ridePositions';

export const save = (rides) => {
    let addPromises = [];
    return empty()
        .then(() => {
            for (let ride of rides) {
                addPromises.push(addRide(ride));
            }
            return Promise.all(addPromises);
        })
}

export const loadAllRides = () => {
    return storage().getAllDataForKey(RIDE_POSITIONS_COLL)
};

export const loadById = (id) => {
    return storage().load({
        key: RIDE_POSITIONS_COLL,   // Note: Do not use underscore("_") in key!
        id: id,

        // autoSync(default true) means if data not found or expired,
        // then invoke the corresponding sync method
        autoSync: true,

        // syncInBackground(default true) means if data expired,
        // return the outdated data first while invoke the sync method.
        // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
        syncInBackground: true,

        // you can pass extra params to sync method
        // see sync example below for example
        // syncParams: {
        //     extraFetchOptions: {
        //         // blahblah
        //     },
        //     someFlag: true,
        // },
    })
        .catch((reject) => {
            if (reject.name !== 'NotFoundError') {
                console.info(reject.name);
            }
            return Promise.resolve(null)
        })
}


export const addRide = (ride) => {
    return storage().save({
        key: RIDE_POSITIONS_COLL,   // Note: Do not use underscore("_") in key!
        id: ride.id,   // Note: Do not use underscore("_") in key!
        data: ride,

        // if not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: null
    });
}

export const removeRide = (id: string) => {
    return storage().remove({
        key: RIDE_POSITIONS_COLL,
        id: id
    });
}

export const empty = () => {
    if (storage()._m && storage()._m.__keys__[RIDE_POSITIONS_COLL]) {
        return storage().clearMapForKey(RIDE_POSITIONS_COLL);
    }
    return Promise.resolve();
}