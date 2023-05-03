import { createSlice } from "@reduxjs/toolkit";

// import { UsersData } from "../FakeData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    getUser: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.firstname = action.payload.firstname;
          user.lastname= action.payload.lastname;
        }
      });
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUsername: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.firstname = action.payload.firstname;
          user.lastname= action.payload.lastname;
        }
      });
    },
  },
});

export const { addUser, deleteUser, updateUsername, getUser } = userSlice.actions;
export default userSlice.reducer;