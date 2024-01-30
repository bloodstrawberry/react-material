
import loginStatus from "./loginReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ loginStatus });

export default rootReducer;