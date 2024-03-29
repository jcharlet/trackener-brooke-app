'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');
import {RIDE_POSITIONS_TO_ADD_V1, RIDES_V1} from "../__mocks__/fakeRides"
import {POSITION_FIELDS} from "../../../geoloc/geolocService";
import {mockStorage} from "../__mocks__/MockStorage";
import * as localRidesPositionsRepository from "../localRidePositionsRepositoryAS";



beforeEach(() => {
    return Promise.all(
        localRidesPositionsRepository.save(RIDES_V1),
        localRidesPositionsRepository.saveCurrent(RIDES_V1[0].positions)
    )
});

describe('localRidesPositionsRepository', () => {
    it('loads all rides positions correctly', () => {
        return localRidesPositionsRepository.loadAllRides()
        /*
         Then I find 3 rides
         */
            .then((ridePositions) => {
                expect(ridePositions.length).toBe(2)
            })
    });
    it('loads ride positions by id', () => {
        return localRidesPositionsRepository.loadById(RIDES_V1[0].id)
        /*
         Then I find 2 rides for 007
         */
            .then((ridePosition) => {
                expect(ridePosition.id).toBe(RIDES_V1[0].id)
            })
    });
    it('add ride correctly', () => {
        return localRidesPositionsRepository.addRide(RIDE_POSITIONS_TO_ADD_V1)
        /*
         Then I have 3 rides in total
         */
            .then(() => {
                return localRidesPositionsRepository.loadAllRides()
            }).then((rides) => {
                expect(rides.length).toBe(3)
            })
            /*
             Then I can find this ride by its deviceId
             */
            .then(() => {
                return localRidesPositionsRepository.loadById(RIDE_POSITIONS_TO_ADD_V1.id)
            }).then((ridePosition) => {
                expect(ridePosition.id).toBe(RIDE_POSITIONS_TO_ADD_V1.id)
                expect(ridePosition['positions'][0][POSITION_FIELDS.TIMESTAMP])
                    .toBe(RIDE_POSITIONS_TO_ADD_V1['positions'][0][POSITION_FIELDS.TIMESTAMP])
                return ridePosition
            })
    });
    it('remove ride correctly', () => {
        return localRidesPositionsRepository.removeRide(RIDES_V1[0].id)
        /*
         Then I have 2 rides in total
         */
            .then(() => {
                return localRidesPositionsRepository.loadAllRides()
            }).then((rides) => {
                expect(rides.length).toBe(1)
            })
            /*
             Then I have no more ride for that deviceId
             */
            .then(() => {
                return localRidesPositionsRepository.loadById(RIDES_V1[0].id)
            }).then((ridePosition) => {
                expect(ridePosition).toBe(null)
            })
    });
    it('save rides correctly', () => {
        return localRidesPositionsRepository.save([RIDE_POSITIONS_TO_ADD_V1])
            .then(() => {
                return localRidesPositionsRepository.loadAllRides()
            }).then((rides) => {
                expect(rides.length).toBe(1)
                expect(JSON.stringify(rides))
                    .toBe(JSON.stringify([RIDE_POSITIONS_TO_ADD_V1]))
            })
    });

    it('load current positions correctly', () => {
        return localRidesPositionsRepository.loadCurrentRidePositions()
            .then((positions) => {
                expect(positions[0][0]).toBe(RIDES_V1[0].positions[0][0])
            })
    });
    it('add positions correctly', () => {
        return localRidesPositionsRepository.addPosition(RIDE_POSITIONS_TO_ADD_V1.positions[0])
            .then(() => {
                return localRidesPositionsRepository.loadCurrentRidePositions()
            }).then((positions) => {
                expect(positions.length).toBe(3)
            })
    });
    it('returns last position correctly', () => {
        localRidesPositionsRepository.getLastPosition()
            .then((position) => {
                expect(position[POSITION_FIELDS.TIMESTAMP]).toBe(RIDES_V1[0].positions[1][POSITION_FIELDS.TIMESTAMP])
            })
    })

});
