import {URL} from './url'
import Data from '../database.json';

export async function load() {
    console.log("Api Database running...");

    // let response = await fetch(
    //     `${URL}logout.html`,
    //     {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         credentials: 'include',
    //     }
    // );
    // console.log("Status logout.html",response.status);
        const data  = Data;
        return data;
}
