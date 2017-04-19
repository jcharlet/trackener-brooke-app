import {
    AsyncStorage
} from 'react-native';

export const login = (username: string, password: string) => {
    return (dispatch) => {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch("http://192.168.1.6:8000/api/login", {
                method: "post",
                body: formData
            }
        )
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch({
                            type: "Navigation/NAVIGATE",
                            routeName: 'BottomTabNavContainer',
                        }
                    )
                } else if (response.status == 403){
                    dispatch({
                            type: "login/ERROR",
                            payload: 'FORBIDDEN',
                        }
                    )
                } else if (response.status == 500){
                    dispatch({
                            type: "login/ERROR",
                            payload: 'SERVER_ERROR',
                        }
                    )
                } else{
                    dispatch({
                            type: "login/ERROR",
                            payload: 'UNKNOWN_ERROR',
                        }
                    )
                }
                }
            )
            .catch((error) => {
                console.warn(error);
            })
        ;
    }
}
