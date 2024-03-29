import {
    LOGIN_SUCCESS, LOGIN_ERROR, LOAD_RIDES, UPDATE_TOTAL_DISTANCE, AUTO_LOGIN,
    LOGIN_IN_PROGRESS
} from "../../../actions/actionTypes";
import * as trackenerAuthentApi from "../../../modules/authent/trackenerAuthentApi";
import {checksum} from "../../../util/utils";
import {migrate} from "../../../modules/storage/migration/migrateData";
import * as credentialsRepository from "../../../modules/storage/localStorage/credentialsRepository";
import * as storageService from "../../../modules/storage/storageService";
import * as util from "../../../util/utils";

//FIXME JC to move in actionTypes in a enum object

export const ERROR_FORBIDDEN = 'FORBIDDEN';
export const ERROR_UNKNOWN = 'UNKNOWN_ERROR';
export const ERROR_SERVER = 'SERVER_ERROR';
export const ERROR_UNAVAILABLE = 'ERROR_UNAVAILABLE';

export const LOGIN_FEEDBACK = {
    MISSING_USERNAME: 'MISSING_USERNAME',
    MISSING_PASSWORD: 'MISSING_PASSWORD',
    SUCCESS_ONLINE: 'SUCCESS_ONLINE',
    ONGOING: 'ONGOING',
    SUCCESS_OFFLINE: 'SUCCESS_OFFLINE',
}

export const loginOnStartup = () => {
    return (dispatch) => {
        credentialsRepository.getCredentials().then((storedCredentials) => {
            if (storedCredentials) {
                dispatch({
                    type: AUTO_LOGIN,
                    payload: storedCredentials,
                });
                dispatch(login(storedCredentials.username, storedCredentials.password, true));
            }
        })
    }
};

export const login = (username: string, password: string, isAutoLogin:boolean) => {
    return (dispatch, getState) => {
        if(username.length===0){
            return loginError(dispatch, LOGIN_FEEDBACK.MISSING_USERNAME);
        }

        if(password.length===0){
            return loginError(dispatch, LOGIN_FEEDBACK.MISSING_PASSWORD);
        }

        username=username.trim();

        dispatch({
            type: LOGIN_IN_PROGRESS,
            payload: LOGIN_FEEDBACK.ONGOING
        });
        trackenerAuthentApi.login(username, password)
            .then((loginResponse) => {
                switch (loginResponse.type) {
                    case LOGIN_SUCCESS:
                        loginSuccess(dispatch, getState, username, password, false);
                        break;
                    case LOGIN_ERROR:
                        if(isAutoLogin && loginResponse.errorType === ERROR_UNAVAILABLE){
                            //if Service is unavailable, we still enable the user to login locally if he has correct password and use his application offline.
                            loginSuccess(dispatch, getState, username, password, true);
                            return;
                        }
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
                      username: string, password: string, isOffline:boolean) => {

    dispatch({
        type: LOGIN_IN_PROGRESS,
        payload: isOffline?LOGIN_FEEDBACK.SUCCESS_OFFLINE:LOGIN_FEEDBACK.SUCCESS_ONLINE
    });

    credentialsRepository.saveCredentials(username, password);
    //when doing multiple horses, need to store the list of horses for one user locally so that he can uses the app locally
    let deviceId = checksum(username);
    storageService.initApp(username, deviceId, isOffline);
    migrate(username,deviceId)
        .then(() => {
        initApplication(dispatch);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: username,
            });
    });
};

export const initApplication = (dispatch) => {

    dispatch({
        type: UPDATE_TOTAL_DISTANCE,
        payload: storageService.loadTotalDistance()
    })
        dispatch({
            type: LOAD_RIDES,
            payload: storageService.loadRidesByDeviceId()
        });
};
