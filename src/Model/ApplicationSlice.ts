import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "./tokenManager";
import { OptionsObject, SnackbarKey } from "notistack";
import { Snackbar } from "@mui/material";

export type Pages =
  | "login"
  | "mainMenu"
  | "selectProduct"
  | "creditAccount"
  | "editAccount"
  | "historyPanel";

export type SnackBarMessage = {
  message: string;
  options: OptionsObject;
};

// Define a type for the slice state
export type ApplicationSliceState = {
  currentPage: Pages;
  openedDrawer: boolean;
  messagesToShow: SnackBarMessage[];
};

// Define the initial state using that type
const initialState: ApplicationSliceState = {
  currentPage: getTokenFromLocalStorage() ? "mainMenu" : "login",
  openedDrawer: false,
  messagesToShow: [],
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
    },
    addSnackbarMessage: (state, action: PayloadAction<SnackBarMessage>) => ({
      ...state,
      messagesToShow: [...state.messagesToShow, action.payload],
    }),
    removeFirstSnackbarMessage: (state) => {
      state.messagesToShow.shift();
    },
  },
});

export const {
  changePage,
  switchDrawer,
  addSnackbarMessage,
  removeFirstSnackbarMessage,
} = applicationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrentPage = (state: RootState) =>
  state.application.currentPage;

export const isDrawerOpened = (state: RootState) =>
  state.application.openedDrawer;

export const getSnackbarMessages = (state: RootState) =>
  state.application.messagesToShow;

export default applicationSlice.reducer;
