import * as storageService from "../storageService";
import * as localRidesRepository from "../localStorage/localRidesRepository";

export const migrate = (deviceId) => {
    return localRidesRepository.loadRides()
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
                localRidesRepository.saveRides(newRides);
                storageService.sync()
            }
        })
}