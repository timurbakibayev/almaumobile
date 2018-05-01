export const USER_INFO_LOADED = 'USER_INFO_LOADED';

//Import the sample data
import * as api from '../api/userInfo'

export function load(){
    return (dispatch) => {
        setTimeout(async () => {
            const data  = await api.loadUserInfo();
            dispatch({type: USER_INFO_LOADED, data:data});
        }, 1000);
    };
}