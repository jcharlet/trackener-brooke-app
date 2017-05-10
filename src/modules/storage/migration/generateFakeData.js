import * as storageService from "../storageService";
import * as localRidesRepository from "../localStorage/localRidesRepository";
import {
    AsyncStorage
} from 'react-native';
// import FAKE_RIDES_JSON_FILE_PATH from '../../../../resources/fakeSmall.json';
import FAKE_RIDES_JSON_FILE_PATH from '../../../../resources/fakeSmall5doc60minMinified.json';
import moment from "moment";

const NB_OF_COPIES = 1;


export const generateFakeData = () => {
    let rides = generateRidesFromJsonFile(FAKE_RIDES_JSON_FILE_PATH, NB_OF_COPIES);
    AsyncStorage.setItem('rides', JSON.stringify(rides));
    AsyncStorage.setItem('totalDistance', '70829.0611293194');
}

export const generateRidesFromJsonFile= (rides, nbOfCopies) =>{
    console.log("generate data ");
    let newRides = [];
    rides.map((ride)=>{

        for (let i=0; i< nbOfCopies; i++){
            //add 1 day to each ride + ride position
            let date = moment(ride.date);
            date.add(i, 'days');

            let positions = ride.positions;
            positions.map((position)=>{
                let date = moment(position.timestamp);
                date.add(i, 'days');
                return {
                    ...position,
                    timestamp:date.valueOf()
                }

            })

            newRides.push({
                ...ride,
                positions:positions,
                date:date.format(),
            });

        }
    })
    newRides.sort(function(a,b) {return (moment(a.date).valueOf() > moment(b.date).valueOf()) ? 1 : -1;} );

    return newRides;

}