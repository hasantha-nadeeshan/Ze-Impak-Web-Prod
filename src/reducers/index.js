import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import userReducer from './userReducer';
import fieldReducer from './fieldReducer';
import articleRdecuer from './articleReducer';
import riskReducer from './riskReducer';

const rootReducer = combineReducers({
    userState: userReducer,
    registerState: registerReducer,
    fieldState: fieldReducer,
    articleState:articleRdecuer,
    riskState: riskReducer,
});

export default rootReducer;