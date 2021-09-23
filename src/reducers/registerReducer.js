import {SUBMIT_USER,USER_DATA,SUBMIT_NUMBER} from '../actions/actionType'
const INITIAL_STATE = {
    verification: null,
    number:false,
    firstName: null,
    lastName: null,
    userType: null,
    mobile: null,
    email: null,
    birthday: null,
    gender: 'male',
    code:null,
    uid:null,
    sharedImg:"",
};

const registerReducer = (state = INITIAL_STATE, action) =>{
    console.log("hello im register reducer",action);
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
                sharedImg:action.sharedImg,
            }
        default:
            return state;
    }
}

export default registerReducer;