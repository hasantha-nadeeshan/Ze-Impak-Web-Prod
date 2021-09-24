import { auth, provider, storage } from "../config/Firebase";
import db from "../config/Firebase";
import { SET_USER, SUBMIT_USER, USER_DATA, SUBMIT_NUMBER, SET_LOADING_STATUS, GET_ARTICLES,PREFERENCE } from './actionType';
import axios from 'axios';

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,

});

export const setLoading = (status)=>({
    type: SET_LOADING_STATUS,
    status:status,
});

export const getArticles = (payload)=>({
    type: GET_ARTICLES,
    payload: payload,
})

//action to send number verification
// export  const submitNumber =  (payload) => {
//     console.log('axio call')
//     const url = 'https://hazi99.free.beeceptor.com/my/api/path'
//      return (dispatch) =>  {
//          axios.post(url, {
//             number: "1234"
//         }).then((response) => {
//             console.log("response",response);
//            // dispatch(number());
//         })
//             .catch((error) => {
//                 console.log("axiioerror",error)
//             })
//     }
// }
export const askOTP = (payload)=> {
    return async dispatch => {
        try{
            const resp = await axios.post('http://35.200.174.85/number', {
                number:payload.mobile
            });
            console.log("response from api",resp);
            if(resp.data.statusDetail === "user already registered"){
                alert("Alredy Registered")
            }
            else{
                dispatch(number(resp.data));
            }
           
        }
        catch (error){
            console.log(error);
            alert("System error with ")
        }
    }
    
}
export const verifyOTP = (code,ref)=> {
    return async dispatch => {
        try{
            const resp = await axios.post('http://35.200.174.85/verify', {
                referenceNo:ref,
                otp:code
            });
            console.log("response from api for verify",resp);
            if(resp.data.statusDetail === "Success"){ 
                dispatch(verification(resp.data));      //should be chaged according to resp from BE for verify
                
                
            }
            else{
                alert("Your code is wrong");
            }
           
        }
        catch (error){
            console.log(error);
            alert("System error with ")
        }
    }
    
}

export const datasave = (payload,uid) => {
    console.log(payload,"datasave");
    return ({
        type: USER_DATA,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userType: payload.userType,
        mobile: payload.mobile,
        email: payload.email,
        birthday: payload.birthday,
        gender: payload.gender,
        code: payload.code,
        uid: uid,
        sharedImg:payload.sharedImg,

    })
}

export const verification = (payload) => {
    console.log('verification action dispatch')
    return ({
        type: SUBMIT_USER,
        verification: true,
        subscriberId:payload.subscriberId
    })
}
export const number = (payload) => {
    console.log("adasd")
    return ({
        type: SUBMIT_NUMBER,
        number: true,
        referenceNo:payload.referenceNo


    })
}
export const smsEnable = (field, value, user ) => {
    db.collection('users').doc(user.uid).update({
        preference: {
            ... user.preference,
            [field]: {
            field:field,
            sms: value
        }}
}).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    return ({
        type: PREFERENCE,
        field:field,
        sms: value
    })
}
//api request to number verification
export const postNumber = (code, payload) => {
    console.log('signUpCustom')
    const url = 'https://hazi99.free.beeceptor.com/my/api/path';
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
                dispatch(datasave(payloada,payload.user.uid));
                dispatch(setUser(payload.user));
                dispatch(userSaveAPI(payloada,payload.user.uid));
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
                dispatch(userDataRead(payload.user.uid));
            })
            .catch((error) => alert("Enter correct email and password"));
    };
}

////call api
export function userSaveAPI(payload,uid) {
    return () => {
        console.log('paylod uid',uid)
        db.collection('users').doc(uid).set({
                firstName: payload.firstName,
                lastName: payload.lastName,
                userType: payload.userType,
                mobile: payload.mobile,
                email: payload.email,
                birthday: payload.birthday,
                gender: payload.gender,
                uid:uid,
                sharedImg:"",
                subscriberId:payload.subscriberId
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}

export function userDataRead(uid) {
    return (dispatch) => {
        db.collection('users').doc(uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch(datasave(doc.data(),uid));
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
                dispatch(userDataRead(user.uid));

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
        dispatch(setLoading(true));
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
                    description :payload.userReg.firstName + " " +payload.userReg.lastName,
                    title : payload.userReg.email,
                    date: payload.timestamp,
                    image: payload.userReg.sharedImg,
                },
                video: payload.video,
                sharedImg : downloadURL,
                comments:0,
                description: payload.description,
                title: payload.title,
                field:payload.field

            });
            dispatch(setLoading(false));

        }
        );
    } else if (payload.video){
        db.collection('articles').add({
            actor:{
                description :payload.userReg.firstName + " " +payload.userReg.lastName,
                title : payload.userReg.email,
                date: payload.timestamp,
                image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg :"",
            comments:0,
            description: payload.description,
            title: payload.title,
            field:payload.field
        });
        dispatch(setLoading(false));
    }
};

}

export function postDpAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        if(payload.image != ""){
            const upload = storage
                .ref(`userDp/${payload.image.name}`)
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
            db.collection("users").doc(payload.uid).update({
                sharedImg : downloadURL,
                uploaded:payload.timestamp,
                

            });
            dispatch(setLoading(false));
            alert("Successfully changed");
        }
        );
    } 
};
}

export function getArticlesAPI(){
    return (dispatch) => {
        let payload;
        db.collection('articles')
        .orderBy("actor.date","desc")
        .onSnapshot((snapshot)=>{
            payload = snapshot.docs.map((doc)=> doc.data());
            console.log(payload);
            dispatch(getArticles(payload));
        });
    };
}