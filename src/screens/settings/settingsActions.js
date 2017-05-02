import {LOGOUT} from "../../actions/actionTypes";
import * as userRepository from "../../modules/localStorage/userRepository";
export const logout = () =>{
    userRepository.resetCredentials();
    return {type: LOGOUT}
}