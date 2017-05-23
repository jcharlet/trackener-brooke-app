import {MODIFY_PASSWORD_SUCCESS, MODIFY_PASSWORD_ERROR} from "../../../actions/actionTypes";
import * as trackenerAuthentApi from "../../../modules/authent/trackenerAuthentApi";
import * as credentialsRepository from "../../../modules/storage/localStorage/credentialsRepository";

//FIXME JC to move in actionTypes in a enum object
export const ERROR_PREVIOUS_PASSWORD_MISSING = 'ERROR_PREVIOUS_PASSWORD_MISSING';
export const ERROR_PASSWORD_MISMATCH = 'ERROR_PASSWORD_MISMATCH';
export const ERROR_PASSWORD_MISSING = 'ERROR_PASSWORD_MISSING';
export const ERROR_INVALID_PASSWORD = 'ERROR_INVALID_PASSWORD';
export const ERROR_PASSWORD_ALREADY_USED = 'ERROR_PASSWORD_ALREADY_USED';


export const modifyPassword = (previousPassword: string, password: string, repeatPassword: string) => {
    return (dispatch) => {
        if(!previousPassword || previousPassword==''){
            dispatch({
                type: MODIFY_PASSWORD_ERROR,
                payload: ERROR_PREVIOUS_PASSWORD_MISSING,
            });
            return;
        }
        if(!password || password==''){
            dispatch({
                type: MODIFY_PASSWORD_ERROR,
                payload: ERROR_PASSWORD_MISSING,
            });
            return;
        }
        if(password.length<6){
            dispatch({
                type: MODIFY_PASSWORD_ERROR,
                payload: ERROR_INVALID_PASSWORD,
            });
            return;
        }
        if(password==previousPassword){
            dispatch({
                type: MODIFY_PASSWORD_ERROR,
                payload: ERROR_PASSWORD_ALREADY_USED,
            });
            return;
        }
        if(password!=repeatPassword){
            dispatch({
                type: MODIFY_PASSWORD_ERROR,
                payload: ERROR_PASSWORD_MISMATCH,
            });
            return;
        }

        trackenerAuthentApi.modifyPassword(email, username, previousPassword,password)
            .then((registerResponse) => {
                switch (registerResponse.type) {
                    case MODIFY_PASSWORD_SUCCESS:
                        endModifyPassword(dispatch, username, password);
                        break;
                    case MODIFY_PASSWORD_ERROR:
                        dispatch({
                            type: MODIFY_PASSWORD_ERROR,
                            payload: registerResponse.errorType,
                        });
                        break;
                }
            })
    }

    function endModifyPassword(dispatch, username,password) {
        credentialsRepository.saveCredentials(username,password).then(()=>{
            dispatch({
                type: MODIFY_PASSWORD_SUCCESS,
            });
        })
    }

    function validateEmail(email) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }
}

