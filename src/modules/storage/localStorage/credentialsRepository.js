import * as Keychain from 'react-native-keychain';

const SERVER="trackenerApi";

export const saveCredentials= (username, password) =>{
    Keychain
        .setInternetCredentials(SERVER, username, password)
        .then(function() {
            console.log('Credentials saved successfully!');
        });
}

export const getCredentials= () => {
    return Keychain
        .getInternetCredentials(SERVER)
        .then((credentials) =>{
            if (credentials) {
                console.log('Credentials successfully loaded for user ' + credentials.username);
                return credentials;
            }
        });
}

export const resetCredentials= () => {
    Keychain
        .resetInternetCredentials(SERVER)
        .then(function () {
            console.log('Credentials successfully deleted');
        });
}