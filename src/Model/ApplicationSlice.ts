import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "./tokenManager";

export type Pages = "login" | "mainMenu" | "selectProduct" | "creditAccount";

// Define a type for the slice state
export type ApplicationSliceState = {
  currentPage: Pages;
};

// Define the initial state using that type
const initialState: ApplicationSliceState = {
    currentPage: getTokenFromLocalStorage()?"mainMenu":"login",
};

export const applicationSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    }
  },
});

export const { changePage } = applicationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrentPage = (state: RootState) => state.application.currentPage;

export default applicationSlice.reducer;