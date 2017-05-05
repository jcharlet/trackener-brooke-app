'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');
const localRidesRepository = require("../localRidesRepository")
import {RIDE_TO_ADD, RIDES} from "../__mocks__/fakeRides"

import MockStorage from '../__mocks__/MockStorage';


const storageCache = {
    rides: JSON.stringify(RIDES)
};

const AsyncStorage = new MockStorage(storageCache);
jest.setMock('AsyncStorage', AsyncStorage)

beforeEach(() => {
    return localRidesRepository.saveRides(RIDES)
});

describe('localRidesRepository', () => {
    it('loads all rides correctly', () => {
        return localRidesRepository.loadAllRides()
        /*
         Then I find 3 rides
         */
            .then((rides) => {
                expect(rides.length).toBe(3)
            })
    });
    it('loads all rides by deviceId correctly', () => {
        return localRidesRepository.loadRidesByDeviceId("007")
        /*
         Then I find 2 rides for 007
         */
            .then((rides) => {
                expect(rides.length).toBe(2)
            })
    });
    it('loads all unsynced rides correctly', () => {
        /*
         Then I find 2 unsynced rides
         */
        return localRidesRepository.findAllUnsynced()
            .then((rides) => {
                expect(rides.length).toBe(2)
            })
    });
    it('sync rides correctly', () => {
        return localRidesRepository.flagAsSynced()
        /*
         Then I have 3 synced rides
         */
            .then(() => {
                return localRidesRepository.loadAllRides()
            }).then((rides) => {
                let nbOfSyncedRides = rides.map((ride) => {
                    if (ride.synced) {
                        return ride;
                    }
                }).length;
                expect(nbOfSyncedRides).toBe(3)
            })
    });
    it('add ride correctly', () => {
        return localRidesRepository.addRide(RIDE_TO_ADD)
        /*
         Then I have 4 rides in total
         */
            .then(() => {
                return localRidesRepository.loadAllRides()
            }).then((rides) => {
                expect(rides.length).toBe(4)
            })
            /*
             Then I have 2 rides for this deviceId
             */
            .then(() => {
                return localRidesRepository.loadRidesByDeviceId(RIDE_TO_ADD.deviceId)
            }).then((rides) => {
                expect(rides.length).toBe(2)
                return rides
            })
            /*
             then those 2 rides are the ones I had before + the new one (from date and distance)
             */
            .then((rides) => {
                expect(rides[0]['date']).toBe(RIDES[2]['date'])
                expect(rides[1]['date']).toBe(RIDE_TO_ADD['date'])
                expect(rides[0].analytics.distance).toBe(RIDES[2].analytics.distance)
                expect(rides[1].analytics.distance).toBe(RIDE_TO_ADD.analytics.distance)
            })
    });
    it('remove ride correctly', () => {
        return localRidesRepository.removeRide(RIDES[2].date, RIDES[2].deviceId)
        /*
         Then I have 2 rides in total
         */
            .then(() => {
                return localRidesRepository.loadAllRides()
            }).then((rides) => {
                expect(rides.length).toBe(2)
            })
            /*
             Then I have no more ride for that deviceId
             */
            .then(() => {
                return localRidesRepository.loadRidesByDeviceId(RIDES[2].deviceId)
            }).then((rides) => {
                expect(rides.length).toBe(0)
            })
    });
    // it('save rides correctly', () => {
    //     let username = 'arthur';
    //     let deviceId = '003';
    //     return localRidesRepository.save(username, deviceId)
    //         .then(() => {
    //             return localRidesRepository.saveRides()
    //         }).then((rides) => {
    //             expect(JSON.stringify(rides)).toBe(storageCache.rides)
    //             AsyncStorage.clear();
    //         })
    // });

});
