import {LOGIN_SUCCESS, LOGIN_ERROR, LOAD_RIDES, UPDATE_TOTAL_DISTANCE, AUTO_LOGIN} from "../../../actions/actionTypes";
import * as trackenerApiService from "../../../modules/trackenerApi/trackenerApiService";
import {checksum} from "../../../util/utils";
import {migrate} from "../../../modules/migration/migrateData";
import * as totalDistanceRepository from "../../../modules/localStorage/totalDistanceRepository";
import * as localRidesRepository from "../../../modules/localStorage/localRidesRepository";
import * as userRepository from "../../../modules/localStorage/userRepository";

//FIXME JC to move in actionTypes in a enum object
export const ERROR_FORBIDDEN = 'FORBIDDEN';
export const ERROR_UNKNOWN = 'UNKNOWN_ERROR';
export const ERROR_SERVER = 'SERVER_ERROR';
export const ERROR_UNAVAILABLE = 'ERROR_UNAVAILABLE';


export const loginOnStartup = () => {
    return (dispatch) => {
        userRepository.getCredentials().then((storedCredentials) =>{
            if (storedCredentials) {
                dispatch({
                    type: AUTO_LOGIN,
                    payload: storedCredentials,
                });
                dispatch(login(storedCredentials.username, storedCredentials.password));
            }
        })
    }
};

export const login = (username: string, password: string) => {
    return (dispatch, getState) => {
        trackenerApiService.login(username, password)
            .then((loginResponse) => {
                switch (loginResponse.type) {
                    case LOGIN_SUCCESS:
                        loginSuccess(dispatch, getState,
                            // loginResponse,
                            username, password);
                        break;
                    case LOGIN_ERROR:
                        loginError(dispatch, loginResponse.errorType);
                        break;
                }
            });
    }
};

const loginError = (dispatch, errorType) => {
    dispatch({
        type: LOGIN_ERROR,
        payload: errorType,
    });
};
const loginSuccess = (dispatch,
                        getState,
                      // loginResponse,
                      username: string,password: string) => {
    userRepository.saveCredentials(username,password);
    let deviceId = checksum(username);
    initStorageFromInitialState(getState());
    migrate(deviceId).then(() => {
        initApplication(dispatch);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: username,
        });
    });
};

export const initStorageFromInitialState = (state) => {
    if(state.hackDetails.rides.length>0){
        localRidesRepository.saveRides(state.hackDetails.rides)
        totalDistanceRepository.saveTotalDistance(state.liveTracker.totalDistance)
    }
};
export const initApplication = (dispatch) => {

        dispatch({
            type: LOAD_RIDES,
            payload: localRidesRepository.loadRides()
        });
        dispatch({
            type: UPDATE_TOTAL_DISTANCE,
            payload: totalDistanceRepository.loadTotalDistance()
        })
};
