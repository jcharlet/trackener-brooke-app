import moment from "moment";
import * as ridesRepository from "./trackenerApi/ridesRepository";
import * as localRidesRepository from "./localStorage/localRidesRepository";
import BackgroundTimer from 'react-native-background-timer';
import * as userConfigRepository from "./localStorage/userConfigRepository";

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
}