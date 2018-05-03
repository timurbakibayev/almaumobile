export const ANNOUNCEMENTS_LOADED = 'ANNOUNCEMENTS_LOADED';

//Import the sample data
import * as api from '../api/announcements'

export function load(){
    return (dispatch) => {
        setTimeout(async () => {
            const data  = await api.load();
            dispatch({type: ANNOUNCEMENTS_LOADED, data:data});
        }, 500);
    };
}