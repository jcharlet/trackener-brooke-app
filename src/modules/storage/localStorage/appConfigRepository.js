import {
    AsyncStorage
} from 'react-native';

export const APP_CONFIG_COLL = 'appConfig';


export const load = () => {
    return AsyncStorage.getItem(APP_CONFIG_COLL)
        .then((appConfig) => {
            if (appConfig) {
                return JSON.parse(appConfig);
            }
            return null;
        });
}

export const save = (username, deviceId) => {
    let appConfig = {
        username: username,
        deviceId: deviceId
    }
    return AsyncStorage.setItem(APP_CONFIG_COLL, JSON.stringify(appConfig));
}

export const getDeviceId = () => {
    return load()
        .then((appConfig) => {
            return appConfig.deviceId
        })
}
export const getUsername = () => {
    return load()
        .then((appConfig) => {
            return appConfig.username
        })
}

export const empty = () => {
    AsyncStorage.setItem(APP_CONFIG_COLL, '');
}