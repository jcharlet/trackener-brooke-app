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
    Image
} from 'react-native';

export default class TrackenerBrookeApp extends Component {
    render() {
        return (
            <View style={styles.global}>
                <View style={styles.header}>
                    {/*<Image source={require('./images/pizza.jpg')} />*/}
                    <View style={[styles.headerImageView]}>
                        <View style={[styles.verticallyAligned]}>
                            <Image
                                source={require('./img/header-horse.png')}
                                style={styles.headerImage}
                            />
                        </View>
                    </View>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>My Hackathon</Text>
                    </View>
                    <View style={styles.headerImageView}>
                        <View style={[styles.verticallyAligned]}>
                            <Image
                                source={require('./img/header-settings.png')}
                                style={styles.headerImage}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text>Start Ride</Text>
                        <Text>Total Distance</Text>
                    </View>

                    <View>
                        <Text>Stop</Text>
                        <Text>Pause</Text>
                        <Text>Location: </Text>
                        <Text>Speed: </Text>
                        <Text>Distance: </Text>
                    </View>

                </View>


                <View style={[styles.footer]}>
                    <View style={[styles.footerView, styles.tabSelected]}>
                        <Image
                            source={require('./img/tab-dashboard.png')}
                            style={styles.footerImage}
                        />
                    </View>
                    <View style={[styles.footerView]}>
                        <Image
                            source={require('./img/tab-exercising.png')}
                            style={styles.footerImage}
                        />
                    </View>
                    <View style={[styles.footerView]}>
                        <Image
                            source={require('./img/tab-calendar.png')}
                            style={styles.footerImage}
                        />
                    </View>
                </View>

            </View>
        );
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
    tabSelected:{
        height: 55,
        borderStyle: 'solid',
        borderColor: 'white',
        // borderWidth: 1,
        borderBottomWidth:8
    },

    border: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1
    }

});

AppRegistry.registerComponent('TrackenerBrookeApp', () => TrackenerBrookeApp);
