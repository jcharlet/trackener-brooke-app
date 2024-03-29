import * as trackenerAuthentApi from "../../../modules/authent/trackenerAuthentApi";
import * as credentialsRepository from "../../../modules/storage/localStorage/credentialsRepository";
import {MODIFY_PASSWORD_API_FEEDBACK} from "../../../modules/authent/trackenerAuthentApi";
import {MODIFY_PASSWORD_ACTIONS} from "../../../actions/actionTypes";
import {GENERIC_API_OUTCOME} from "../../../modules/authent/trackenerAuthentApi";

//FIXME JC to move in actionTypes in a enum object
export const MODIFY_PASSWORD_FEEDBACK = {
    SUCCESS: 'SUCCESS',
    SENDING_REQUEST: 'SENDING_REQUEST',
    ERROR_PREVIOUS_PASSWORD_MISSING: 'ERROR_PREVIOUS_PASSWORD_MISSING',
    ERROR_PASSWORD_MISMATCH: 'ERROR_PASSWORD_MISMATCH',
    ERROR_PASSWORD_MISSING: 'ERROR_PASSWORD_MISSING',
    ERROR_INVALID_PASSWORD: 'ERROR_INVALID_PASSWORD',
    ERROR_PASSWORD_ALREADY_USED: 'ERROR_PASSWORD_ALREADY_USED',
    ERROR_PREV_PASSWORD_INCORRECT: 'ERROR_PREV_PASSWORD_INCORRECT',
}


export const modifyPassword = (previousPassword: string, password: string, repeatPassword: string) => {
    return (dispatch) => {
        if (!previousPassword || previousPassword == '') {
            dispatch({
                type: MODIFY_PASSWORD_ACTIONS.ERROR,
                payload: MODIFY_PASSWORD_FEEDBACK.ERROR_PREVIOUS_PASSWORD_MISSING,
            });
            return;
        }
        if (!password || password == '') {
            dispatch({
                type: MODIFY_PASSWORD_ACTIONS.ERROR,
                payload: MODIFY_PASSWORD_FEEDBACK.ERROR_PASSWORD_MISSING,
            });
            return;
        }
        if (password.length < 6) {
            dispatch({
                type: MODIFY_PASSWORD_ACTIONS.ERROR,
                payload: MODIFY_PASSWORD_FEEDBACK.ERROR_INVALID_PASSWORD,
            });
            return;
        }
        if (password == previousPassword) {
            dispatch({
                type: MODIFY_PASSWORD_ACTIONS.ERROR,
                payload: MODIFY_PASSWORD_FEEDBACK.ERROR_PASSWORD_ALREADY_USED,
            });
            return;
        }
        if (password != repeatPassword) {
            dispatch({
                type: MODIFY_PASSWORD_ACTIONS.ERROR,
                payload: MODIFY_PASSWORD_FEEDBACK.ERROR_PASSWORD_MISMATCH,
            });
            return;
        }

        dispatch({
            type: MODIFY_PASSWORD_ACTIONS.ONGOING,
            payload: MODIFY_PASSWORD_FEEDBACK.SENDING_REQUEST,
        });

        return credentialsRepository.getCredentials()
            .then((credentials) => {
                return trackenerAuthentApi.modifyPassword(credentials.username, previousPassword, password)
                    .then((registerResponse) => {
                        switch (registerResponse.type) {
                            case GENERIC_API_OUTCOME.SUCCESS:
                                credentialsRepository.saveCredentials(credentials.username, password).then(() => {
                                    dispatch({
                                        type: MODIFY_PASSWORD_ACTIONS.SUCCESS,
                                        payload: MODIFY_PASSWORD_FEEDBACK.SUCCESS,
                                    });
                                })
                                break;
                            case GENERIC_API_OUTCOME.ERROR:
                                if(registerResponse.errorType===MODIFY_PASSWORD_API_FEEDBACK.ERROR_PREV_PASSWORD_INCORRECT ){
                                    dispatch({
                                        type: MODIFY_PASSWORD_ACTIONS.ERROR,
                                        payload: MODIFY_PASSWORD_FEEDBACK.ERROR_PREV_PASSWORD_INCORRECT ,
                                    });
                                }else{
                                    dispatch({
                                        type: MODIFY_PASSWORD_ACTIONS.ERROR,
                                        payload: registerResponse.errorType,
                                    });
                                }
                                break;
                        }
                    })
            })

    }

    function endModifyPassword(dispatch, username, password) {
    }

    function validateEmail(email) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }
}

