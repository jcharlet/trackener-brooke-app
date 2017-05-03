import {LOGOUT} from "../../actions/actionTypes";
import * as credentialsRepository from "../../modules/storage/localStorage/credentialsRepository";
export const logout = () =>{
    credentialsRepository.resetCredentials();
    return {type: LOGOUT}
}