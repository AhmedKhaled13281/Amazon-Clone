import { combineReducers } from "redux";
import { basketReducer , authReducer} from "./reducers";

const rootReducers = combineReducers({
    auth : authReducer,
    data : basketReducer
})

export default rootReducers