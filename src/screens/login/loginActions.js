import {LOGIN_SUCCESS, LOGIN_ERROR, NAV_NAVIGATE, NAV_BOTTOM_TAB_NAV} from "../../actions/actionTypes";
import {TRACKENER_API} from "../../config/config";


export const ERROR_FORBIDDEN = 'FORBIDDEN';
export const ERROR_UNKNOWN = 'UNKNOWN_ERROR';
export const ERROR_SERVER = 'SERVER_ERROR';

export function reinitLoginPage(state) {
    return {
        ...state,
        feedback:''
    }
}
export function displayFeedback(state,feedback) {
    return {
        ...state,
        feedback:feedback
    }
}

export const login = (username: string, password: string) => {
    return (dispatch) => {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch(TRACKENER_API+"/login", {
                method: "post",
                body: formData
            }
        )
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                    });
                    dispatch({
                            type: NAV_NAVIGATE,
                            routeName: NAV_BOTTOM_TAB_NAV,
                        }
                    )
                } else if (response.status == 403){
                    dispatch({
                            type: LOGIN_ERROR,
                            payload: ERROR_FORBIDDEN,
                        }
                    )
                } else if (response.status == 500){
                    dispatch({
                            type: LOGIN_ERROR,
                            payload: ERROR_SERVER,
                        }
                    )
                } else{
                    dispatch({
                            type: LOGIN_ERROR,
                            payload: ERROR_UNKNOWN,
                        }
                    )
                }
                }
            )
            .catch((error) => {
                console.warn(error);
            })
        ;
    }
}
