import {SUBMIT_USER,USER_DATA,SUBMIT_NUMBER,PREFERENCE} from '../actions/actionType'
const INITIAL_STATE = {
    verification: null,
    number:false,
    firstName: '',
    lastName: '',
    userType: '',
    mobile: '',
    email: '',
    birthday: null,
    gender: 'male',
    code: '',
    preference: {ICT:{
        field: "ICT",
        sms:true
    }},
    uid:null
};

const registerReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case SUBMIT_USER:
            console.log(action.verification)
            return{
                ...state,
                verification:action.verification,
            };
            case SUBMIT_NUMBER:
                console.log(action.number)
                return{
                    ...state,
                    number:action.number,
                };
        case USER_DATA:
            console.log("updating..",action);
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                userType: action.userType,
                mobile: action.mobile,
                email: action.email,
                birthday: action.birthday,
                gender: action.gender,
                uid:action.uid,
            };
        case PREFERENCE:
            console.log("pref")
            return {
                ...state,
                preference: {
                    ...state.preference,
                    [action.field]: {
                        field: action.field,
                        sms:action.sms
                    }
                }
                
            }
        default:
            return state;
        
    }
}

export default registerReducer;