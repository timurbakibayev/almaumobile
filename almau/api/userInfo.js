import {URL} from './url'
import Data from '../userInfo.json';

export async function loadUserInfo() {
    console.log("Api User Info running...");

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
