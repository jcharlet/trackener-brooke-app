import {TRACKENER_API,IS_TRACKENER_API_MOCKED} from "../../config/config";
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

    if (IS_TRACKENER_API_MOCKED){
      return Promise.resolve({
        type: REGISTER_SUCCESS,
      })
    }

    return fetch(TRACKENER_API + "/register", {
            method: "post",
            body: formData
        }
    )
        .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else if (response.status == 500) {
                    return {
                        type: REGISTER_ERROR,
                        errorType: ERROR_SERVER,
                    }
                } else {
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


export const modifyPassword = (email: string, username: string, password: string) => {
    // return Promise.resolve( {
    //     type: REGISTER_SUCCESS,
    // });
    let formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    if (IS_TRACKENER_API_MOCKED){
        return Promise.resolve({
            type: REGISTER_SUCCESS,
        })
    }

    return fetch(TRACKENER_API + "/modifyPassword", {
            method: "post",
            body: formData
        }
    )
        .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else if (response.status == 500) {
                    return {
                        type: REGISTER_ERROR,
                        errorType: ERROR_SERVER,
                    }
                } else {
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

    if (IS_TRACKENER_API_MOCKED){
      return Promise.resolve({
        type: LOGIN_SUCCESS,
        payload:username,
      })
    }

    return fetch(TRACKENER_API + "/login", {
            method: "post",
            body: formData
        }
    )
        .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    console.log('api/login success');
                    return {
                        type: LOGIN_SUCCESS,
                        payload:username,
                    }
                } else if (response.status == 403) {
                    console.log('api/login 403 forbidden');
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_FORBIDDEN,
                    }
                } else if (response.status == 500) {
                    console.error('api/login ERROR 500 ' + response);
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_SERVER,
                    }
                } else {
                    console.error('api/login ERROR ' + response);
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_UNKNOWN,
                    }
                }
            }
        )
        .catch((error) => {
            console.error('api/login ERROR ' + error.message);
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
