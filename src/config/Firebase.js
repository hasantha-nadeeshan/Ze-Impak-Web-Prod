import  firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBHzx_mjYmiji9gBeBqKKPQwDnhu2pX7Wo",
    authDomain: "ze-impak-prod.firebaseapp.com",
    databaseURL: "https://ze-impak-prod-default-rtdb.firebaseio.com",
    projectId: "ze-impak-prod",
    storageBucket: "ze-impak-prod.appspot.com",
    messagingSenderId: "744781216096",
    appId: "1:744781216096:web:7e4190e315eada68a6c605",
    measurementId: "G-GRZ2RX67YJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); 
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage(); 


export { auth, provider, storage };
export default db;



