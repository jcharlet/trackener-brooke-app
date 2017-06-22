jest.mock('bugsnag-react-native', () => ({
    Client: jest.fn(),
    Configuration: jest.fn()
}));