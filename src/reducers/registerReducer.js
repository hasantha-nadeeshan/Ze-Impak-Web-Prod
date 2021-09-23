import {SUBMIT_USER,USER_DATA} from '../actions/actionType'
const INITIAL_STATE = {
    verification: null,
    firstName: 'ex:Asanka',
    lastName: 'ex:Kumara',
    userType: 'Investor',
    mobile: '07700000',
    email: 'sample@clique.com',
    birthday: new Date('2014-08-18T21:11:54'),
    gender: 'male',
    code:'00000'
};

const registerReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case SUBMIT_USER:
            return{
                ...state,
                verification:action.verification,
            };
        case USER_DATA:
            console.log("updating..")
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                userType: action.userType,
                mobile: action.mobile,
                email: action.email,
                birthday: action.birthday,
                gender: action.gender,
                code:action.code
            }
        default:
            return state;
    }
}

export default registerReducer;