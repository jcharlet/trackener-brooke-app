'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');
import {RIDE_POSITIONS_TO_ADD_V1, RIDES_V1} from "../__mocks__/fakeRides"
import {POSITION_FIELDS} from "../../../geoloc/geolocService";
import {mockStorage} from "../__mocks__/MockStorage";
import * as localRidesPositionsRepository from "../localRidePositionsRepositoryRDB";
import realm from "../realmDB"


beforeEach(() => {
    localRidesPositionsRepository.empty();
    return localRidesPositionsRepository.save(RIDES_V1)
});
afterAll(() => {
    realm.close()
});

describe('localRidesPositionsRepository', () => {
    it('loads all rides positions correctly', () => {
        return localRidesPositionsRepository.loadAllPositions()
        /*
         Then I find 3 positions
         */
            .then((ridePositions) => {
                expect(ridePositions.length).toBe(3)
            })
    });
    it('loads ride positions by id', () => {
        let ridePosition= localRidesPositionsRepository.loadById(RIDES_V1[0].id)
        /*
         Then I find 2 positions for 007
         */
                expect(ridePosition.length).toBe(2)
                expect(ridePosition[0].rideId).toBe(RIDES_V1[0].id)
    });
    it('add ride correctly', () => {
        return localRidesPositionsRepository.addRide(RIDE_POSITIONS_TO_ADD_V1)
        /*
         Then I have 5 positions in total
         */
            .then(() => {
                return localRidesPositionsRepository.loadAllPositions()
            }).then((positions) => {
                expect(positions.length).toBe(5)
            })
            /*
             Then I can find this ride by its deviceId
             */
            .then(() => {
                let ridePosition=  localRidesPositionsRepository.loadById(RIDE_POSITIONS_TO_ADD_V1.id)
                expect(ridePosition[0].rideId).toBe(RIDE_POSITIONS_TO_ADD_V1.id)
                expect(ridePosition[0].date.getTime())
                    .toBe(RIDE_POSITIONS_TO_ADD_V1['positions'][0][POSITION_FIELDS.TIMESTAMP])
                return ridePosition
            })
    });
    it('remove ride correctly', () => {
        return localRidesPositionsRepository.removeRide(RIDES_V1[0].id)
        /*
         Then I have 3 positions in total
         */
            .then(() => {
                return localRidesPositionsRepository.loadAllPositions()
            }).then((positions) => {
                expect(positions.length).toBe(1)
            })
            /*
             Then I have no more ride for that deviceId
             */
            .then(() => {
                let ridePosition=  localRidesPositionsRepository.loadById(RIDES_V1[0].id)
                expect(ridePosition.length).toBe(0)
            })
    });
    it('save rides correctly', () => {
        return localRidesPositionsRepository.save([RIDE_POSITIONS_TO_ADD_V1])
            .then(() => {
                return localRidesPositionsRepository.loadAllPositions()
            }).then((positions) => {
                expect(positions.length).toBe(2)
                expect(positions[0].rideId).toBe(RIDE_POSITIONS_TO_ADD_V1.id)
            })
    });
    it('add positions correctly', () => {
        return localRidesPositionsRepository.addPosition(RIDE_POSITIONS_TO_ADD_V1.positions[0], RIDE_POSITIONS_TO_ADD_V1.id)
            .then(() => {
                let positions=  localRidesPositionsRepository.loadById(RIDE_POSITIONS_TO_ADD_V1.id)
                expect(positions.length).toBe(1)
                expect(positions[0].rideId).toBe(RIDE_POSITIONS_TO_ADD_V1.id)
            })
    });
    it('returns last position correctly', () => {
        let position = localRidesPositionsRepository.getLastPosition();
        expect(position.date.getTime()).toBe(RIDES_V1[0].positions[1][POSITION_FIELDS.TIMESTAMP])
    });

});
