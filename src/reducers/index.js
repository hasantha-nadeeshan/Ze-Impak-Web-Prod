import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import userReducer from './userReducer';
import articleRdecuer from './articleReducer';


const rootReducer = combineReducers({
    userState: userReducer,
    registerState: registerReducer,
    articleState:articleRdecuer,
});

export default rootReducer;