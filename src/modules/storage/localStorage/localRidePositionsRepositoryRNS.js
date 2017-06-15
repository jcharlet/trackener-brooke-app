import localStorage from "./localStorage"
export const RIDE_POSITIONS_COLL = 'ridePositions';
import moment from "moment";
import FAKE_POSITIONS from '../../../../resources/fake_v2_positions_light.json';
import {POSITION_FIELDS} from "../../geoloc/geolocService";


// export const save = (rides) => {
//     return empty()
//         .then(() => {
//             // console.log("start adding " + moment().valueOf());
//             return pushAllRidesSequentially(rides).then(function() {
//                 // console.log('all done ' + moment().valueOf());
//             });
//         })
// }
// function pushAllRidesSequentially(rides) {
//     return rides.reduce(function(promise, ride) {
//         return promise.then(function() {
//             return addRide(ride)
//                 .then(()=> {
//                     // console.log("ride added " + moment().valueOf());
//                     return Promise.resolve();
//                 })
//                 .catch((error)=>{
//                     // console.log("error happened " + error);
//                     return error;
//                 });
//         });
//     }, Promise.resolve());
// }
//
// export const loadAllRides = () => {
//     return localStorage.getAllDataForKey(RIDE_POSITIONS_COLL)
// };
//
// export const loadById = (id) => {
//     return localStorage.load({
//         key: RIDE_POSITIONS_COLL,   // Note: Do not use underscore("_") in key!
//         id: id,
//
//         // autoSync(default true) means if data not found or expired,
//         // then invoke the corresponding sync method
//         autoSync: true,
//
//         // syncInBackground(default true) means if data expired,
//         // return the outdated data first while invoke the sync method.
//         // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
//         syncInBackground: true,
//
//         // you can pass extra params to sync method
//         // see sync example below for example
//         // syncParams: {
//         //     extraFetchOptions: {
//         //         // blahblah
//         //     },
//         //     someFlag: true,
//         // },
//     })
//         .catch((reject) => {
//                 if (reject.name !== 'NotFoundError') {
//                     console.info(reject.name);
//                 }
//                 return Promise.resolve(null)
//             })
// }
//
//
// export const addRide = (ride) => {
//     return localStorage.save({
//         key: RIDE_POSITIONS_COLL,   // Note: Do not use underscore("_") in key!
//         id: ride.id,   // Note: Do not use underscore("_") in key!
//         data: ride,
//
//         // if not specified, the defaultExpires will be applied instead.
//         // if set to null, then it will never expire.
//     });
// }
//
// export const removeRide = (id: string) => {
//     return localStorage.remove({
//         key: RIDE_POSITIONS_COLL,
//         id: id
//     });
// }
//
// export const empty = () => {
//     if (localStorage._m && localStorage._m.__keys__[RIDE_POSITIONS_COLL]) {
//         return localStorage.clearMapForKey(RIDE_POSITIONS_COLL);
//     }
//     return Promise.resolve();
// }