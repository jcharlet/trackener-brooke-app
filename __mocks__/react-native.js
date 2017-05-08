const rn = require('react-native')
jest.mock('Linking', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        openURL: jest.fn(),
        canOpenURL: jest.fn(),
        getInitialURL: jest.fn(),
    }
})
jest.mock('react-native-keychain', () => {
    return {
        getInternetCredentials: jest.fn(() => {return Promise.resolve()}),
    }
})
module.exports = rn