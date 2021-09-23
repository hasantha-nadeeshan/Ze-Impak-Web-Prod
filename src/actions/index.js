import { auth, provider, storage } from "../config/Firebase";
import db from "../config/Firebase";
import { SET_USER, SUBMIT_USER, USER_DATA, SUBMIT_NUMBER ,PREFERENCE} from './actionType';
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
    console.log("adasd")
    return ({
        type: SUBMIT_NUMBER,
        number: true
    })
}
export const smsEnable = (field, value) => {
    console.log("ses")
    return ({
        type: PREFERENCE,
        field:field,
        sms: value
    })
}
//api request to number verification
export const postNumber = (code, payload) => {
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

export function signUpCustom(payloada, email, password) {
    console.log('payloada')
    return (dispatch) => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((payload) => {
                console.log(payload.user);
                dispatch(datasave(payloada));
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));
    };

}



export function signInCustom(email, password) {
    console.log('signInCustom')
    return (dispatch) => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then((payload) => {
                console.log('HUHI', payload.user.uid);
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert("Enter correct email and password"));
    };
}

////call api
export function userDataWrite(payload) {
    return () => {
        db.collection('users').add({
                firstName: payload.firstName,
                lastName: payload.lastName,
                userType: payload.userType,
                mobile: payload.mobile,
                email: payload.email,
                birthday: payload.birthday,
                gender: payload.gender,
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}

export function userDataRead(uid) {
    return () => {
        db.collection('users').doc(uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}
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

export function postArticleAPI(payload) {
    return (dispatch) => {
        if(payload.image != ""){
            const upload = storage
                .ref(`images/${payload.image.name}`)
                .put(payload.image);
            upload.on('state_changed', (snapshot)=>{
                const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100;
            console.log(`Progress: ${progress}%`);
            if (snapshot.state === 'RUNNING'){
                console.log(`Progress: ${progress}`);
            }
        },error => console.log(error.code),
        async ()=> {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            db.collection("articles").add({
                actor : {
                    description :payload.user.email,
                    title : payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL
                },
                video: payload.video,
                sharedImg : downloadURL,
                comments:0,
                description: payload.description,
                

            });

        }
        );
    } else if (payload.video){
        db.collection('articles').add({
            actor:{
                description :payload.user.email,
                title : payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
            },
            video: payload.video,
                sharedImg :"",
                comments:0,
                description: payload.description,
        })
    }
};

}