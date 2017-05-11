import moment from "moment";
import * as ridesRepository from "./trackenerApi/ridesRepository";
import * as localRidesRepository from "./localStorage/localRidesRepository";
import * as BackgroundTimer from "react-native-background-timer";
import * as userConfigRepository from "./localStorage/userConfigRepository";
import * as appConfigRepository from "./localStorage/appConfigRepository";
import * as localRidePositionsRepository from "./localStorage/localRidePositionsRepository";
import * as utils from "../../util/utils";

export const USERNAME = 'g';
export const DEVICE_ID = 'g';

export const initApp = (username, deviceId) => {
    appConfigRepository.save(username, deviceId)
}

export const loadTotalDistance = () => {
    return appConfigRepository.getUsername()
        .then((username) => {
            return userConfigRepository.loadTotalDistance(username);
        })
};

export const addToTotalDistanceAndSave = (rideDistance) => {
    return appConfigRepository.getUsername()
        .then((username) => {
            return userConfigRepository.addToTotalDistanceAndSave(rideDistance, username);
        })
};
export const saveTotalDistance = (totalDistance) => {
    return appConfigRepository.getUsername()
        .then((username) => {
            return userConfigRepository.saveTotalDistance(totalDistance, username);
        })
};

export const loadRidesByDeviceId = () => {
    return appConfigRepository.getDeviceId()
        .then((deviceId) => {
            return localRidesRepository.loadRidesByDeviceId(deviceId);
        })
}
export const addRide = (ride) => {
    return appConfigRepository.load()
        .then((appConfig) => {
            let id = utils.createRideId(appConfig.username ,appConfig.deviceId ,ride.date);
            let addRidePromise = localRidesRepository.addRide({
                id: id,
                deviceId: appConfig.deviceId,
                date: ride.date,
                analytics: ride.analytics,
            });

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
            let addRidePositionsPromise = localRidePositionsRepository.addRide({
                id: id,
                positions: positions,
            });

            return Promise.all([addRidePromise,addRidePositionsPromise])
        })
}
export const removeRide = (date: string) => {
    return appConfigRepository.load()
        .then((appConfig) => {
            let id = appConfig.username + "." + appConfig.deviceId + "." + date;

            let removeRidePromise =  localRidesRepository.removeRide(id);
            let removeRidePositionsPromise =  localRidePositionsRepository.removeRide(id);

            return Promise.all([removeRidePromise,removeRidePositionsPromise])
        })
        .then((appConfig) => {
        })
}

export const sync = () => {
    // TODO syncing to complete and improve (without timer)
    BackgroundTimer.setTimeout(() => {
        let syncDate = moment();
        // let newRides = ridesRepository.findAllWithSyncDateGtThan(syncDate)
        //     .then((rides) => {
        //         localRidesRepository.addRides(rides);
        //         return rides;
        //     })


        // let removedRidesDates = removedRidesRepository.findAllWithSyncDateGtThan(syncDate)
        //     .then((rides) => {
        //         localRidesRepository.removeRides(rides);
        //         return rides;
        //     })

        let ridesToPush = localRidesRepository.findAllUnsynced()
            .then((rides) => {
                if (rides && rides.length > 0) {
                    ridesRepository.saveAll(rides)
                        .then((rides) => {
                            localRidesRepository.flagAsSynced();
                        })
                }
                return rides;
            })

        //localGlobalStatsRepository.addToTotalDistanceAndSave(totalDistance);

        //if(newRides || removedRides || ridesToPush){
        //    localSyncInfoRepository.updateSyncInfo(syncDate);
        //}else{
        //    localSyncInfoRepository.updateSyncInfoCheckDate(syncDate);
        //}
    }, 3000);
}

export const emptyStorage = () => {
    localRidesRepository.saveRides([]);
    localRidePositionsRepository.save([]);
    userConfigRepository.emptyUserConfigs();
    appConfigRepository.empty();
}
