import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "../actions/"
import { USER_INFO_LOADED } from "../actions/userInfo"
import { NEWS_LOADED } from "../actions/news"
import { DB_LOADED } from "../actions/database"

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};

const userInfoReducer = (state = {fullname: "Loading..."}, action) => {
    switch (action.type) {
        case USER_INFO_LOADED:
            console.log("USER INFO LOADED", action.data);
            return action.data;
        default:
            return state;
    }
};

const newsReducer = (state = [], action) => {
    switch (action.type) {
        case NEWS_LOADED:
            // console.log(NEWS_LOADED, action.data);
            return action.data;
        default:
            return state;
    }
};

const dbReducer = (state = [], action) => {
    switch (action.type) {
        case DB_LOADED:
            // console.log(DB_LOADED, action.data);
            return action.data;
        default:
            return state;
    }
};


// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer,
    userInfoReducer,
    newsReducer,
    dbReducer,
});

export default rootReducer;