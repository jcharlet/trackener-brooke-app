// @flow
'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ART,
    LayoutAnimation,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

const {
    Surface,
    Group,
    Rectangle,
    Shape,
} = ART;

import * as scale from '../../../../../node_modules/d3-scale/index';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import AnimShape from './AnimShape';
import Theme from './theme';

const d3 = {
    scale,
    shape,
};

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';
import * as globalStyles from "../../../../styles/global";

type Props = {
    height: number,
    width: number,
    pieWidth: number,
    pieHeight: number,
    colors: any,
    onItemSelected: any
};

type State = {
    highlightedIndex: number,
};

class Pie extends React.Component {

    state: State;

    constructor(props: Props) {
        super(props);
        this.state = { highlightedIndex: 0 };
        this._createPieChart = this._createPieChart.bind(this);
        this._value = this._value.bind(this);
        this._label = this._label.bind(this);
        this._color = this._color.bind(this);
        this._onPieItemSelected = this._onPieItemSelected.bind(this);
    }

    // methods used to tranform data into piechart:
    _value(item) { return item.number; }

    _label(item) { return item.name; }

    _labelValue(item) {
        if(item.labelValue){
            return item.labelValue;
        }
        return this._value(item) + '%'
    }

    _index(item) { return item.index; }

    _color(index) { return Theme.colors[index]; }

    _createPieChart(index) {

        var arcs = d3.shape.pie()
            .value(this._value)
            .sortValues((a,b) => {return this._index(b)-this._index(a)})
            .startAngle(90*0.0175)
            .endAngle((360+90)*0.0175)
            (this.props.data);

        // var hightlightedArc = d3.shape.arc()
        //     .outerRadius(this.props.pieWidth/2 + 10)
        //     .padAngle(.05)
        //     .innerRadius(30);

        var arc = d3.shape.arc()
            .outerRadius(this.props.pieWidth/2)
            .padAngle(.05)
            .innerRadius(30);

        var arcData = arcs[index];
        // var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);
        var path = arc(arcData);

        return {
            path,
            color: this._color(index),
        };
    }

    _onPieItemSelected(index) {
        this.setState({...this.state, highlightedIndex: index});
        this.props.onItemSelected(index);
    }

    render() {
        const margin = styles.container.margin;
        const x = this.props.pieWidth / 2 + margin;
        const y = this.props.pieHeight / 2 + margin;

        return (
            <View style={[{flex:1, flexDirection:'row',
        justifyContent: 'space-around',marginLeft:20,marginRight:20}]}>
                <Surface width={this.props.width} height={this.props.height} >
                    <Group x={x} y={y}>
                        {
                            this.props.data.map( (item, index) =>
                                (<AnimShape
                                    key={'pie_shape_' + index}
                                    color={this._color(index)}
                                    d={ () => this._createPieChart(index)}
                                />)
                            )
                        }
                    </Group>
                </Surface>
                <View style={[{
        flex:1,alignItems: 'flex-start',alignSelf:'center'}]}>
                    {
                        this.props.data.map( (item, index) =>
                        {
                            {/*var fontWeight = this.state.highlightedIndex == index ? 'bold' : 'normal';*/}
                            var fontWeight =  'normal';
                            return (
                                <View key={index}>
                                {/*<TouchableWithoutFeedback key={index} onPress={() => this._onPieItemSelected(index)}>*/}
                                    <View>
                                        <Text style={[styles.label, {color: this._color(index), fontWeight: fontWeight}]}>{this._label(item)}: {this._labelValue(item)}</Text>
                                    </View>
                                </View >
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        margin: 20,
    },
    label: {
        fontSize: 15,
        marginTop: 5,
        fontWeight: 'normal',
    }
};

export default Pie;

0
