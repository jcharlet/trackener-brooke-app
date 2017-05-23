import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import * as globalStyles from '../../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../../util/utils";
import {NAV_HACK_DETAILS} from "../../../actions/actionTypes";
import HeaderComponent from '../../../components/HeaderComponent'

export default class LiveTrackerScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkLocationServicesIsEnabled();
    }

    renderDefaultScreen() {
        let totalDistance = utils.roundWithOneDecimals(this.props.liveTracker.totalDistance * utils.ONE_METER_IN_MILES);
        return (
            <View style={[globalStyles.COMMON_STYLES.container]}>
                <TouchableOpacity style={globalStyles.COMMON_STYLES.infoBox}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                                  onPress={() => this.props.navigation.navigate(NAV_HACK_DETAILS)}>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent: 'flex-start',
                    }}>
                        <View>
                            <Image source={require('../../../../img/trophy.png')} style={{
                            height: 40,
                            width: 40,
                            alignSelf: 'center',
                            flexGrow: 2,
                            resizeMode:'contain',
                            marginLeft:10,
                        }}/>
                        </View>
                        <Text style={[globalStyles.COMMON_STYLES.infoBoxStartText,{
                        /*fontSize:16,
                        alignSelf:'center',
                        flex:1,
                        textAlign: 'center',*/
                        }]}>
                            {totalDistance} mi ridden
                        </Text>
                    </View>
                    <View style={{
                        flex:0,
                        flexDirection:'row',
                        alignItems:'center'}}>
                        <Image source={require('../../../../img/ic_navigate_next_green.png')}
                               style={globalStyles.COMMON_STYLES.infoBoxArrowTracker}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.COMMON_STYLES.startRideButton}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                                  onPress={()=>{
                                    this.props.startTracking();
                                }}>
                    <Text style={globalStyles.COMMON_STYLES.startRideButtonText}>Start Ride</Text>
                </TouchableOpacity>


                <View style={[globalStyles.COMMON_STYLES.social]}>
                </View>

            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1,alignItems: 'flex-start',}}>
                <HeaderComponent
                    title={"Trackener Rides"}
                    leftElement={'TRACKENER_ICON'}
                    rightElement={'SETTINGS'}
                    navigation={this.props.navigation}/>
                {this.renderDefaultScreen()}
            </View>
        )
    }
}

LiveTrackerScreen.propTypes = {
    liveTracker: PropTypes.any,
    startTracking: PropTypes.func,
};
