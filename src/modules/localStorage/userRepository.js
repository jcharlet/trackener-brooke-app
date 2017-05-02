import * as Keychain from 'react-native-keychain';

const server="trackenerApi";

export const saveCredentials= (username, password) =>{
    Keychain
        .setInternetCredentials(server, username, password)
        .then(function() {
            console.log('Credentials saved successfully!');
        });
}

export const getCredentials= () => {
    return Keychain
        .getInternetCredentials(server)
        .then((credentials) =>{
            if (credentials) {
                console.log('Credentials successfully loaded for user ' + credentials.username);
                return credentials;
            }
        });
}

export const resetCredentials= () => {
    Keychain
        .resetInternetCredentials(server)
        .then(function () {
            console.log('Credentials successfully deleted');
        });
}