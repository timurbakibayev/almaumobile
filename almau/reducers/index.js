import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "../actions/" //Import the actions types constant we defined in our actions
import { USER_INFO_LOADED } from "../actions/userInfo" //Import the actions types constant we defined in our actions

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


// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer,
    userInfoReducer,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;