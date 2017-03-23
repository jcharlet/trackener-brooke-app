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

export default class TrackenerBrookeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            watchID: null,
            enableHighAccuracy: true,
            distance: 0,
            duration:0,
        };
        this.startTracking = this.startTracking.bind(this);
        this.stopTracking = this.stopTracking.bind(this);
    }

    startTracking() {
        this.watchGPS(this.state.enableHighAccuracy);
        this.setState({started: true, distance:0});
    }

    stopTracking() {
        this.clearWatchGps();
        this.setState({started: false});
    }

    watchGPS(enableHighAccuracy) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                initialPosition: {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    speed: position.coords.speed,
                    timestamp: position.timestamp
                }
            });
        }, (error) => alert(JSON.stringify(error)), {
            enableHighAccuracy: enableHighAccuracy,
            timeout: 20000,
            maximumAge: 1000
        });
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var previousPosition = null;
            if(this.state.lastPosition=='unknown'){
                previousPosition=this.state.initialPosition;
            }else{
                previousPosition=this.state.lastPosition;

            }
            var from = {lat: previousPosition.latitude, lon: previousPosition.longitude};
            var to = {lat: position.coords.latitude, lon: position.coords.longitude};
            this.state.distance += this.calculateDistance(from, to);
            this.state.duration = position.timestamp - this.state.initialPosition.timestamp;
            this.setState({
                lastPosition: {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    speed: position.coords.speed,
                    timestamp: position.timestamp
                },
                distance:this.state.distance
            });
        });
    }

    clearWatchGps() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    renderGPSPosition(position) {
        if (position == 'unknown') {
            return (
                <Text>Position unknown</Text>
            );
        } else {
            return (
                <View>
                    <Text>Location: long:{position.longitude}, lat:{position.latitude}</Text>
                    <Text>Speed: {position.speed}</Text>
                </View>
            );
        }
    }

    renderGPS() {
        return (
            <View>
                <Text style={styles.title}>Total Distance: {this.state.distance}</Text>
                <Text style={styles.title}>Total Duration: {this.state.duration}</Text>
                <Text style={styles.title}>Initial position: </Text>
                {this.renderGPSPosition(this.state.initialPosition)}
                <Text style={styles.title}>Current position: </Text>
                {this.renderGPSPosition(this.state.lastPosition)}
            </View> );
    }

    renderContainer() {
        if (!this.state.started) {
            return (
                <View>
                    <TouchableOpacity style={styles.headerImageView}
                                      onPress={this.startTracking}
                    >
                        <Text>Start Ride</Text>
                    </TouchableOpacity>
                    {/*<Text>Total Distance</Text>*/}
                </View>
            );
        }
        return (
            <View>
                <TouchableOpacity style={styles.headerImageView}
                                  onPress={this.stopTracking}
                >
                    <Text>Stop</Text>
                </TouchableOpacity>
                {/*<Text>Pause</Text>*/}
                {this.renderGPS()}
            </View>
        );

    }

    render() {
        return (
            <View style={styles.global}>
                <View style={styles.header}>
                    <TouchableOpacity style={[styles.headerImageView]}>
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
                    <TouchableOpacity style={styles.headerImageView}>
                        <View style={[styles.verticallyAligned]}>
                            <Image
                                source={require('./img/header-settings.png')}
                                style={styles.headerImage}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    {this.renderContainer()}
                </View>


                <View style={[styles.footer]}>
                    <TouchableOpacity style={[styles.footerView, styles.tabSelected]}
                        //onPress={() => console.log('Press complete')}
                    >
                        <Image
                            source={require('./img/tab-dashboard.png')}
                            style={styles.footerImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerView]}>
                        <Image
                            source={require('./img/tab-exercising.png')}
                            style={[styles.footerImage,{width: 34}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerView]}>
                        <Image
                            source={require('./img/tab-calendar.png')}
                            style={[styles.footerImage,{width: 28}]}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    // (mean) radius of Earth (meters)
    R = 6378137;
    PI_360 = Math.PI / 360;

    /**
     *
     var from = {lat: this.lastPosition.latitude, lon: this.lastPosition.longitude};
     var to = {lat: latitude, lon: longitude};
     this.distance += this.calculateDistance(from, to);
     * @param a
     * @param b
     */
    calculateDistance(a, b) {

        const cLat = Math.cos((a.lat + b.lat) * this.PI_360);
        const dLat = (b.lat - a.lat) * this.PI_360;
        const dLon = (b.lon - a.lon) * this.PI_360;

        const f = dLat * dLat + cLat * cLat * dLon * dLon;
        const c = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));

        return this.R * c;
    }


}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#619b64',
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
        width: 32, height: 32, backgroundColor: '#619b64',
    },

    headerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#F5FCFF',
        fontSize: 25,
        flex: 1,
        textAlignVertical: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },


    footer: {
        flexBasis: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#619b64',
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
        width: 32, height: 32, backgroundColor: '#619b64',
    },
    tabSelected: {
        height: 55,
        borderStyle: 'solid',
        borderColor: 'white',
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
