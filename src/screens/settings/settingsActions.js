import {LOAD_SETTINGS, LOGOUT} from "../../actions/actionTypes";
import * as credentialsRepository from "../../modules/storage/localStorage/credentialsRepository";
import * as appConfigRepository from "../../modules/storage/localStorage/appConfigRepository";
export const logout = () =>{
    credentialsRepository.resetCredentials();
    return {type: LOGOUT}
}

export const loadSettings = () =>{
    return (dispatch) => {
        appConfigRepository.load()
            .then((appConfig) => {
                dispatch({type: LOAD_SETTINGS, payload: {
                    isOffline: appConfig.isOffline,
                    username: appConfig.username,
                }})
            })
    }
}