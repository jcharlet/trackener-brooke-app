import {LOGIN_SUCCESS, LOGIN_ERROR, NAV_NAVIGATE, NAV_BOTTOM_TAB_NAV, LOAD_RIDES, UPDATE_TOTAL_DISTANCE} from "../../../actions/actionTypes";
import * as trackenerApiService from "../../../modules/trackenerApi/trackenerApiService";
import {checksum} from "../../../util/utils";
import {migrate} from "../../../modules/migration/migrateData";
import * as localStorageService from "../../../modules/localStorage/localStorageService";
import * as localRidesRepository from "../../../modules/localStorage/localRidesRepository";

//FIXME JC to move in actionTypes in a enum object
export const ERROR_FORBIDDEN = 'FORBIDDEN';
export const ERROR_UNKNOWN = 'UNKNOWN_ERROR';
export const ERROR_SERVER = 'SERVER_ERROR';
export const ERROR_UNAVAILABLE = 'ERROR_UNAVAILABLE';


export const login = (username: string, password: string) => {
    return (dispatch, getState) => {
        trackenerApiService.login(username, password)
            .then((loginResponse) => {
                switch (loginResponse.type) {
                    case LOGIN_SUCCESS:
                        loginSuccess(dispatch, getState,
                            // loginResponse,
                            username);
                        break;
                    case LOGIN_ERROR:
                        loginError(dispatch, loginResponse.errorType);
                        break;
                }
            });
    }
}

const loginError = (dispatch, errorType) => {
    dispatch({
        type: LOGIN_ERROR,
        payload: errorType,
    });
}
const loginSuccess = (dispatch,
                        getState,
                      // loginResponse,
                      username: string) => {
    let deviceId = checksum(username);
    initStorageFromInitialState(getState());
    migrate(deviceId).then(() => {
        initApplication(dispatch);
        dispatch({
            type: LOGIN_SUCCESS,
        });
        dispatch({
            type: NAV_NAVIGATE,
            routeName: NAV_BOTTOM_TAB_NAV,
        });
    });
}

export const initStorageFromInitialState = (state) => {
    if(state.hackDetails.rides.length>0){
        localRidesRepository.saveRides(state.hackDetails.rides)
        localStorageService.saveTotalDistance(state.liveTracker.totalDistance)
    }
}
export const initApplication = (dispatch) => {
        dispatch({
            type: LOAD_RIDES,
            payload: localStorageService.loadRides()
        })
        dispatch({
            type: UPDATE_TOTAL_DISTANCE,
            payload: localStorageService.loadTotalDistance()
        })
};
