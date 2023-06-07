import { combineReducers } from "redux";
import userReducer from "./UserReducer";
const rootReducer = combineReducers({
  user: userReducer,
  // other reducers...
});

export default rootReducer;
