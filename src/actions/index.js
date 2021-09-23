import { auth, provider } from "../config/Firebase"
import { SET_USER, SUBMIT_USER, USER_DATA } from './actionType';
import axios from 'axios';

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,

})

//action to send number verification
export const submitNumber = (payload) => {
    return ({
        type: SUBMIT_USER,
        verification: 'waiting'
    })
}

export const datasave = (payload) => {
    console.log("payload")
    console.log(payload)
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

export const verification = () => {
    return ({
        type: SUBMIT_USER,
        verification: 'sucess'
    })
}
//api request to number verification
export const postNumber = (payload) => {
    console.log('signUpCustom')
    const url = 'http://35.200.174.85/number'
    axios.post(url, {
        number: payload
    }).catch((error) => {
        console.log(error)
    })
    return (dispatch) => {
        dispatch(verification())
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