/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import * as console from "react-native";

export const STATUS = {STOP: 0, START: 1, PAUSE: 2};
export const ACTIVE_OPACITY = 0.6;
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

export default class TrackenerBrookeApp extends Component {
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
                    <TouchableOpacity style={[styles.secondRideButton]} activeOpacity={ACTIVE_OPACITY}
                                      onPress={this.pauseTracking}>
                        <Text style={styles.secondRideButtonText}>Pause</Text>
                    </TouchableOpacity>
                );
            case STATUS.PAUSE:
                return (
                    <TouchableOpacity style={[styles.secondRideButton]} activeOpacity={ACTIVE_OPACITY}
                                      onPress={this.restartTracking}>
                        <Text style={[styles.secondRideButtonText]}>Start</Text>
                    </TouchableOpacity>
                );
        }


    }

    renderTrackingStartedScreen() {
        return (
            <View style={styles.container}>
                {/*<Text>totalDistance {((this.state.totalDistance))}{"\n"}*/}
                {/*duration {(this.state.duration)} {duration}{"\n"}*/}
                {/*distance {((this.state.distance))}{"\n"}*/}
                {/*lastPosition {JSON.stringify(this.state.lastPosition)}{"\n"}*/}
                {/*initialPosition {JSON.stringify(this.state.initialPosition)}{"\n"}*/}
                {/*error {JSON.stringify(this.state.error)}{"\n"}*/}
                {/*</Text>*/}
                <View style={styles.infoBox}>
                    <Text
                        style={[styles.infoBoxText,styles.infoBoxBorderRight]}>TIME {"\n"} {secondsToHourMinSec(Math.round(this.state.duration))}</Text>
                    <Text
                        style={styles.infoBoxText}>DISTANCE {"\n"} {roundWithThreeDecimals(this.state.distance * ONE_METER_IN_MILES)}
                        mi</Text>
                </View>

                <View style={[styles.rideButtonsView]}>
                    {this.renderSecondButton()}
                    <TouchableOpacity style={[styles.startRideButton,styles.withSecondRideButton]}
                                      activeOpacity={ACTIVE_OPACITY}
                                      onPress={this.stopTracking}>
                        <Text style={[styles.startRideButtonText, styles.withSecondRideButtonText]}>Stop</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <Text
                        style={[styles.infoBoxText,styles.infoBoxBorderRight]}>SPEED {"\n"} {roundWithOneDecimals(convertMeterPerSecondToMilesPerHour(this.state.speed))}
                        mi/h</Text>
                </View>
            </View>
        );
    }

    renderDefaultScreen() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity style={styles.infoBox} activeOpacity={ACTIVE_OPACITY}>
                    <Text
                        style={styles.infoBoxStartText}>{roundWithThreeDecimals(this.state.totalDistance * ONE_METER_IN_MILES)}
                        mi ridden</Text>
                    <Image source={require('./img/ic_navigate_next_green.png')} style={styles.infoBoxArrow}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.startRideButton} activeOpacity={ACTIVE_OPACITY}
                                  onPress={this.startTracking}>
                    <Text style={styles.startRideButtonText}>Start Ride</Text>
                </TouchableOpacity>


                <View style={[styles.social]}>
                    <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
                        <Text>Donate</Text>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
                        <Text >Share</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    render() {
        let container = null;
        switch (this.state.status) {
            case STATUS.STOP:
                container = this.renderDefaultScreen();
                break;
            case STATUS.PAUSE:
            case STATUS.START:
                container = this.renderTrackingStartedScreen();
                break;
            default:
                return null;
        }
        return (
            <View style={styles.global}>
                <View style={styles.header}>
                    <TouchableOpacity style={[styles.headerImageView]} activeOpacity={ACTIVE_OPACITY}>
                        <View style={[styles.verticallyAligned]}>
                            <Image
                                source={require('./img/header-horse.png')}
                                style={styles.headerImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>My Hackathon</Text>
                    </View>
                    <TouchableOpacity style={styles.headerImageView} activeOpacity={ACTIVE_OPACITY}>
                        <View style={[styles.verticallyAligned]}>
                            <Image
                                source={require('./img/header-settings.png')}
                                style={styles.headerImage}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {container}


                <View style={[styles.footer]}>
                    <TouchableOpacity style={[styles.footerView, styles.tabSelected]}
                                      activeOpacity={ACTIVE_OPACITY}
                        //onPress={() => console.log('Press complete')}
                    >
                        <Image
                            source={require('./img/tab-dashboard.png')}
                            style={styles.footerImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerView]} activeOpacity={ACTIVE_OPACITY}>
                        <Image
                            source={require('./img/tab-exercising.png')}
                            style={[styles.footerImage,{width: 34}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerView]} activeOpacity={ACTIVE_OPACITY}>
                        <Image
                            source={require('./img/tab-calendar.png')}
                            style={[styles.footerImage,{width: 28}]}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}
let GREEN = '#619b64';
let WHITE = 'white';
let GRAY = '#d9d9d9';
const styles = StyleSheet.create({
    global: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: WHITE,
        flexDirection: 'column',
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor: GREEN,
        flexBasis: 50,
        flexGrow: 0
    },
    headerImageView: {
        height: 50,
        width: 50
    },
    verticallyAligned: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        width: 32, height: 32, backgroundColor: GREEN,
    },

    headerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: WHITE,
        fontSize: 25,
        flex: 1,
        textAlignVertical: 'center'
    },


    container: {
        flex: 1,
        justifyContent: 'space-around',
        // alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    infoBox: {
        borderStyle: 'solid',
        borderColor: GREEN,
        borderWidth: 2,

        flexDirection: 'row',
        alignSelf: 'stretch',
        width: undefined,
        margin: 20,
    },
    infoBoxStartText: {
        fontSize: 30,
        padding: 20,
        color: GREEN,
        alignItems: 'center',
        flexGrow: 3,
        textAlign: 'center',
        paddingLeft: 70
    },
    infoBoxText: {
        fontSize: 20,
        padding: 20,
        color: GREEN,
        alignItems: 'center',
        flexGrow: 1,
        textAlign: 'center',
    },
    infoBoxBorderRight: {
        borderRightColor: GREEN,
        borderStyle: 'solid',
        borderRightWidth: 1,
    },
    infoBoxArrow: {
        alignSelf: 'center',
        flexGrow: 1,
        width: 30,
        height: 30
    },

    startRideButton: {
        borderStyle: 'solid',
        borderColor: GRAY,
        borderWidth: 10,
        borderRadius: 200,
        height: 200,
        width: 200,

        backgroundColor: GREEN,

        alignSelf: 'center',

    },

    withSecondRideButton: {
        borderWidth: 8,
        borderRadius: 160,
        height: 160,
        width: 160,
        position: 'relative',
        // bottom:80,
        // right:40,
        bottom: '30%',
        right: '10%',
    },

    startRideButtonText: {
        borderRadius: 180,
        height: 180,
        width: 180,
        padding: 0,
        fontSize: 35,
        color: WHITE,
        // color: GREEN,
        textAlign: 'center',
        textAlignVertical: 'center'
    },


    withSecondRideButtonText: {
        borderRadius: 160,
        height: 140,
        width: 140,
        padding: 0,
    },

    rideButtonsView: {
        flex: 1,
        justifyContent: 'space-around',
        // alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },

    secondRideButton: {
        position: 'relative',
        // top:140,
        // left:80,
        top: '55%',
        left: '18%',
        borderStyle: 'solid',
        borderColor: GRAY,
        borderWidth: 6,
        borderRadius: 140,
        height: 120,
        width: 120,

        backgroundColor: GREEN,

        alignSelf: 'center',

    },
    secondRideButtonText: {
        fontSize: 21,
        borderRadius: 120,
        height: 100,
        width: 100,
        padding: 20,
        color: WHITE,
        // color: GREEN,
        textAlign: 'center',
        textAlignVertical: 'center'
    },


    social: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'stretch',
        width: undefined,
        margin: 20,
    },


    footer: {
        flexBasis: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: GREEN,
    },
    footerView: {
        height: 47,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        flex: 1,
        color: '#F5FCFF',
        textAlignVertical: 'center'
    },
    footerImage: {
        width: 32, height: 32, backgroundColor: GREEN,
    },
    tabSelected: {
        height: 55,
        borderStyle: 'solid',
        borderColor: WHITE,
        // borderWidth: 1,
        borderBottomWidth: 8
    },

    border: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1
    }

});

AppRegistry.registerComponent('TrackenerBrookeApp', () => TrackenerBrookeApp);
