
import {
    StyleSheet,
} from 'react-native';

export const ACTIVE_OPACITY = 0.6;

export const GREEN = '#619b64';
export const WHITE = 'white';
export const GRAY = '#d9d9d9';

export const COMMON_STYLES = StyleSheet.create({
    main: {
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
        flexGrow: 2,
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

        overflow: 'hidden',
        alignSelf: 'center',
        flex:0,
        flexDirection:'row',
        alignItems: 'center',

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
        width: 180,
        fontSize: 35,
        color: WHITE,
        textAlign: 'center',
    },


    withSecondRideButtonText: {
        width: 140,
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
        top: '35%',
        left: '25%',
        borderStyle: 'solid',
        borderColor: GRAY,
        borderWidth: 6,
        borderRadius: 140,
        height: 120,
        width: 120,

        backgroundColor: GREEN,
        overflow: 'hidden',

        alignSelf: 'center',

        flex:0,
        flexDirection:'row',
        alignItems: 'center',

    },
    secondRideButtonText: {
        fontSize: 21,
        // borderRadius: 120,
        // height: 100,
        width: 100,
        // padding: 20,
        color: WHITE,
        // color: GREEN,
        textAlign: 'center',
        // textAlignVertical: 'center'
    },


    social: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'stretch',
        width: undefined,
        margin: 20,
    },


    border: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1
    }

});
