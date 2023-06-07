// store/actions/userActions.js

import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserData = createAction("SET_USER");
export const clearUser = createAction("CLEAR_USER");

const initialState = {
  user: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
    });
});

export default userReducer;
