export const STATUS = {STOP: 0, START: 1, PAUSE: 2};
export const ONE_METER_IN_MILES = 0.000621;

export const DISTANCE_FILTER = 5;
export const TIMEOUT_WATCH = 20000;
export const TIMEOUT_GET = 60000;
export const MAX_AGE = 0;

export const convertMeterPerSecondToMilesPerHour = (number) => {
    return number * ONE_METER_IN_MILES * 3600;
};

export const roundWithOneDecimals = (number) => {
    return Math.round(number * 100) / 100;
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

export function formatDateTime(date) {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minutes = date.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;

    return [year, month, day].join('-') + " " + [hour, minutes].join(':');
}
export function formatDate(date) {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}