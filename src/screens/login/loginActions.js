import {LOGIN_SUCCESS, LOGIN_ERROR, NAV_NAVIGATE, NAV_BOTTOM_TAB_NAV} from "../../actions/actionTypes";
import {TRACKENER_API} from "../../config/config";
import * as trackenerApiService from "../../modules/trackenerApi/trackenerApiService";


export const ERROR_FORBIDDEN = 'FORBIDDEN';
export const ERROR_UNKNOWN = 'UNKNOWN_ERROR';
export const ERROR_SERVER = 'SERVER_ERROR';

export function reinitLoginPage(state) {
    return {
        ...state,
        feedback: ''
    }
}
export function displayFeedback(state, feedback) {
    return {
        ...state,
        feedback: feedback
    }
}

export const login = (username: string, password: string) => {
    return (dispatch) => {
        trackenerApiService.login(username, password)
            .then((loginResponse) => {
                switch (loginResponse.type) {
                    case LOGIN_SUCCESS:
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
