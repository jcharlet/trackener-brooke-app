
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
    return Math.floor(input / 60);
};


export const formatDateToDisplay = (dateTime) =>{
    if (moment(dateTime).format("YYYY MM DD") == moment().format("YYYY MM DD")) {
        return "TODAY"
    }
    return moment(dateTime).format("MMMM Do");
}
export const formatTimeToDisplay = (dateTime) => {
    return moment(dateTime).format("HH:mm");
}

export const capitalizeFirstLetter = (string: String) => {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}