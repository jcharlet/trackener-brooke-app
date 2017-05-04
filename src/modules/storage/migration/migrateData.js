import * as storageService from "../storageService";
import * as localRidesRepository from "../localStorage/localRidesRepository";
import {
    AsyncStorage
} from 'react-native';

export const migrate = (deviceId) => {
    return loadTotalDistance_1_2_1()
        .then((totalDistance)=>{
            if(totalDistance==null){
                return;
            }
            console.log('migrated totalDistance ' + totalDistance)
            return storageService.saveTotalDistance(totalDistance)
                .then(()=>{
                    emptyTotalDistance_1_2_1();
                })
        })
        .then(()=>{
            return loadRides_1_2_1()
        })
        .then((rides)=>{
            if(rides.length==0 || rides[0].deviceId){
                return;
            }
            let newRides=[]
            let nbOfMigratedRides=0;
            for(let index in rides){
                let ride = rides[index];
                if(!ride.deviceId){
                    ride.deviceId=deviceId;
                    nbOfMigratedRides++;
                }
                newRides.push(ride);
            }
            if(nbOfMigratedRides>0){
                console.log('migrated ' + nbOfMigratedRides + ' rides');
                storageService.saveRides(newRides);
                storageService.sync()
            }
        })
}

export const loadRides_1_2_1 = () =>{
    return AsyncStorage.getItem('rides')
        .then((rides) => {
            if (rides) {
                return JSON.parse(rides);
            }
            return [];
        });
}

export const loadTotalDistance_1_2_1 = () =>{
    return AsyncStorage.getItem('totalDistance')
        .then((totalDistance) => {
            if (totalDistance && !isNaN(totalDistance)) {
                return Number(totalDistance);
            }
            return null;
        });
}

export const emptyTotalDistance_1_2_1 = () => {
    AsyncStorage.removeItem('totalDistance');
}