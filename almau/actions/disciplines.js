export const DISCIPLINES_LOADED = 'DISCIPLINES_LOADED';

//Import the sample data
import * as api from '../api/disciplines'

export function load(){
    return (dispatch) => {
        setTimeout(async () => {
            const data  = await api.load();
            dispatch({type: DISCIPLINES_LOADED, data:data});
        }, 100);
    };
}