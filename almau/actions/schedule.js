export const SCHEDULE_LOADED = 'SCHEDULE_LOADED';

//Import the sample data
import * as api from '../api/schedule'

export function load(){
    return (dispatch) => {
        setTimeout(async () => {
            const data  = await api.load();
            dispatch({type: SCHEDULE_LOADED, data:data});
        }, 100);
    };
}