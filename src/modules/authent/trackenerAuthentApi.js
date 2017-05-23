import {TRACKENER_API, IS_TRACKENER_API_MOCKED} from "../../config/config";
import {
    LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR,
} from "../../actions/actionTypes";
import {
    ERROR_FORBIDDEN,
    ERROR_SERVER,
    ERROR_UNKNOWN,
    ERROR_UNAVAILABLE
} from "../../screens/authentication/login/loginActions";
import {
    EMAIL_ALREADY_USED, USERNAME_ALREADY_USED
} from "../../screens/authentication/register/registerActions";

const MODIFY_PASSWORD_API_RESPONSE = {
    RESPONSE_OK: 'OK',
    RESPONSE_ERROR_PREV_PASSWORD_INCORRECT: 'PREVIOUS_PASSWORD_INCORRECT',
    ERROR_SERVICE_UNAVAILABLE: "Network request failed",
}

export const MODIFY_PASSWORD_API_FEEDBACK = {
    ERROR_PREV_PASSWORD_INCORRECT : 'PREVIOUS_PASSWORD_INCORRECT'
}
export const GENERIC_API_OUTCOME = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}
export const GENERIC_API_FEEDBACK = {
    ERROR_FORBIDDEN: 'FORBIDDEN',
    ERROR_UNKNOWN: 'UNKNOWN_ERROR',
    ERROR_SERVER: 'SERVER_ERROR',
    ERROR_UNAVAILABLE: 'ERROR_UNAVAILABLE',
}

export const RESPONSE_OK = 'OK';
export const RESPONSE_ERROR_USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED';
export const RESPONSE_ERROR_EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED';

export const register = (email: string, username: string, password: string) => {
    // return Promise.resolve( {
    //     type: REGISTER_SUCCESS,
    // });
    let formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    if (IS_TRACKENER_API_MOCKED) {
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
                } else if (response.status === 500) {
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
            if (responseJson.errorType) {
                return responseJson;
            }
            if (responseJson.status === RESPONSE_OK) {
                return {
                    type: REGISTER_SUCCESS,
                }
            } else if (responseJson.status === RESPONSE_ERROR_USERNAME_ALREADY_USED) {
                return {
                    type: REGISTER_ERROR,
                    errorType: USERNAME_ALREADY_USED,
                }
            } else if (responseJson.status === RESPONSE_ERROR_EMAIL_ALREADY_USED) {
                return {
                    type: REGISTER_ERROR,
                    errorType: EMAIL_ALREADY_USED,
                }
            }
        })
        .catch((error) => {
            console.error(error);
            if (error.message === "Network request failed") {
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


export const modifyPassword = (username: string, previousPassword: string, password: string) => {
    //TODO what if offline?
    // return Promise.resolve( {
    //     type: MODIFY_PASSWORD_SUCCESS,
    // });

    let formData = new FormData();
    formData.append('username', username);
    formData.append('previousPassword', previousPassword);
    formData.append('password', password);

    if (IS_TRACKENER_API_MOCKED) {
        return Promise.resolve({
            type: GENERIC_API_OUTCOME.SUCCESS,
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
                } else if (response.status === 500) {
                    return {
                        type: GENERIC_API_OUTCOME.ERROR,
                        errorType: GENERIC_API_FEEDBACK.ERROR_SERVER,
                    }
                } else {
                    return {
                        type: GENERIC_API_OUTCOME.ERROR,
                        errorType: GENERIC_API_FEEDBACK.ERROR_UNKNOWN,
                    }
                }
            }
        ).then((responseJson) => {
            if (responseJson.errorType) {
                return responseJson;
            }
            if (responseJson.status === MODIFY_PASSWORD_API_RESPONSE.RESPONSE_OK) {
                return {
                    type: GENERIC_API_OUTCOME.SUCCESS,
                }
            } else if (responseJson.status === MODIFY_PASSWORD_API_RESPONSE.RESPONSE_ERROR_PREV_PASSWORD_INCORRECT) {
                return {
                    type: GENERIC_API_OUTCOME.ERROR,
                    errorType: MODIFY_PASSWORD_API_FEEDBACK.ERROR_PREV_PASSWORD_INCORRECT,
                }
            }
        })
        .catch((error) => {
            console.error(error);
            if (error.message === MODIFY_PASSWORD_API_RESPONSE.ERROR_SERVICE_UNAVAILABLE) {
                return {
                    type: GENERIC_API_OUTCOME.ERROR,
                    errorType: GENERIC_API_FEEDBACK.ERROR_UNAVAILABLE,
                }
            }
            return {
                type: GENERIC_API_OUTCOME.ERROR,
                errorType: GENERIC_API_FEEDBACK.ERROR_UNKNOWN,
            }
        })
        ;
}

export const login = (username: string, password: string) => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    if (IS_TRACKENER_API_MOCKED) {
        return Promise.resolve({
            type: LOGIN_SUCCESS,
            payload: username,
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
                        payload: username,
                    }
                } else if (response.status === 403) {
                    console.log('api/login 403 forbidden');
                    return {
                        type: LOGIN_ERROR,
                        errorType: ERROR_FORBIDDEN,
                    }
                } else if (response.status === 500) {
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
            if (error.message === "Network request failed") {
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
