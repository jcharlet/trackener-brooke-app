export default class MockBackgroundTimer {
    constructor() {
    }

    setTimeout = jest.fn(setTimeout);

}