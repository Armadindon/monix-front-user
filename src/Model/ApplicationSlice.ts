import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "./tokenManager";

export type Pages = "login" | "mainMenu" | "selectProduct" | "creditAccount" | "editAccount";

// Define a type for the slice state
export type ApplicationSliceState = {
  currentPage: Pages;
  openedDrawer: boolean;
};

// Define the initial state using that type
const initialState: ApplicationSliceState = {
  currentPage: getTokenFromLocalStorage() ? "mainMenu" : "login",
  openedDrawer: false,
};

export const applicationSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    },
    switchDrawer: (state) => {
      state.openedDrawer = !state.openedDrawer;
    }
  },
});

export const { changePage, switchDrawer } = applicationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrentPage = (state: RootState) =>
  state.application.currentPage;

export const isDrawerOpened = (state: RootState) =>
  state.application.openedDrawer;

export default applicationSlice.reducer;
