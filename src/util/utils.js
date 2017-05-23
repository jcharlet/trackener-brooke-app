
import moment from "moment";

export const ONE_METER_IN_MILES = 0.000621;

export const convertMeterPerSecondToMilesPerHour = (number) => {
    return number * ONE_METER_IN_MILES * 3600;
};

export const roundWithOneDecimals = (number) => {
    return Math.round(number * 10) / 10;
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


export const secondsToMin = (input) => {
    return Math.round(input / 60);
};


export const formatDateToDisplay = (dateTime) =>{
    if (moment(dateTime).format("YYYY MM DD") == moment().format("YYYY MM DD")) {
        return "Today"
    }
    return moment(dateTime).format("MMMM Do");
}
export const formatTimeToDisplay = (dateTime) => {
    return moment(dateTime).format("HH:mm");
}

export const capitalizeFirstLetter = (string: String) => {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

export const wait=(mseconds)=>{
  var start = new Date().getTime();
  var end = start;
  while(end<start + mseconds){
    end = new Date().getTime();
  }
}


export const checksum = function(s) {
    let hash = 0,
        strlen = s.length,
        i,
        c;
    if ( strlen === 0 ) {
        return hash;
    }
    for ( i = 0; i < strlen; i++ ) {
        c = s.charCodeAt( i );
        hash  = ((hash << 5) - hash) + c;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

export const createRideId = function (username, deviceId, date) {
    return username + "." + deviceId + "." + date;
};


export const calculateTotalDistanceFromRides = function (rides) {
    return rides.map(function (ride) {
        return ride.analytics.distance;
    })
        .reduce(function (last, now) {
            return last + now;
        }, 0);
};