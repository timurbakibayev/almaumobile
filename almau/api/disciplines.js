import {URL} from './url'
import Data from '../disciplines.json';

export async function load() {
    console.log("Api disciplines running...");
    const data  = Data;
    return data;
}
