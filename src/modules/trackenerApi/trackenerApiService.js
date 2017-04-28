import {TRACKENER_API} from "../../config/config";
import {LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR} from "../../actions/actionTypes";
import {
    ERROR_FORBIDDEN,
    ERROR_SERVER,
    ERROR_UNKNOWN,
    ERROR_UNAVAILABLE
} from "../../screens/authentication/login/loginActions";
import moment from "moment";
import {EMAIL_ALREADY_USED, USERNAME_ALREADY_USED} from "../../screens/authentication/register/registerActions";

export const register = (email: string, username: string, password: string) => {
    // return Promise.resolve( {
    //     type: REGISTER_SUCCESS,
    // });
    let formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    return fetch(TRACKENER_API + "/register", {
            method: "post",
            body: formData
        }
    )
        .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else if (response.status == 500) {
                    console.error(response);
                    return {
                        type: REGISTER_ERROR,
                        errorType: ERROR_SERVER,
                    }
                } else {
                    console.error(response);
                    return {
                        type: REGISTER_ERROR,
                        errorType: ERROR_UNKNOWN,
                    }
                }
            }
        ).then((responseJson) => {
            if(responseJson.errorType){
                return responseJson;
            }
            if (responseJson.status == "OK") {
                return {
                    type: REGISTER_SUCCESS,
                }
            } else if (responseJson.status == EMAIL_ALREADY_USED
                || responseJson.status == USERNAME_ALREADY_USED) {
                return {
                    type: REGISTER_ERROR,
                    errorType: responseJson.status,
                }
            }
        })
        .catch((error) => {
            console.error(error);
            if (error.message == "Network request failed") {
                return {
                    type: REGISTER_ERROR,
                    errorType: ERROR_UNAVAILABLE,
                }
            }
            return {
                type: REGISTER_ERROR,
                errorType: ERROR_UNKNOWN,
            }
        })
        ;
}

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
            if (error.message == "Network request failed") {
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
