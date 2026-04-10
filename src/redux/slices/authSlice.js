import { createSlice } from "@reduxjs/toolkit";

//  Get user safely from localStorage
const getUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState = {
  user: null, //  FIXED
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  REGISTER
    register: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },

    //  LOGIN (cleaned)
    login: (state, action) => {
      const storedUser =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user"))
          : null;

      if (
        storedUser &&
        storedUser.email === action.payload.email &&
        storedUser.password === action.payload.password
      ) {
        state.user = storedUser;
      } else {
        alert("Invalid Credentials");
      }
    },

    //  UPDATE USER ( REQUIRED FOR EDIT PROFILE)
    updateUser: (state, action) => {
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    //  LOGOUT
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      state.user = null;
    },
    
  },
});

export const { register, login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;