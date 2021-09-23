import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import userReducer from './userReducer';
import fieldReducer from './fieldReducer';
const rootReducer = combineReducers({
    userState: userReducer,
    registerState: registerReducer,
    fieldState: fieldReducer
});

export default rootReducer;