import {LOGIN_SUCCESS, LOGIN_ERROR, NAV_NAVIGATE, NAV_BOTTOM_TAB_NAV, LOAD_RIDES, UPDATE_TOTAL_DISTANCE} from "../../../actions/actionTypes";
import * as trackenerApiService from "../../../modules/trackenerApi/trackenerApiService";
import * as localStorageService from "../../../modules/localStorage/localStorageService";

//FIXME JC to move in actionTypes in a enum object
export const ERROR_FORBIDDEN = 'FORBIDDEN';
export const ERROR_UNKNOWN = 'UNKNOWN_ERROR';
export const ERROR_SERVER = 'SERVER_ERROR';
export const ERROR_UNAVAILABLE = 'ERROR_UNAVAILABLE';


export const login = (username: string, password: string) => {
    return (dispatch) => {
        trackenerApiService.login(username, password)
            .then((loginResponse) => {
                switch (loginResponse.type) {
                    case LOGIN_SUCCESS:
                        initApplication(dispatch);
                        dispatch({
                            type: LOGIN_SUCCESS,
                        });
                        dispatch({
                            type: NAV_NAVIGATE,
                            routeName: NAV_BOTTOM_TAB_NAV,
                        });
                        break;
                    case LOGIN_ERROR:
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: loginResponse.errorType,
                        });
                        break;
                }
            })
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
