'use strict';
const React = require('react');
module.exports = require('react-native-mock');

import * as migrateData from "../migrateData";
import * as generateFakeData from "../generateFakeData";
import {RIDES_COLL} from "../../localStorage/localRidesRepository";
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
        expect(rides.length).toBe(6)
        expect.assertions(1);
    })
})
