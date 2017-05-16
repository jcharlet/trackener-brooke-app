import * as storageService from "../storageService";
import * as localRidesRepository from "../localStorage/localRidesRepository";
import {
    AsyncStorage
} from 'react-native';
import FAKE_RIDES_JSON_FILE_PATH from '../../../../resources/fakeSmall.json';
// import FAKE_RIDES_JSON_FILE_PATH from '../../../../resources/fakeSmall5doc60minMinified.json';
import moment from "moment";
import * as migrateData from "./migrateData";
import * as utils from "../../../util/utils";
import {POSITION_FIELDS} from "../../geoloc/geolocService";

const NB_OF_COPIES = 10;
const STORAGE_VERSION = 1;
// const STORAGE_VERSION = 0;
const username = 'gg';


export const generateFakeData = () => {
    let rides = generateRidesFromJsonFile(FAKE_RIDES_JSON_FILE_PATH, NB_OF_COPIES);

    if(STORAGE_VERSION===0){
        return Promise.all([
            AsyncStorage.setItem('rides', JSON.stringify(rides)),
            AsyncStorage.setItem('totalDistance', '70829.0611293194')
            ])
    }else if (STORAGE_VERSION===1){
        return migrateData.migrateDataFromV0ToV1(username,utils.checksum(username),rides);
    }
}

export const generateRidesFromJsonFile= (rides, nbOfCopies) =>{
    console.log("generate data ");
    let newRides = [];
    rides.map((ride)=>{

        for (let i=0; i< nbOfCopies; i++){
            //add 1 day to each ride + ride position
            let date = moment(ride.date);
            date.add(i, 'days').add(i, 'hours').add(i, 'minutes').add(i, 'seconds');

            let positions = ride.positions;
            positions.map((position)=> {
                let date = moment(position[POSITION_FIELDS.TIMESTAMP]);
                date.add(i, 'days').add(i, 'hours').add(i, 'minutes').add(i, 'seconds');
                position[POSITION_FIELDS.TIMESTAMP]=date.valueOf();
                return position;
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