// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/index";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
