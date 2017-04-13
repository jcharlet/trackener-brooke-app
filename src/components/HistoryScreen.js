
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
import * as globalStyles from '../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../util/utils";


export default class HistoryScreen extends Component{

    state={
        dataSource:{},
    };

    constructor(props) {
        super(props);
        this.props.load();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state.dataSource=ds.cloneWithRows(['row 1', 'row 2'];
        this.state.dataSource=ds.cloneWithRows(this.props.history.rides);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.history.rides),
        });
    }

    renderRow(rowData, ...rest) {
        // const index = parseInt(rest[1], 10);
        return (
            <View>
                <Text>{rowData.date}</Text>
                <Text>{rowData.duration}</Text>
                <Text>{rowData.distance}</Text>
            </View>
        );
    }

    render(){
        return (
            <View style={[globalStyles.COMMON_STYLES.container,{
                    flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
            }]}>
                <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
            </View>);
    }
}

HistoryScreen.navigationOptions = {
    title: 'History',
};
HistoryScreen.propTypes = {
    history:PropTypes.any,
    load: PropTypes.func,
};

const COMMON_STYLES = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
    },
});