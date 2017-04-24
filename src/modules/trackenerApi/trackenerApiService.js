import {TRACKENER_API} from "../../config/config";
import {LOGIN_SUCCESS, LOGIN_ERROR} from "../../actions/actionTypes";
import {ERROR_FORBIDDEN, ERROR_SERVER, ERROR_UNKNOWN, ERROR_UNAVAILABLE} from "../../screens/login/loginActions";
import moment from "moment";

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
                    console.error(response);
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_SERVER,
                    }
                } else {
                    console.error(response);
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_UNKNOWN,
                    }
                }
            }
        )
        .catch((error) => {
            console.error(error);
            if(error.message == "Network request failed"){
                return {
                    type: LOGIN_ERROR,
                    errorType: ERROR_UNAVAILABLE,
                }
            }
            return {
                type: LOGIN_ERROR,
                errorType: ERROR_UNKNOWN,
            }
        })
        ;
}
