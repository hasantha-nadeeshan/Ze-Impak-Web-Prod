import { 
    SET_RISK,
    RESET_RISK
} from "../actions/actionType"


export const initState = {
    value:"",
}

const riskRdecuer = (state = initState, action) =>{
    switch(action.type){
        case SET_RISK:
            return{
                ...state,
                value:action.payload,
            }
        case RESET_RISK:
            return{
                ...state,
                value: "",

            }
        
        default:
            return state;
    }
}


export default riskRdecuer;