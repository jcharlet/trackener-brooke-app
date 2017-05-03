import {
    AsyncStorage
} from 'react-native';

export const USER_CONFIG_COLL = 'userConfig';
export const DEVICE_ID = 'g';

export const loadAllUserConfigs=()=>{
    return AsyncStorage.getItem(USER_CONFIG_COLL)
    .then((userConfigs) => {
        if (userConfigs) {
            return JSON.parse(userConfigs);
        }
        return [];
    });
}
export const loadUserConfig=(username)=>{
    return loadAllUserConfigs()
        .then((userConfigs)=>{
            return userConfigs.map(userConfig => {
                if(userConfig.username==username){
                    return userConfig;
                }
            })
        }).then((userConfigs)=>{
            return userConfigs.filter(function(e){return e});
        }).then((userConfigs)=>{
            if(userConfigs.length>0){
                return userConfigs[0]
            }
            return null;
        })
}

export const loadTotalDistance = () => {
    return loadUserConfig(DEVICE_ID)
        .then((userConfig) => {
            if (userConfig && userConfig.totalDistance && !isNaN(userConfig.totalDistance)) {
                return Number(userConfig.totalDistance);
            }
            return 0;
        })
};

export const saveUserConfig =(userConfig) => {
    loadAllUserConfigs()
        .then((userConfigs) =>{
            let wasFound=false;
            userConfigs = userConfigs.map(currentUserConfig => {
                if(currentUserConfig.username==userConfig.username){
                    wasFound=true
                    return userConfig;
                }
                return currentUserConfig;
            })

            if(!wasFound){
                userConfigs=[...userConfigs, userConfig]
            }

            return AsyncStorage.setItem(USER_CONFIG_COLL, JSON.stringify(userConfigs));
    })
}

export const addToTotalDistanceAndSave = (rideDistance) => {
    return loadUserConfig(DEVICE_ID)
        .then((userConfig) => {
            if(!userConfig || !userConfig.totalDistance || isNaN(userConfig.totalDistance)){
                userConfig = {totalDistance:0,username:DEVICE_ID}
            }
            userConfig.totalDistance += rideDistance;
            return userConfig;
        }).then((userConfig) =>{
            saveUserConfig(userConfig);
            return userConfig.totalDistance;
        })
};
export const saveTotalDistance = (totalDistance) => {
    return loadUserConfig(DEVICE_ID)
        .then((userConfig) => {
            if(!userConfig || !userConfig.totalDistance || isNaN(userConfig.totalDistance)){
                userConfig = {totalDistance:0,username:DEVICE_ID}
            }
            userConfig.totalDistance += totalDistance;
            return userConfig;
        }).then((userConfig) =>{
            return saveUserConfig(userConfig);
        })
};

export const emptyUserConfigs = () => {
    AsyncStorage.setItem(USER_CONFIG_COLL, '');
}