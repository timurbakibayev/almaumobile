export const USER_INFO_LOADED = 'USER_INFO_LOADED';

//Import the sample data
import Data from '../userInfo.json';

export function load(){
    return (dispatch) => {
        setTimeout(() => {
            const data  = Data;
            dispatch({type: USER_INFO_LOADED, data:data});
        }, 1000);

    };
}