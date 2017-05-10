import * as storageService from "../storageService";
import * as localRidesRepository from "../localStorage/localRidesRepository";
import {
    AsyncStorage
} from 'react-native';
import * as appConfigRepository from "../localStorage/appConfigRepository";
import * as userConfigRepository from "../localStorage/userConfigRepository";
import * as localRidePositionsRepository from "../localStorage/localRidePositionsRepository";
import * as utils from "../../../util/utils";

export const migrate = (username, deviceId) => {
    return appConfigRepository.getAppVersion()
        .then((appVersion)=>{
            if (!appVersion) {
                return migrateDataFromV0ToV1(username, deviceId);
            }
            return Promise.resolve();
        })
}
let migrateDataFromV0ToV1 = function (username, deviceId) {
    return loadRidesV0()
        .then((rides) => {
            if (rides.length === 0 || rides[0].deviceId) {
                return null;
            }

            //Start migrating
            console.log('migrating ' + rides.length + ' rides');
            emptyStorageV0();

            //Create rides
            let newRides = rides.map(function (ride) {
                return {
                    id: utils.createRideId(username, deviceId, ride.date),
                    deviceId: deviceId,
                    date: ride.date,
                    analytics: ride.analytics,
                };
            });
            let addRidePromise = localRidesRepository.saveRides(newRides, deviceId);


            //Create ridePositions
            let newRidePositions = rides.map(function (ride) {
                let positions = ride.positions.map(function (position) {
                    return {
                        timestamp: position.timestamp,
                        speed: position.speed,
                        gait: position.gait,
                        accuracy: position.accuracy,
                        loc: {
                            x: position.longitude,
                            y: position.latitude,
                        },
                    };
                });
                return {
                    id: utils.createRideId(username, deviceId, ride.date),
                    positions: positions,
                };
            });
            let addRidePositionsPromise = localRidePositionsRepository.save(newRidePositions, deviceId);



            //Create userConfig
            let totalDistance = rides.map(function (ride) {
                return ride.analytics.distance;
            })
                .reduce(function (last, now) {
                    return last + now;
                }, 0);

            let rideIds = rides.map(function (ride) {
                return utils.createRideId(username, deviceId, ride.date);
            })

            console.log('migrating totalDistance ' + totalDistance)
            let userConfig = userConfigRepository.create(username, totalDistance, rideIds);
            let addUserConfigPromise = userConfigRepository.saveUserConfig(userConfig)



            //Update appConfig
            let updateAppConfig = appConfigRepository.saveStorageVersion(1);

            return Promise.all([addRidePromise,addRidePositionsPromise, addUserConfigPromise, updateAppConfig])
        })

        //FIXME Sync to put back
        //Sync
        // .then((promiseResponses) => {
        //     if(promiseResponses=!null){
        //         storageService.sync();
        //     }
        // })
};

export const loadRidesV0 = () => {
    return AsyncStorage.getItem('rides')
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        });
}

export const emptyStorageV0 = () => {
    AsyncStorage.removeItem('totalDistance');
    AsyncStorage.removeItem('rides');
}