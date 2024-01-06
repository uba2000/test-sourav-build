import axios from "axios";
import { CONSTANT_BASE_URL } from "../utils/util-constants";

const preferenceAPI = axios.create({
  baseURL: import.meta.env.PROD ? CONSTANT_BASE_URL : import.meta.env.BASE_URL,
});

export const preferenceUrlEndpoint = "/json-data.json";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
