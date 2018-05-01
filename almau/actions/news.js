export const NEWS_LOADED = 'NEWS_LOADED';

//Import the sample data
import * as api from '../api/news'

export function load(){
    return (dispatch) => {
        setTimeout(async () => {
            const data  = await api.load();
            dispatch({type: NEWS_LOADED, data:data});
        }, 100);
    };
}