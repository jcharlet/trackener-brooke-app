'use strict';
const React = require('react');
module.exports = require('react-native-mock');

import * as migrateData from "../migrateData";
import * as generateFakeData from "../generateFakeData";
import {RIDES_COLL} from "../../localStorage/localRidesRepository";
import * as userConfigRepository from "../../localStorage/userConfigRepository";
import * as localRidesRepository from "../../localStorage/localRidesRepository";
import * as localRidePositionsRepository from "../../localStorage/localRidePositionsRepository";
import {mockStorage} from '../../localStorage/__mocks__/MockStorage';
import FAKE_RIDES_JSON_FILE_PATH from '../../../../../resources/fakeSmall.json';


beforeEach(() => {
});

describe('generateFakeData', () => {
    it('generates data like expected', () => {

        //given mock dataset
        //when I generate data data
        let rides = generateFakeData.generateRidesFromJsonFile(FAKE_RIDES_JSON_FILE_PATH, 2);

        // then I should get as many more rides as there was initially
        expect(rides.length).toBe(4)
        expect.assertions(1);
    })
})
