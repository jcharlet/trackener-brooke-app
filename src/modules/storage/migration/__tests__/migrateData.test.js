'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');

import * as migrateData from "../migrateData";
import MockBackgroundTimer from "../__mocks__/MockBackgroundTimer";
import {RIDES_COLL} from "../../localStorage/localRidesRepository";
import * as userConfigRepository from "../../localStorage/userConfigRepository";
import * as localRidesRepository from "../../localStorage/localRidesRepository";
import * as localRidePositionsRepository from "../../localStorage/localRidePositionsRepository";
import RIDES from '../../../../../resources/fakeSmall.json';
import {mockStorage} from '../../localStorage/__mocks__/MockStorage';

jest.mock("../../../../../node_modules/react-native-background-timer")

beforeEach(() => {
    mockStorage.setItem('rides', JSON.stringify(RIDES))
    mockStorage.setItem('totalDistance', '7829.0611293194')
});

describe('migrateData', () => {
    it('migrates data correctly', () => {

        //given mock dataset
        // BackgroundTimer.setTimeout();
        //when I migrate data
        return migrateData.migrate('gg', '009')

        // then I should get 2 rides
            .then(() => {
                return localRidesRepository.loadAllRides()
                    .then((rides) => {
                        expect(rides.length).toBe(2)
                    })
            })

                //FIXME still borken on localRidePositionsRepository
            // then I should get 2 rides with all their positions
            .then(() => {
                return localRidePositionsRepository.loadAllRides()
                    .then((rides) => {
                        expect(rides.length).toBe(2)
                    })
            })

            // then I should get a user with the rides Ids
            .then(() => {
                return userConfigRepository.loadAllUserConfigs()
                    .then((userConfigs) => {
                        expect(userConfigs.length).toBe(1)
                    })
            })


            .then(() => {
                expect.assertions(3);
            })
    })
    it('still runs if nothing to migrate', () => {

        //given mock dataset
        mockStorage.setItem(RIDES_COLL, '')

        //when I migrate data
            .then(() => {
                return migrateData.migrate('gg', '009')

                // then I should get 2 rides
                    .then(() => {
                        return localRidesRepository.loadAllRides()
                            .then((rides) => {
                                expect(rides.length).toBe(0)
                            })
                    })
            })
    })
})
