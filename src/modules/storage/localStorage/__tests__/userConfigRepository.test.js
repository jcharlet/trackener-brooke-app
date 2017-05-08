'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');
const userConfigRepository = require("../userConfigRepository")
import {RIDE_TO_ADD, RIDES} from "../__mocks__/fakeRides"
import {USER_CONFIG_COLL} from "../userConfigRepository";
import {USER_CONFIG_TO_UPDATE, USER_CONFIGS} from "../__mocks__/userConfigs";

import MockStorage from '../__mocks__/MockStorage';


const storageCache = {
    userConfigs: JSON.stringify(USER_CONFIGS)
};

const AsyncStorage = new MockStorage(storageCache);
jest.setMock('AsyncStorage', AsyncStorage)

beforeEach(() => {
    return AsyncStorage.setItem(USER_CONFIG_COLL, JSON.stringify(USER_CONFIGS))
});

describe('userConfigRepository', () => {
    it('loads all user configs correctly', () => {
        return userConfigRepository.loadAllUserConfigs()
        /*
         Then I find 3 userConfigs
         */
            .then((userConfigs) => {
                expect(JSON.stringify(userConfigs)).toBe(JSON.stringify(USER_CONFIGS))
            })
    });
    it('loads user config correctly', () => {
        return userConfigRepository.loadUserConfig(USER_CONFIGS[0].username)
        /*
         Then I find user config
         */
            .then((userConfig) => {
                expect(JSON.stringify(userConfig)).toBe(JSON.stringify(USER_CONFIGS[0]))
            })
    });
    it('loads total distance correctly', () => {
        return userConfigRepository.loadTotalDistance(USER_CONFIGS[0].username)
        /*
         Then I find 3 userConfigs
         */
            .then((totalDistance) => {
                expect(totalDistance).toBe(USER_CONFIGS[0].totalDistance)
            })
    });
    it('saves total distance correctly', () => {
        return userConfigRepository.saveTotalDistance(USER_CONFIG_TO_UPDATE.totalDistance,USER_CONFIGS[1].username)
        /*
         Then I have 2 userConfigs in total
         */
            .then(() => {
                return userConfigRepository.loadAllUserConfigs()
            }).then((userConfigs) => {
                expect(userConfigs.length).toBe(2)
            })
            /*
             Then new distance is correct
             */
            .then(() => {
                return userConfigRepository.loadUserConfig(USER_CONFIGS[1].username)
            }).then((userConfig) => {
                expect(userConfig.totalDistance).toBe(USER_CONFIG_TO_UPDATE.totalDistance)
            })
    });
    it('saves user config correctly', () => {
        return userConfigRepository.saveUserConfig(USER_CONFIG_TO_UPDATE)
        /*
         Then I have 2 userConfigs in total
         */
            .then(() => {
                return userConfigRepository.loadAllUserConfigs()
            }).then((userConfigs) => {
                expect(userConfigs.length).toBe(2)
            })
            /*
             Then new distance is correct
             */
            .then(() => {
                return userConfigRepository.loadUserConfig(USER_CONFIG_TO_UPDATE.username)
            }).then((userConfig) => {
                expect(userConfig.totalDistance).toBe(USER_CONFIG_TO_UPDATE.totalDistance)
            })
    });
    it('adds to total distance correctly', () => {
        return userConfigRepository.addToTotalDistanceAndSave(100,USER_CONFIGS[1].username)
        /*
         Then I have 2 userConfigs in total
         */
            .then(() => {
                return userConfigRepository.loadAllUserConfigs()
            }).then((userConfigs) => {
                expect(userConfigs.length).toBe(2)
            })
            /*
             Then new distance is correct
             */
            .then(() => {
                return userConfigRepository.loadUserConfig(USER_CONFIGS[1].username)
            }).then((userConfig) => {
                expect(userConfig.totalDistance).toBe(USER_CONFIGS[1].totalDistance+100)
            })
    });
});
