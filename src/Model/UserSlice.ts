import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getTokenFromLocalStorage } from "./api";

// Define a type for the slice state
export type UserSliceState = {
  token?: string;
};

// Define the initial state using that type
const initialState: UserSliceState = {
  token: getTokenFromLocalStorage(),
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      delete state.token;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
