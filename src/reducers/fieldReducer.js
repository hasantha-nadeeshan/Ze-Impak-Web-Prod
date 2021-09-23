import {ADD_FILED} from '../actions/actionType'
const INITIAL_STATE = {
   fields:[ "AGRICULTURE" , "ICT" , "ELECTRONICS" ]

};

const userReducer = (state = INITIAL_STATE, action) =>{

    switch (action.type){
        case ADD_FILED:
            return{
                ...state,
                fields:action,
            };
        default:
            return state;
    }
}

export default userReducer;