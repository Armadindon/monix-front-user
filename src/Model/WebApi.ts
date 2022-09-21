import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store";

const sendApiRequest = async (request: AxiosRequestConfig<any>) => {
  const token = store.getState().user.token;
  try {
    const result = await axios({
      ...request,
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
      headers: { ...request.headers, Authorization: `Bearer ${token}` },
    });
    return result;
  } catch (e: any) {
    console.error(e);
  }
};

export default sendApiRequest;
