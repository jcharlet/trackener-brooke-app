
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import * as globalStyles from '../styles/global';

export const STATUS = {STOP: 0, START: 1, PAUSE: 2};
export const ONE_METER_IN_MILES = 0.000621;

export const DISTANCE_FILTER = 5;
export const TIMEOUT_WATCH = 20000;
export const TIMEOUT_GET = 60000;
export const MAX_AGE = 0;

export const convertMeterPerSecondToMilesPerHour = (number) => {
    return number * ONE_METER_IN_MILES * 3600;
};

export const roundWithOneDecimals = (number) => {
    return Math.round(number * 100) / 100;
};

export const roundWithThreeDecimals = (number) => {
    return Math.round(number * 1000) / 1000;
};

export const secondsToHourMinSec = (input) => {
    let separator = ":";
    let pad = function (input) {
        return input < 10 ? "0" + input : input;
    };
    return [
        pad(Math.floor(input / 3600)),
        pad(Math.floor(input % 3600 / 60)),
        pad(Math.floor(input % 60)),
    ].join(typeof separator !== 'undefined' ? separator : ':');
};


/**
 *
 var from = {lat: this.lastPosition.latitude, lon: this.lastPosition.longitude};
 var to = {lat: latitude, lon: longitude};
 this.distance += this.calculateDistance(from, to);
 * @param a
 * @param b
 */
export const calculateDistance = (a, b) => {

    // (mean) radius of Earth (meters)
    let R = 6378137;
    let PI_360 = Math.PI / 360;

    const cLat = Math.cos((a.lat + b.lat) * PI_360);
    const dLat = (b.lat - a.lat) * PI_360;
    const dLon = (b.lon - a.lon) * PI_360;

    const f = dLat * dLat + cLat * cLat * dLon * dLon;
    const c = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));

    return R * c;
};

export default class LiveTracker extends Component{

    constructor(props) {
        super(props);
        this.state = {
            status: STATUS.STOP,
            initialPosition: undefined,
            lastPosition: undefined,
            watchID: null,
            enableHighAccuracy: true,
            distance: 0,
            totalDistance: 0,
            duration: 0,
            error: null,
            speed: 0
        };
        this.startTracking = this.startTracking.bind(this);
        this.stopTracking = this.stopTracking.bind(this);
        this.pauseTracking = this.pauseTracking.bind(this);
        this.restartTracking = this.restartTracking.bind(this);
    }

    startTracking() {
        this.watchGPS(this.state.enableHighAccuracy);
        this.setState({
            status: STATUS.START,
            distance: 0,
            duration: 0,
            initialPosition: undefined,
            lastPosition: undefined,
            error: null
        });
    }

    stopTracking() {
        this.clearWatchGps();
        this.setState({status: STATUS.STOP});
    }

    pauseTracking() {
        this.clearWatchGps();
        this.setState({status: STATUS.PAUSE});
    }

    restartTracking() {
        this.watchGPS(this.state.enableHighAccuracy);
        this.setState({status: STATUS.START, initialPosition: undefined, lastPosition: undefined});
    }


    watchGPS(enableHighAccuracy) {
        navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    initialPosition: {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        timestamp: position.timestamp
                    },
                    lastPosition: {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        timestamp: position.timestamp
                    },
                    speed: position.coords.speed,
                });
            }
            , (error) => this.setState(
                {
                    error: {
                        message: error.message,
                        source: 'getCurrentPosition',
                    }
                }
            )
            , {
                enableHighAccuracy: enableHighAccuracy,
                timeout: TIMEOUT_GET,
                maximumAge: MAX_AGE
            }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
                if (this.state.lastPosition == undefined) {
                    return;
                }

                let from = {lat: this.state.lastPosition.latitude, lon: this.state.lastPosition.longitude};
                let to = {lat: position.coords.latitude, lon: position.coords.longitude};
                let distanceRidden = calculateDistance(from, to);
                this.state.distance += distanceRidden;
                this.state.totalDistance += distanceRidden;
                this.state.duration += (position.timestamp - this.state.lastPosition.timestamp) / 1000;
                this.setState({
                    lastPosition: {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        timestamp: position.timestamp
                    },
                    distance: this.state.distance,
                    speed: position.coords.speed,
                });
            }, (error) => this.setState(
            {
                error: {
                    message: error.message,
                    source: 'watchPosition',
                }
            }
            )

            , {
                enableHighAccuracy: enableHighAccuracy,
                timeout: TIMEOUT_WATCH,
                maximumAge: MAX_AGE,
                distanceFilter: DISTANCE_FILTER
            });
    }

    clearWatchGps() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    renderSecondButton() {
        switch (this.state.status) {
            default:
            case STATUS.START:
                return (
                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.secondRideButton]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={this.pauseTracking}>
                      <Text style={globalStyles.COMMON_STYLES.secondRideButtonText}>Pause</Text>
                    </TouchableOpacity>
                );
            case STATUS.PAUSE:
                return (
                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.secondRideButton]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={this.restartTracking}>
                      <Text style={[globalStyles.COMMON_STYLES.secondRideButtonText]}>Start</Text>
                    </TouchableOpacity>
                );
        }


    }

    renderTrackingStartedScreen() {
        return (
            <View style={globalStyles.COMMON_STYLES.container}>
                {/*<Text>totalDistance {((this.state.totalDistance))}{"\n"}*/}
                {/*duration {(this.state.duration)} {duration}{"\n"}*/}
                {/*distance {((this.state.distance))}{"\n"}*/}
                {/*lastPosition {JSON.stringify(this.state.lastPosition)}{"\n"}*/}
                {/*initialPosition {JSON.stringify(this.state.initialPosition)}{"\n"}*/}
                {/*error {JSON.stringify(this.state.error)}{"\n"}*/}
                {/*</Text>*/}
              <View style={globalStyles.COMMON_STYLES.infoBox}>
                <Text
                    style={[globalStyles.COMMON_STYLES.infoBoxText,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>TIME {"\n"} {secondsToHourMinSec(Math.round(this.state.duration))}</Text>
                <Text
                    style={globalStyles.COMMON_STYLES.infoBoxText}>DISTANCE {"\n"} {roundWithThreeDecimals(this.state.distance * ONE_METER_IN_MILES)}
                  mi</Text>
              </View>

              <View style={[globalStyles.COMMON_STYLES.rideButtonsView]}>
                  {this.renderSecondButton()}
                <TouchableOpacity style={[globalStyles.COMMON_STYLES.startRideButton,globalStyles.COMMON_STYLES.withSecondRideButton]}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                                  onPress={this.stopTracking}>
                  <Text style={[globalStyles.COMMON_STYLES.startRideButtonText, globalStyles.COMMON_STYLES.withSecondRideButtonText]}>Stop</Text>
                </TouchableOpacity>
              </View>

              <View style={globalStyles.COMMON_STYLES.infoBox}>
                <Text
                    style={[globalStyles.COMMON_STYLES.infoBoxText,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>SPEED {"\n"} {roundWithOneDecimals(convertMeterPerSecondToMilesPerHour(this.state.speed))}
                  mi/h</Text>
              </View>
            </View>
        );
    }

    renderDefaultScreen() {
        return (
            <View style={[globalStyles.COMMON_STYLES.container]}>
              <TouchableOpacity style={globalStyles.COMMON_STYLES.infoBox} activeOpacity={globalStyles.ACTIVE_OPACITY}>
                <Text
                    style={globalStyles.COMMON_STYLES.infoBoxStartText}>{roundWithThreeDecimals(this.state.totalDistance * ONE_METER_IN_MILES)} mi ridden</Text>
                <Image source={require('../../img/ic_navigate_next_green.png')} style={globalStyles.COMMON_STYLES.infoBoxArrow}/>
              </TouchableOpacity>

              <TouchableOpacity style={globalStyles.COMMON_STYLES.startRideButton} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                onPress={this.startTracking}>
                <Text style={globalStyles.COMMON_STYLES.startRideButtonText}>Start Ride</Text>
              </TouchableOpacity>


              <View style={[globalStyles.COMMON_STYLES.social]}>
                <TouchableOpacity activeOpacity={globalStyles.ACTIVE_OPACITY}>
                  <Text>Donate</Text>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={globalStyles.ACTIVE_OPACITY}>
                  <Text >Share</Text>
                </TouchableOpacity>
              </View>

            </View>
        );
    }

    render(){
        switch (this.state.status) {
            case STATUS.STOP:
                return this.renderDefaultScreen();
                break;
            case STATUS.PAUSE:
            case STATUS.START:
                return this.renderTrackingStartedScreen();
                break;
            default:
                return null;
        }
    }
}

// LiveTracker.propTypes = {
//   count: PropTypes.number,
//   increment: PropTypes.func,
//   decrement: PropTypes.func,
//   zero: PropTypes.func
// };

