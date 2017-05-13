'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');
const appConfigRepository = require("../appConfigRepository")

import {mockStorage} from '../__mocks__/MockStorage';
import {APP_CONFIG_MOCK} from "../__mocks__/appConfigs";
import {APP_CONFIG_COLL} from "../appConfigRepository";

const storageCache = {
    appConfig: JSON.stringify(APP_CONFIG_MOCK)
};

beforeEach(() => {
    return mockStorage.setItem(APP_CONFIG_COLL, JSON.stringify(APP_CONFIG_MOCK))
});

describe('appConfigRepository', () => {
    it('loads config correctly', () => {
        expect.assertions(1);
        return appConfigRepository.load()
            .then((value) => {
                expect(JSON.stringify(value)).toBe(JSON.stringify(APP_CONFIG_MOCK))
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
                expect(JSON.stringify(value)).toBe(JSON.stringify({username:username,deviceId:deviceId}))
                mockStorage.clear();
            })
    });
    it('returns deviceId correctly', () => {
        expect.assertions(1);
        return appConfigRepository.getDeviceId()
            .then((value) => {
                expect(value).toBe(APP_CONFIG_MOCK.deviceId)
            })
    });
    it('returns username correctly', () => {
        expect.assertions(1);
        return appConfigRepository.getUsername()
            .then((value) => {
                expect(value).toBe(APP_CONFIG_MOCK.username)
            })
    });

});
