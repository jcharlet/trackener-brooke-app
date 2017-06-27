'use strict';
const React = require('react');
module.exports = require('react-native-mock');
// const ReactTestRenderer = require('react-test-renderer');

var rewire = require('babel-plugin-rewire');
import {GAIT, POSITION_FIELDS} from "../../../../modules/geoloc/geolocService";

const liveTrackerStartedActions = require('../liveTrackerStartedActions');

let POSITIONS = [
    [
        -0.3342833333333333,
        51.3751,
        1493853617533,
        0,
        "STOP",
        20
    ], [
        -0.33413,
        51.38519833333333,
        1493853619526,
        0,
        "STOP",
        20
    ], [
        -0.33421,
        51.39529833333333,
        1493853621526,
        0,
        "STOP",
        20
    ], [
        -0.33430666666666664,
        51.364999999999995,
        1493853623527,
        0,
        "STOP",
        20
    ]
]
let EXPECTED_RESULTS = [
    [
        0,
        0,
        "STOP"
    ], [
        1124.191807605937,
        1993,
        "STOP"
    ], [
        1124.3405920518303,
        2000,
        "STOP"
    ], [
        3372.8017651981254,
        2001,
        "STOP"
    ]]

let UPDATED_POSITIONS = [
    [
        -0.3342833333333333,
        51.3751,
        1493853617533,
        0,
        "TROT",
        20,
        0,
        0,
    ], [
        -0.33413,
        51.38519833333333,
        1493853619526,
        0,
        "WALK",
        20,
        1124.191807605937,
        1993,
    ], [
        -0.33421,
        51.39529833333333,
        1493853621526,
        0,
        "STOP",
        20,
        1124.3405920518303,
        2000,
    ], [
        -0.33430666666666664,
        51.364999999999995,
        1493853623527,
        0,
        "STOP",
        20,
        3372.8017651981254,
        2001,
    ]
]

let EXPECTED_GAIT_DISTRIBUTION = [
    {"index": 0, "number": 4497, "name": GAIT.STOP},
    {"index": 1, "number": 1124, "name": GAIT.WALK},
    {"index": 2, "number": 0, "name": GAIT.TROT},
    {"index": 3, "number": 0, "name": GAIT.CANTER},
]

let RESTART_TIME_BETWEEN_2ND_AND_3RD = [1493853619530];

beforeEach(() => {
});

describe('liveTrackerStartedActions', () => {
    it('updates all positions correctly when no pause nor delay', () => {
        //given 4 POSITIONS with no pause and no delay between them

        //when I update POSITIONS
        let updatedPositions = liveTrackerStartedActions.updatePositionsOnDurationSpeedGait(POSITIONS, []);
        /*
         Then I get expected distances and durations
         */
        expect(updatedPositions.length).toBe(4)
        for (let i = 0; i < updatedPositions.length; i++) {
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DISTANCE]).toBe(EXPECTED_RESULTS[i][0])
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DURATION]).toBe(EXPECTED_RESULTS[i][1] / 1000)
        }
    });
    it('updates all positions correctly when pause but no delay', () => {
        //given 4 POSITIONS with pause but no delay between them
        let expectedResults = Object.assign([], EXPECTED_RESULTS);
        expectedResults[2] = [0, 0, "STOP"];

        //when I update POSITIONS
        let updatedPositions = liveTrackerStartedActions.updatePositionsOnDurationSpeedGait(POSITIONS, RESTART_TIME_BETWEEN_2ND_AND_3RD);
        /*
         Then I get expected distances and durations
         */
        expect(updatedPositions.length).toBe(4)
        for (let i = 0; i < updatedPositions.length; i++) {
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DISTANCE]).toBe(expectedResults[i][0])
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DURATION]).toBe(expectedResults[i][1] / 1000)
        }
    })
    it('updates all positions correctly when no pause but with delay', () => {
        //given 4 POSITIONS with no pause and no delay between them
        let positions = Object.assign([], POSITIONS);
        positions[2][POSITION_FIELDS.TIMESTAMP] = positions[2][POSITION_FIELDS.TIMESTAMP] + 18000;
        positions[3][POSITION_FIELDS.TIMESTAMP] = positions[3][POSITION_FIELDS.TIMESTAMP] + 18000;

        let expectedResults = Object.assign([], EXPECTED_RESULTS);
        expectedResults[2][1] = expectedResults[2][1] + 18000;
        expectedResults[2][2] = "CANTER";

        //when I update POSITIONS
        let updatedPositions = liveTrackerStartedActions.updatePositionsOnDurationSpeedGait(positions, []);
        /*
         Then I get expected distances and durations
         */
        expect(updatedPositions.length).toBe(4)
        for (let i = 0; i < updatedPositions.length; i++) {
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DURATION]).toBe(expectedResults[i][1] / 1000)
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DISTANCE]).toBe(expectedResults[i][0])
            expect(updatedPositions[i][POSITION_FIELDS.GAIT]).toBe(expectedResults[i][2])
        }
    })
    it('updates all positions correctly with pause and delay', () => {
        //given 4 POSITIONS with pause and delay between them
        let positions = Object.assign([], POSITIONS);
        positions[2][POSITION_FIELDS.TIMESTAMP] = positions[2][POSITION_FIELDS.TIMESTAMP] + 18000;
        positions[3][POSITION_FIELDS.TIMESTAMP] = positions[3][POSITION_FIELDS.TIMESTAMP] + 18000;

        let expectedResults = Object.assign([], EXPECTED_RESULTS);
        expectedResults[2][1] = expectedResults[2][1] + 18000;
        expectedResults[2] = [0, 0, "STOP"];

        //when I update POSITIONS
        let updatedPositions = liveTrackerStartedActions.updatePositionsOnDurationSpeedGait(positions, RESTART_TIME_BETWEEN_2ND_AND_3RD);
        /*
         Then I get expected distances and durations
         */
        expect(updatedPositions.length).toBe(4)
        for (let i = 0; i < updatedPositions.length; i++) {
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DISTANCE]).toBe(expectedResults[i][0])
            expect(updatedPositions[i][POSITION_FIELDS.EXTRA_DURATION]).toBe(expectedResults[i][1] / 1000)
        }
    })
    it('updates all positions correctly with pause and delay', () => {
        let gaitDistribution = liveTrackerStartedActions.createTimeSpentByGaitAnalytics(UPDATED_POSITIONS);
        expect(JSON.stringify(gaitDistribution)).toBe(JSON.stringify(EXPECTED_GAIT_DISTRIBUTION))
    })
});
