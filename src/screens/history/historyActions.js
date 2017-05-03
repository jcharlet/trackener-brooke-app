import {LOAD_RIDES_SUMMARY} from "../../actions/actionTypes";
import * as localRidesRepository from "../../modules/storage/localStorage/localRidesRepository";

export const loadRides = () => ({
    type: LOAD_RIDES_SUMMARY,
    payload: localRidesRepository.loadRidesHistory()
});
