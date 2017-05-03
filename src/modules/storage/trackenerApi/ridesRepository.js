import {TRACKENER_API} from "../../../config/config";
import {ERROR_UNKNOWN} from "../../../screens/authentication/login/loginActions";
import {RIDES_POST_SUCCESS, RIDES_POST_ERROR} from "../../../actions/actionTypes";
export const findAllWithSyncDateGtThan = () => {

}

export const saveAll = (rides) => {
    console.log('saving ' + rides.length + ' ride(s) to backend');
    return fetch(TRACKENER_API + "/rides/post", {
            method: "POST",
            body: JSON.stringify(rides)
        }
    )
        .then((response) => {
                if (response.status == 201) {
                    return {
                        type: RIDES_POST_SUCCESS,
                    }
                } else {
                    return {
                        type: RIDES_POST_ERROR,
                        errorType: ERROR_UNKNOWN,
                    }
                }
            }
        )
        .catch((error) => {
            console.warn(error);
        })
        ;
}

