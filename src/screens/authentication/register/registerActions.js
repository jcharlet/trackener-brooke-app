import {REGISTER_SUCCESS, REGISTER_ERROR} from "../../../actions/actionTypes";
import * as trackenerAuthentApi from "../../../modules/authent/trackenerAuthentApi";
import * as credentialsRepository from "../../../modules/storage/localStorage/credentialsRepository";

//FIXME JC to move in actionTypes in a enum object
export const ERROR_PASSWORD_MISMATCH = 'ERROR_PASSWORD_MISMATCH';
export const ERROR_USERNAME_MISSING = 'ERROR_USERNAME_MISSING';
export const ERROR_EMAIL_MISSING = 'ERROR_EMAIL_MISSING';
export const ERROR_PASSWORD_MISSING = 'ERROR_PASSWORD_MISSING';
export const ERROR_INVALID_EMAIL = 'ERROR_INVALID_EMAIL';
export const EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED';
export const USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED';


export const register = (email: string, username: string, password: string, repeatPassword: string) => {
    return (dispatch) => {
        if(email==''){
            dispatch({
                type: REGISTER_ERROR,
                payload: ERROR_EMAIL_MISSING,
            });
            return;
        }
        if(!validateEmail(email)){
            dispatch({
                type: REGISTER_ERROR,
                payload: ERROR_INVALID_EMAIL,
            });
            return;
        }
        if(username==''){
            dispatch({
                type: REGISTER_ERROR,
                payload: ERROR_USERNAME_MISSING,
            });
            return;
        }
        if(password==''){
            dispatch({
                type: REGISTER_ERROR,
                payload: ERROR_PASSWORD_MISSING,
            });
            return;
        }
        if(password!=repeatPassword){
            dispatch({
                type: REGISTER_ERROR,
                payload: ERROR_PASSWORD_MISMATCH,
            });
            return;
        }

        trackenerAuthentApi.register(email, username, password)
            .then((registerResponse) => {
                switch (registerResponse.type) {
                    case REGISTER_SUCCESS:
                        endRegistration(dispatch, username, password);
                        break;
                    case REGISTER_ERROR:
                        dispatch({
                            type: REGISTER_ERROR,
                            payload: registerResponse.errorType,
                        });
                        break;
                }
            })
    }

    function endRegistration(dispatch, username,password) {
        credentialsRepository.saveCredentials(username,password).then(()=>{
            dispatch({
                type: REGISTER_SUCCESS,
            });
        })
    }

    function validateEmail(email) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }
}

