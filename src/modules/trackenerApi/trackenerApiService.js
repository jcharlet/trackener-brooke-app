import {TRACKENER_API} from "../../config/config";
import {LOGIN_SUCCESS, NAV_NAVIGATE, NAV_BOTTOM_TAB_NAV, LOGIN_ERROR} from "../../actions/actionTypes";
import {ERROR_FORBIDDEN, ERROR_SERVER, ERROR_UNKNOWN} from "../../screens/login/loginActions";

export const login = (username: string, password: string) => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return fetch(TRACKENER_API + "/login", {
            method: "post",
            body: formData
        }
    )
        .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return {
                        type: LOGIN_SUCCESS,
                    }
                } else if (response.status == 403) {
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_FORBIDDEN,
                    }
                } else if (response.status == 500) {
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_SERVER,
                    }
                } else {
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_UNKNOWN,
                    }
                }
            }
        )
        .catch((error) => {
            console.warn(error);
        })
        ;
}
