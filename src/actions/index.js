import  {auth} from "../config/Firebase"

export function signInAPI(){
    return (dispatch) => {
        auth
            .signInWithPopup(provider)
            .then((payload) => {
                console.log(payload);
            })
            .catch((error)=>alert(error.message));
    };

}