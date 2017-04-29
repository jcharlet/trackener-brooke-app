import {
    StyleSheet,
    Platform,
} from 'react-native';
import {createStyles, maxHeight } from 'react-native-media-queries'
export const ACTIVE_OPACITY = 0.6;

export const RED = '#e54242';
export const GREEN = '#619b64';
export const WHITE = 'white';
export const GRAY = '#d9d9d9';

const base ={
    main: {
        flex: 1,
        backgroundColor: WHITE,
        flexDirection: 'column',
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor: GREEN,
        flexBasis: Platform.OS === 'ios' ? 70 : 50,
        flexGrow: 0,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    headerImageView: {
        height: 50,
        width: 90
    },
    verticallyAligned: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        width: 62, height: 32, backgroundColor: GREEN,
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
    },


    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    infoBox: {
        borderStyle: 'solid',
        borderColor: GREEN,
        borderWidth: 2,

        // will throw error: flex:0 so use flexGrow instead,
        flexGrow: 0,
        flexDirection: 'row',
        margin: 10,
    },
    infoBoxStartText: {
        fontSize: 30,
        padding: 10,
        color: GREEN,
        alignItems: 'center',
        flexGrow: 2,
        textAlign: 'center',
        paddingLeft: 10,
    },
    infoBoxView: {
        padding: 10,
        alignItems: 'center',
        // flexGrow: 1,
        flex: 1,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    infoBoxText: {
        fontSize: 20,
        color: GREEN,
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
        height: 30,
        marginRight:10,
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
        flex: 0,
        flexDirection: 'row',
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
        flexDirection: 'column',
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

        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',

    },
    secondRideButtonText: {
        fontSize: 21,
        width: 100,
        color: WHITE,
        textAlign: 'center',
    },


    social: {
        flexGrow: 0,
    },

    centeredElement: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },

    buttonView: {
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'stretch',
        margin: 7,
        padding: 7,
    },
    redButton: {

        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: RED,
        backgroundColor: RED
    },
    buttonText: {

        fontSize: 15,
        textAlign: 'center',
        color: WHITE,
    },

    border: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1,
    },

    footerLabel : {
          margin: 4,
          marginBottom: 0,
          fontSize: 12,
    },
    footerImage: {
        width: 24,
        height: 24,
        resizeMode:'contain' , 
    },
    footerStyle:{
        backgroundColor: GREEN,
        paddingBottom: 0,
    },
    footerIndicatorStyle:{
        backgroundColor: WHITE,
        height: 4,
    }

};


export const COMMON_STYLES = createStyles(
  base,
  //iphone 5s
  maxHeight(960,{
    headerText:{
      fontSize:22
    }
  }),
  // iphone 6
)
