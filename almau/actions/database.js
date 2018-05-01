export const DB_LOADED = 'DB_LOADED';

//Import the sample data
import * as api from '../api/db'

export function load(){
    return (dispatch) => {
        setTimeout(async () => {
            const data  = await api.load();
            dispatch({type: DB_LOADED, data:data});
        }, 100);
    };
}