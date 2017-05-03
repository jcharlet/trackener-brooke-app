import moment from "moment";
import * as ridesRepository from "./trackenerApi/ridesRepository";
import * as localRidesRepository from "./localStorage/localRidesRepository";
import BackgroundTimer from 'react-native-background-timer';
import * as userConfigRepository from "./localStorage/userConfigRepository";
import * as appConfigRepository from "./localStorage/appConfigRepository";

export const USERNAME = 'g';
export const DEVICE_ID = 'g';

export const initApp= (username,deviceId) => {
    appConfigRepository.save(username,deviceId)
}

export const loadTotalDistance = () => {
    return appConfigRepository.getUsername()
        .then((username)=>{
            return userConfigRepository.loadTotalDistance(username);
        })
};

export const addToTotalDistanceAndSave = (rideDistance) => {
    return appConfigRepository.getUsername()
        .then((username)=>{
        return userConfigRepository.addToTotalDistanceAndSave(rideDistance, username);
    })
};
export const saveTotalDistance = (totalDistance) => {
    return appConfigRepository.getUsername()
        .then((username)=>{
        return userConfigRepository.saveTotalDistance(totalDistance, username);
    })
};


export const saveRides = (rides) => {
    return appConfigRepository.getDeviceId()
        .then((deviceId) =>{
            return localRidesRepository.saveRides(rides, deviceId);
        })
}
export const loadRidesByDeviceId = () => {
    return appConfigRepository.getDeviceId()
        .then((deviceId) =>{
            return localRidesRepository.loadRidesByDeviceId(deviceId);
        })
}
export const addRide = (ride) => {
    return appConfigRepository.getDeviceId()
        .then((deviceId) =>{
            return localRidesRepository.addRide(ride, deviceId);
        })
}
export const removeRide = (date: string) => {
    return appConfigRepository.getDeviceId()
        .then((deviceId) =>{
            return localRidesRepository.removeRide(date, deviceId);
        })
}

export const sync = () => {
        BackgroundTimer.setTimeout(()=>{
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
        },3000);
}

export const emptyStorage = () => {
    localRidesRepository.saveRides([]);
    userConfigRepository.emptyUserConfigs();
    appConfigRepository.empty();
}