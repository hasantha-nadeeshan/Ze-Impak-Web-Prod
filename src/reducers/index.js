import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import userReducer from './userReducer';
const rootReducer = combineReducers({
    userState: userReducer,
    registerState: registerReducer
});

export default rootReducer;