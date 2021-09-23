import { auth, provider } from "../config/Firebase"
import { SET_USER, SUBMIT_USER, USER_DATA ,SUBMIT_NUMBER} from './actionType';
import axios from 'axios';

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,

})

//action to send number verification
export const submitNumber = (payload) => {
    console.log('NUMber')
    const url = 'http://35.200.174.85/number'
    return (dispatch) => {
        axios.post(url, {
            number: payload.mobile
        }).then((response) => {
            console.log("response");
            dispatch(number());
        })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const datasave = (payload) => {
    return ({
        type: USER_DATA,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userType: payload.userType,
        mobile: payload.mobile,
        email: payload.email,
        birthday: payload.birthday,
        gender: payload.gender,
        code: payload.code

    })
}

export const verification = (payload) => {
    console.log('verification action dispatch')
    return ({
        type: SUBMIT_USER,
        verification: payload
    })
}
export const number = () => {
    return ({
        type: SUBMIT_NUMBER,
        number: true
    })
}
//api request to number verification
export const postNumber = (code,payload) => {
    console.log('signUpCustom')
    const url = 'http://35.200.174.85/number'
    return (dispatch) => {
        axios.post(url, {
            number: code
        }).then((response) => {
            console.log(response);
            dispatch(verification(response.data));
        })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function signUpCustom(email, password) {
    console.log('signUpCustom')
    return (dispatch) => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((payload) => {
                console.log(payload);
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));
    };

}

////call api


export function signInAPI() {
    return (dispatch) => {
        auth
            .signInWithPopup(provider)
            .then((payload) => {
                console.log(payload);
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));
    };

}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {

            if (user) {
                dispatch(setUser(user));
            }
        });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((error) => console.log(error));
    };
}