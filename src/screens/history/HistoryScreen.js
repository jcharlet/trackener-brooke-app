import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';
import * as globalStyles from '../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../util/utils";
import {NAV_HACK_DETAILS} from "../../actions/actionTypes";


export default class HistoryScreen extends Component {

    state = {
        dataSource: {},
    };

    constructor(props) {
        super(props);
        this.props.load();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state.dataSource=ds.cloneWithRows(['row 1', 'row 2'];
        this.state.dataSource = ds.cloneWithRows(this.props.history.rides);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.history.rides),
        });
    }

    _navigate(index) {
        this.props.navigation.navigate(NAV_HACK_DETAILS, {index:index});
    }

    renderRow(rowData, ...rest) {
        const index = parseInt(rest[1], 10);
        return (
            <TouchableOpacity style={{
                flex:1,
                flexDirection:'row',
                justifyContent: 'space-between',
                marginTop:5,
                marginBottom:5,
                paddingTop:5,
                paddingBottom:5,
                paddingLeft:20,
                paddingRight:20,
                backgroundColor: globalStyles.GRAY,
            }} activeOpacity={globalStyles.ACTIVE_OPACITY}
                              onPress={() => this._navigate(index)}>
                <View style={{
                    flex:1.1,
                    flexDirection:'row',
        justifyContent: 'space-between',
        marginRight:20,
            }}>
                    <Text style={{
                        fontSize:16,
                        alignSelf:'center',
                    }}>{utils.formatDateToDisplay(rowData.date)}</Text>
                    <Text style={{
                        fontSize:12,
                        alignSelf:'center',

                    }}>{utils.formatTimeToDisplay(rowData.date)}</Text>
                </View>

                <View style={{
                    flex:1,
                    flexDirection:'row',
        justifyContent: 'space-between',
            }}>
                    <Image source={require('../../../img/ic_timer_purple.png')} style={{
                        width:22,height:22,
                    }}/>

                    <Text style={{
                        fontSize:16,
                        alignSelf:'center',
                    flex:1,
        textAlign: 'center',
            }}>{utils.secondsToMin(rowData.duration)} min</Text>
                </View>

                <View style={{
                    flex:1,
                    flexDirection:'row',
        justifyContent: 'flex-start',
            }}>
                    <Image source={require('../../../img/distance_blue.png')} style={{width:25,height:25}}/>
                    <Text style={{
                        fontSize:16,
                        alignSelf:'center',
                    flex:1,
        textAlign: 'center',
            }}>{utils.roundWithOneDecimals(rowData.distance * utils.ONE_METER_IN_MILES)} mi</Text>
                </View>
                <View><Image source={require('../../../img/ic_navigate_next_green.png')}
                             style={globalStyles.COMMON_STYLES.infoBoxArrow}/>
                </View>

            </TouchableOpacity>

        );
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.container,{
        alignItems: 'stretch',
                    flex:1,
                marginTop:5,
                marginBottom:5,
        //justifyContent: 'space-between',
        //flexDirection: 'column',
            }]}>

                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>);
    }
}

HistoryScreen.navigationOptions = {
    title: 'History',
};
HistoryScreen.propTypes = {
    history: PropTypes.any,
    load: PropTypes.func,
};

const COMMON_STYLES = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
    },
});