// userSlice.js

import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState:{
    userName:null,
    userPassword:null,
  },
  reducers: {
    login: (state, action) => {
      console.log("Action payload:", action.payload);

      // Assuming action.payload has the structure { userName, userPassword }
      const { userName, userPassword } = action.payload;

      // Update the user state with the provided data
      state.user = {
        userName,
        userPassword,
        // You can add other user-related properties here if needed
      };
    },
    logout: (state) => {
      // Reset the user state on logout
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
