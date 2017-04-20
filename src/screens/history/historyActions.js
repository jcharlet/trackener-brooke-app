import {LOAD_RIDES_SUMMARY} from "../../actions/actionTypes";
import * as localStorageService from "../../modules/localStorage/localStorageService";

export const loadRides = () => ({
    type: LOAD_RIDES_SUMMARY,
    payload: localStorageService.loadRidesHistory()
});