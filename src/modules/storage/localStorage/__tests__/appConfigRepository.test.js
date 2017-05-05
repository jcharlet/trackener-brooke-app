'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');
const appConfigRepository = require("../appConfigRepository")

import MockStorage from '../__mocks__/MockStorage';
import {APP_CONFIG_COLL} from "../appConfigRepository";

const appConfigJson = {
    username: 'jeanMichel',
    deviceId: '007'
};
const storageCache = {
    appConfig: JSON.stringify(appConfigJson)
};

const AsyncStorage = new MockStorage(storageCache);
jest.setMock('AsyncStorage', AsyncStorage)

beforeEach(() => {
    return AsyncStorage.setItem(APP_CONFIG_COLL, JSON.stringify(appConfigJson))
});

describe('appConfigRepository', () => {
    it('loads config correctly', () => {
        expect.assertions(1);
        return appConfigRepository.load()
            .then((value) => {
                expect(JSON.stringify(value)).toBe(JSON.stringify(appConfigJson))
            })
    });
    it('saves config correctly', () => {
        expect.assertions(1);
        let username = 'arthur';
        let deviceId = '003';
        return appConfigRepository.save(username, deviceId)
            .then(() => {
                return appConfigRepository.load()
            }).then((value) => {
                expect(JSON.stringify(value)).toBe(storageCache.appConfig)
                AsyncStorage.clear();
            })
    });
    it('returns deviceId correctly', () => {
        expect.assertions(1);
        return appConfigRepository.getDeviceId()
            .then((value) => {
                expect(value).toBe(appConfigJson.deviceId)
            })
    });
    it('returns username correctly', () => {
        expect.assertions(1);
        return appConfigRepository.getUsername()
            .then((value) => {
                expect(value).toBe(appConfigJson.username)
            })
    });

});
