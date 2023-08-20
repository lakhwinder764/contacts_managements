import { createSlice } from '@reduxjs/toolkit';

// import { UsersData } from "../FakeData";

export const userSlice = createSlice({
  name: 'users',
  initialState: { value: [] },
  reducers: {
    addUser: (state, action) => {
      if (
        state?.value?.filter(
          (item) => item.firstname === action.payload.firstname
        )?.length === 0
      ) {
        state.value.push(action.payload);
      } else {
        return state;
      }
    },
    getUser: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.firstname = action.payload.firstname;
          user.lastname = action.payload.lastname;
        }
        return null;
      });
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUsername: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.firstname = action.payload.firstname;
          user.lastname = action.payload.lastname;
        }
        return null;
      });
    },
  },
});

export const { addUser, deleteUser, updateUsername, getUser } =
  userSlice.actions;
export default userSlice.reducer;
