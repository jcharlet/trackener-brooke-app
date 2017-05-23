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

export const save = (username: string, deviceId: string, isOffline: boolean) => {
    return load()
        .then((appConfig) => {
            appConfig = {
                ...appConfig,
                username: username,
                deviceId: deviceId,
                isOffline: isOffline,
            }
            return AsyncStorage.setItem(APP_CONFIG_COLL, JSON.stringify(appConfig));
        })
}

export const saveStorageVersion = (storageVersion) => {
    return load()
        .then((appConfig) => {
            appConfig = {
                ...appConfig,
                storageVersion: storageVersion,
            }
            return AsyncStorage.setItem(APP_CONFIG_COLL, JSON.stringify(appConfig));
        })
}

export const getDeviceId = () => {
    return load()
        .then((appConfig) => {
            if (appConfig) {
                return appConfig.deviceId
            }
            return null
        })
}
export const getUsername = () => {
    return load()
        .then((appConfig) => {
            if (appConfig) {
                return appConfig.username
            }
            return null
        })
}
export const isOffline = () => {
    return load()
        .then((appConfig) => {
            if (appConfig) {
                return appConfig.isOffline
            }
            return null
        })
}
export const getStorageVersion = () => {
    return load()
        .then((appConfig) => {
            if (appConfig) {
                return appConfig.storageVersion
            }
            return null
        })
}

export const empty = () => {
    AsyncStorage.setItem(APP_CONFIG_COLL, '');
}