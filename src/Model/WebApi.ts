import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store";
import {
  addSnackbarMessage,
} from "./ApplicationSlice";

const sendApiRequest = async (request: AxiosRequestConfig) => {
  const token = store.getState().user.token;
  try {
    const result = await axios({
      ...request,
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
      headers: { ...request.headers, Authorization: `Bearer ${token}` },
    });
    return result;
    // eslint-disable-next-line
  } catch (error: any) {
    console.log(error);
    if (
      error?.response?.data?.error &&
      typeof error?.response?.data?.error == "string"
    ) {
      store.dispatch(
        addSnackbarMessage({
          message: error.response.data.error,
          options: {
            variant: "error",
          },
        })
      );
    } else {
      store.dispatch(
        addSnackbarMessage({
          message: "Erreur inconnue en contactan l'api",
          options: {
            variant: "error",
          },
        })
      );
    }
  }
};

export default sendApiRequest;
