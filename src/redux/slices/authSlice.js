import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
  user: null,
},
  reducers: {
    register: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },

    login: (state, action) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

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

    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
