
import {LOAD_RIDES, SHOW_PREVIOUS_HACK, SHOW_NEXT_HACK, REMOVE_HACK} from "../../actions/actionTypes";
import * as localStorageService from "../../modules/localStorage/localStorageService";

export const loadRides = () => ({
    type: LOAD_RIDES,
    payload: localStorageService.loadRides()
});

export const removeRide = (date: string) => {
    localStorageService.removeRide(date);

    return ({
        type: REMOVE_HACK,
        payload: date
    })
}

export const showPreviousRide = function () {
    return {type: SHOW_PREVIOUS_HACK};
};
export const showNextRide = function () {
    return {type: SHOW_NEXT_HACK};
};