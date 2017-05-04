import * as storageService from "../storageService";
import * as localRidesRepository from "../localStorage/localRidesRepository";
import {
    AsyncStorage
} from 'react-native';
// import fakeRides from './fakeSmall.json';
import fakeRides from './fakeSmall5doc60minMinified.json';
export const generateFakeData = () => {
    console.log(fakeRides);
    AsyncStorage.setItem('rides', JSON.stringify(fakeRides));
    AsyncStorage.setItem('totalDistance', '70829.0611293194');
}